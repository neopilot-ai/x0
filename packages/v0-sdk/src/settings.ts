import type { V0Client } from 'v0'

export interface PreviewHost {
  host: string
  addedAt: Date
}

export interface PreviewHostsConfig {
  hosts: string[]
  chatId?: string
}

export interface SettingsManager {
  client: V0Client
  previewHosts: string[]
  getPreviewHosts(): Promise<string[]>
  setPreviewHosts(hosts: string[]): Promise<void>
  addPreviewHost(host: string): Promise<void>
  removePreviewHost(host: string): Promise<void>
}

export function createSettingsManager(client: V0Client): SettingsManager {
  const previewHosts: string[] = []

  return {
    client,
    previewHosts,

    async getPreviewHosts() {
      const result = await client.settings.getPreviewHosts()
      if (result.data) {
        return result.data.hosts
      }
      return previewHosts
    },

    async setPreviewHosts(hosts: string[]) {
      await client.settings.setPreviewHosts({ hosts })
      previewHosts.length = 0
      previewHosts.push(...hosts)
    },

    async addPreviewHost(host: string) {
      const hosts = await this.getPreviewHosts()
      if (!hosts.includes(host)) {
        hosts.push(host)
        await this.setPreviewHosts(hosts)
      }
    },

    async removePreviewHost(host: string) {
      const hosts = await this.getPreviewHosts()
      const idx = hosts.indexOf(host)
      if (idx !== -1) {
        hosts.splice(idx, 1)
        await this.setPreviewHosts(hosts)
      }
    },
  }
}

export interface TrustHost {
  hostname: string
  pattern: string
  addedAt: Date
  source: 'manual' | 'auto'
}

export interface TrustHostConfig {
  allowLocalhost: boolean
  allowPreviewDomain: boolean
  customPatterns: string[]
}

export const defaultTrustHostConfig: TrustHostConfig = {
  allowLocalhost: false,
  allowPreviewDomain: true,
  customPatterns: [],
}
