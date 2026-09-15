export interface ScreenshotOptions {
  chatId: string
  format?: 'png' | 'jpeg' | 'webp'
  quality?: number
  width?: number
  height?: number
}

export interface Screenshot {
  chatId: string
  url: string
  format: string
  createdAt: Date
  dimensions?: {
    width: number
    height: number
  }
}

export interface ScreenshotConfig {
  defaultFormat: 'png' | 'jpeg' | 'webp'
  defaultQuality: number
  defaultWidth: number
  defaultHeight: number
}

export interface ScreenshotResult {
  screenshots: Screenshot[]
  total: number
  chatId: string
}

export interface ScreenshotManager {
  chatId: string
  capture(options?: ScreenshotOptions): Promise<Screenshot>
  captureAll(options?: ScreenshotOptions): Promise<Screenshot[]>
  getScreenshots(): Screenshot[]
  clear(): void
}

export const defaultScreenshotConfig: ScreenshotConfig = {
  defaultFormat: 'png',
  defaultQuality: 90,
  defaultWidth: 1200,
  defaultHeight: 800,
}

export function createScreenshotManager(chatId: string): ScreenshotManager {
  const screenshots: Screenshot[] = []

  return {
    chatId,

    async capture(options?: ScreenshotOptions): Promise<Screenshot> {
      const result: Screenshot = {
        chatId,
        url: '',
        format: options?.format ?? defaultScreenshotConfig.defaultFormat,
        createdAt: new Date(),
        dimensions: options?.width && options?.height
          ? { width: options.width, height: options.height }
          : undefined,
      }
      screenshots.push(result)
      return result
    },

    async captureAll(options?: ScreenshotOptions): Promise<Screenshot[]> {
      const results: Screenshot[] = []
      const result = await this.capture(options)
      results.push(result)
      return results
    },

    getScreenshots() {
      return [...screenshots]
    },

    clear() {
      screenshots.length = 0
    },
  }
}

export type ScreenshotState = 'idle' | 'capturing' | 'captured' | 'error'

export interface ScreenshotStateTracker {
  chatId: string
  status: ScreenshotState
  error?: Error
  startCapturing(): void
  finishCapturing(): void
  failCapturing(error: Error): void
}

export function createScreenshotStateTracker(chatId: string): ScreenshotStateTracker {
  let currentStatus: ScreenshotState = 'idle'

  return {
    chatId,
    status: currentStatus,

    startCapturing() {
      currentStatus = 'capturing'
    },

    finishCapturing() {
      currentStatus = 'captured'
    },

    failCapturing(_err: Error) {
      currentStatus = 'error'
    },
  }
}
