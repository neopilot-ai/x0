"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V0ChatModelProvider = void 0;
const vscode_1 = require("vscode");
function getV0ModelInfo(id, name, description, maxInputTokens, maxOutputTokens) {
    return {
        id,
        name,
        tooltip: `v0 ${name} - ${description}`,
        family: 'v0',
        maxInputTokens,
        maxOutputTokens,
        version: '1.5.0',
        capabilities: {
            toolCalling: true,
            imageInput: true,
        },
    };
}
class V0ChatModelProvider {
    context;
    static API_KEY_SECRET = 'v0.apiKey';
    static BASE_URL = 'https://api.v0.dev';
    constructor(context) {
        this.context = context;
    }
    async provideLanguageModelChatInformation(options, _token) {
        const apiKey = await this.context.secrets.get(V0ChatModelProvider.API_KEY_SECRET);
        if (!apiKey) {
            if (options.silent) {
                return [];
            }
            else {
                await this.promptForApiKey();
                const newApiKey = await this.context.secrets.get(V0ChatModelProvider.API_KEY_SECRET);
                if (!newApiKey) {
                    return [];
                }
            }
        }
        return [
            getV0ModelInfo('v0-1.5-md', 'v0-1.5-md', 'For everyday tasks and UI generation', 128000, 64000),
            getV0ModelInfo('v0-1.5-lg', 'v0-1.5-lg', 'For advanced thinking or reasoning', 512000, 64000),
        ];
    }
    async provideLanguageModelChatResponse(model, messages, options, progress, token) {
        const apiKey = await this.context.secrets.get(V0ChatModelProvider.API_KEY_SECRET);
        if (!apiKey) {
            progress.report(new vscode_1.LanguageModelTextPart("Error: v0 API key not configured. Please run the 'Manage v0 API Key' command."));
            return;
        }
        try {
            const v0Messages = this.convertMessages(messages);
            const response = await this.makeV0Request(model.id, v0Messages, apiKey, options.tools, options.toolMode, token);
            if (response && response.choices && response.choices.length > 0) {
                const message = response.choices[0].message;
                if (message) {
                    this.processV0Response(message, progress);
                }
                else {
                    progress.report(new vscode_1.LanguageModelTextPart('Error: No response message from v0 API'));
                }
            }
            else {
                progress.report(new vscode_1.LanguageModelTextPart('Error: No response from v0 API'));
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            progress.report(new vscode_1.LanguageModelTextPart(`Error: ${errorMessage}`));
        }
    }
    async provideTokenCount(_model, text, _token) {
        const textContent = typeof text === 'string' ? text : this.extractTextFromMessage(text);
        return Math.ceil(textContent.length / 4);
    }
    async manageApiKey() {
        const options = {
            prompt: 'Enter your v0 API key',
            password: true,
            placeHolder: 'v0_...',
            ignoreFocusOut: true,
        };
        const apiKey = await vscode_1.window.showInputBox(options);
        if (apiKey) {
            await this.context.secrets.store(V0ChatModelProvider.API_KEY_SECRET, apiKey);
            vscode_1.window.showInformationMessage('v0 API key saved successfully!');
        }
    }
    async promptForApiKey() {
        const result = await vscode_1.window.showInformationMessage('v0 API key is required to use v0 models. Would you like to configure it now?', 'Configure API Key', 'Cancel');
        if (result === 'Configure API Key') {
            await this.manageApiKey();
        }
    }
    convertMessages(messages) {
        return messages.map((msg) => {
            const role = msg.role === 1 ? 'user' : 'assistant';
            const v0Message = {
                role,
                content: '',
            };
            const textParts = [];
            const toolCalls = [];
            let toolCallId;
            for (const part of msg.content) {
                if (typeof part === 'object' && part !== null) {
                    if ('value' in part && typeof part.value === 'string') {
                        textParts.push(part.value);
                    }
                    else if (part instanceof vscode_1.LanguageModelToolCallPart) {
                        toolCalls.push({
                            id: part.callId,
                            type: 'function',
                            function: {
                                name: part.name,
                                arguments: JSON.stringify(part.input),
                            },
                        });
                    }
                    else if (part instanceof vscode_1.LanguageModelToolResultPart) {
                        toolCallId = part.callId;
                        const resultTexts = part.content
                            .filter((resultPart) => typeof resultPart === 'object' && resultPart !== null && 'value' in resultPart)
                            .map((resultPart) => resultPart.value);
                        textParts.push(...resultTexts);
                    }
                }
            }
            v0Message.content = textParts.join('');
            if (toolCalls.length > 0) {
                v0Message.tool_calls = toolCalls;
            }
            if (toolCallId) {
                v0Message.tool_call_id = toolCallId;
            }
            return v0Message;
        });
    }
    processV0Response(message, progress) {
        if (message.content) {
            progress.report(new vscode_1.LanguageModelTextPart(message.content));
        }
        if (message.tool_calls && message.tool_calls.length > 0) {
            for (const toolCall of message.tool_calls) {
                if (toolCall.type === 'function' && toolCall.function) {
                    try {
                        const input = JSON.parse(toolCall.function.arguments);
                        progress.report(new vscode_1.LanguageModelToolCallPart(toolCall.id, toolCall.function.name, input));
                    }
                    catch (error) {
                        console.error('Failed to parse tool call arguments:', error);
                        progress.report(new vscode_1.LanguageModelToolCallPart(toolCall.id, toolCall.function.name, {
                            arguments: toolCall.function.arguments,
                        }));
                    }
                }
            }
        }
    }
    extractTextFromMessage(message) {
        return message.content
            .filter((part) => typeof part === 'object' && part !== null && 'value' in part)
            .map((part) => part.value)
            .join('');
    }
    convertToolsToV0Format(tools) {
        return tools.map((tool) => ({
            type: 'function',
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.inputSchema || {},
            },
        }));
    }
    convertToolMode(toolMode) {
        switch (toolMode) {
            case vscode_1.LanguageModelChatToolMode.Auto:
                return 'auto';
            case vscode_1.LanguageModelChatToolMode.Required:
                return 'required';
            default:
                return 'auto';
        }
    }
    async makeV0Request(modelId, messages, apiKey, tools, toolMode, token) {
        const requestBody = {
            model: modelId,
            messages,
            max_completion_tokens: 64_000,
        };
        if (tools && tools.length > 0) {
            requestBody.tools = this.convertToolsToV0Format(tools);
            requestBody.tool_choice = this.convertToolMode(toolMode);
        }
        const response = await fetch(`${V0ChatModelProvider.BASE_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
            signal: token.isCancellationRequested ? AbortSignal.abort() : undefined,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`v0 API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return await response.json();
    }
}
exports.V0ChatModelProvider = V0ChatModelProvider;
//# sourceMappingURL=provider.js.map