export const BUILTIN_ALLOW: string[] = [
  'npm install',
  'npm run',
  'npx',
  'pnpm install',
  'pnpm run',
  'yarn install',
  'yarn run',
  'bun install',
  'bun run',
  'git status',
  'git log',
  'git diff',
  'git branch',
  'git checkout',
  'ls',
  'cat',
  'echo',
  'mkdir',
  'cp',
  'mv',
  'head',
  'tail',
  'find',
  'grep',
  'curl',
  'wget',
]

export const BUILTIN_DENY: string[] = ['rm -rf', 'sudo', 'shutdown', 'reboot', 'format', 'mkfs']

export const DEFAULT_RULES = [
  ...BUILTIN_ALLOW.map((pattern) => ({
    pattern,
    type: 'allow' as const,
    scope: 'user' as const,
    createdAt: new Date(),
  })),
  ...BUILTIN_DENY.map((pattern) => ({
    pattern,
    type: 'deny' as const,
    scope: 'user' as const,
    createdAt: new Date(),
  })),
]

export const SPECIFICITY_ORDER = ['allow', 'deny', 'ask']

export function getRulePrecedence(rule: { pattern: string }): number {
  return rule.pattern.split('').length
}

export function sortRulesBySpecificity(
  rules: Array<{ pattern: string }>,
): Array<{ pattern: string }> {
  return [...rules].sort((a, b) => getRulePrecedence(b) - getRulePrecedence(a))
}
