# v0 Model for VS Code Chat

VS Code extension that provides v0 language models for VS Code chat via the Language Model Chat Provider API.

## Setup

1. Install the extension in VS Code
2. Run the **Manage v0 API Key** command to configure your API key
3. Select a v0 model in the VS Code chat interface

## Building

```bash
bun run compile
bun run package
```

## Models

- **v0-1.5-md**: For everyday tasks and UI generation (128K input, 64K output)
- **v0-1.5-lg**: For advanced thinking or reasoning (512K input, 64K output)
