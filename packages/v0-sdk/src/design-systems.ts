/**
 * Design Systems 2.0 helpers.
 *
 * Design systems are saved as `memory` skills and attached to chats/messages
 * via the `skills` field. See `/docs/design-systems-2` and
 * `/docs/api/v2/guides/design-systems`.
 *
 * These types mirror the generated API shapes (`skillName`, not `name`)
 * so payloads built with these helpers can be passed straight to
 * `v0.chats.create()` / `v0.messages.send()`.
 */

export type MemorySkillScope = 'user' | 'team'

export interface MemorySkillAttachment {
  type: 'memory'
  scope: MemorySkillScope
  skillName: string
}

export interface RemoteSkillAttachment {
  type: 'remote'
  id: string
}

export interface ProjectSkillAttachment {
  type: 'project'
  skillName: string
}

export type SkillAttachment = MemorySkillAttachment | RemoteSkillAttachment | ProjectSkillAttachment

/** Build a `memory` skill attachment for a saved design system. */
export function memorySkill(
  skillName: string,
  scope: MemorySkillScope = 'team',
): MemorySkillAttachment {
  return { type: 'memory', scope, skillName }
}

/** Build a `remote` (skills.sh) skill attachment. */
export function remoteSkill(id: string): RemoteSkillAttachment {
  return { type: 'remote', id }
}

/** Build a `project` skill attachment for a repo-defined skill. */
export function projectSkill(skillName: string): ProjectSkillAttachment {
  return { type: 'project', skillName }
}

/** v0.json schema version. Currently `1`. */
export const V0_JSON_VERSION = 1 as const

export interface V0JsonReferenceSource {
  id: string
  type: 'github-repo'
  repo: { org: string; name: string }
  ref: string
  mountPath: string
}

export type V0JsonEnvironmentProvider =
  | { type: 'shared-env-vars'; ids: string[] }
  | { type: 'vercel-project'; projectId: string; ids: string[] }

export type V0JsonStarter =
  | { source: 'skill-directory'; path: string }
  | { source: 'empty' }
  | { source: 'v0-default' }

/**
 * Shape of the `v0.json` file saved with a design system skill.
 * Source of truth for reference sources, env providers, and starter app.
 */
export interface V0Json {
  version: typeof V0_JSON_VERSION
  referenceWorkspace?: { sources: V0JsonReferenceSource[] }
  environment?: { providers: V0JsonEnvironmentProvider[] }
  starter?: V0JsonStarter
}

/** Validate a parsed `v0.json` object. Returns an error message or null if valid. */
export function validateV0Json(value: unknown): string | null {
  if (typeof value !== 'object' || value === null) return 'v0.json must be an object'
  const v = value as Record<string, unknown>
  if (v['version'] !== 1) return 'v0.json version must be 1'
  const sources = (v['referenceWorkspace'] as { sources?: unknown } | undefined)?.sources
  if (sources !== undefined && (!Array.isArray(sources) || sources.length > 3)) {
    return 'referenceWorkspace.sources must be an array of at most 3 sources'
  }
  const starter = v['starter'] as { source?: unknown } | undefined
  if (
    starter !== undefined &&
    !['skill-directory', 'empty', 'v0-default'].includes(starter.source as string)
  ) {
    return 'starter.source must be skill-directory, empty, or v0-default'
  }
  return null
}

export interface DesignSystemAppearanceTheme {
  background: string
  foreground: string
}

export interface DesignSystemAppearance {
  light: DesignSystemAppearanceTheme
  dark: DesignSystemAppearanceTheme
}

/** Build the `SKILL.md` frontmatter metadata for a design system skill. */
export function designSystemFrontmatter(appearance: DesignSystemAppearance): {
  metadata: {
    v0: { kind: 'design-system'; 'design-system': { appearance: DesignSystemAppearance } }
  }
} {
  return { metadata: { v0: { kind: 'design-system', 'design-system': { appearance } } } }
}

/**
 * Build a prompt asking v0 to update a saved design system skill.
 * Include the new version, release notes, migration guide, and breaking changes.
 */
export function designSystemUpdatePrompt(options: {
  skillName: string
  version: string
  releaseNotes?: string
  migrationGuide?: string
  breakingChanges?: string
}): string {
  const lines = [`Update ${options.skillName} to ${options.version}.`, '']
  if (options.releaseNotes) lines.push(`Release notes: ${options.releaseNotes}`)
  if (options.migrationGuide) lines.push(`Migration guide: ${options.migrationGuide}`)
  if (options.breakingChanges) lines.push(options.breakingChanges)
  return lines.join('\n')
}
