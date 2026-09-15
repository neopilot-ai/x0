export interface Version {
  id: string
  chatId: string
  title?: string
  description?: string
  createdAt: Date
  updatedAt?: Date
  files?: FileSnapshot[]
}

export interface FileSnapshot {
  path: string
  content: string
  createdAt: Date
}

export interface VersionHistory {
  chatId: string
  versions: Version[]
  currentVersionId?: string
}

export interface VersionConfig {
  chatId: string
  includeFiles?: boolean
  includeMetadata?: boolean
}

export interface VersionRollbackResult {
  chatId: string
  versionId: string
  restored: boolean
}

export interface VersionSnapshot {
  versionId: string
  title: string
  description?: string
  createdAt: Date
  files: FileSnapshot[]
}

export function createVersionSnapshot(chatId: string, title?: string, metadata?: Record<string, string>): VersionSnapshot {
  return {
    versionId: chatId,
    title: title ?? 'Untitled',
    description: metadata && metadata["description"],
    createdAt: new Date(),
    files: [],
  }
}

export function createVersionHistory(chatId: string, versions: Version[]): VersionHistory {
  return {
    chatId,
    versions,
    currentVersionId: versions[0]?.id,
  }
}

export interface VersionManager {
  chatId: string
  versions: Version[]
  getCurrentVersion(): Version | undefined
  getVersion(id: string): Version | undefined
  addVersion(version: Version): void
  rollback(id: string): VersionRollbackResult
}

export function createVersionManager(chatId: string): VersionManager {
  const versions: Version[] = []

  return {
    chatId,
    versions,

    getCurrentVersion() {
      return versions[0]
    },

    getVersion(id: string) {
      return versions.find((v) => v.id === id)
    },

    addVersion(version: Version) {
      versions.unshift(version)
    },

    rollback(id: string): VersionRollbackResult {
      const version = this.getVersion(id)
      return {
        chatId,
        versionId: id,
        restored: !!version,
      }
    },
  }
}
