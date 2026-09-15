export type PaperMode = 'paper' | 'document' | 'presentation'

export interface PaperConfig {
  mode: PaperMode
  layout: 'single-column' | 'two-column' | 'wide'
  typography: {
    fontFamily: string
    fontSize: number
    lineHeight: number
    headingFont: string
    headingSize: number
  }
  colors: {
    background: string
    text: string
    accent: string
    border: string
  }
  print: {
    enabled: boolean
    pageSize: string
    margins: {
      top: string
      bottom: string
      left: string
      right: string
    }
  }
}

export const defaultPaperConfig: PaperConfig = {
  mode: 'paper',
  layout: 'single-column',
  typography: {
    fontFamily: 'Georgia, serif',
    fontSize: 16,
    lineHeight: 1.8,
    headingFont: 'Helvetica, sans-serif',
    headingSize: 24,
  },
  colors: {
    background: '#ffffff',
    text: '#1a1a1a',
    accent: '#333333',
    border: '#e0e0e0',
  },
  print: {
    enabled: true,
    pageSize: 'A4',
    margins: {
      top: '2cm',
      bottom: '2cm',
      left: '2.5cm',
      right: '2.5cm',
    },
  },
}

export interface PaperDocument {
  title: string
  sections: PaperSection[]
  config: PaperConfig
  createdAt: Date
  updatedAt: Date
}

export interface PaperSection {
  heading: string
  content: string
  level: number
}

export interface PaperRenderer {
  render(document: PaperDocument): string
  renderToPDF(document: PaperDocument): Promise<Blob>
  renderToHTML(document: PaperDocument): string
}

export interface PaperState {
  document: PaperDocument
  mode: PaperMode
  isEditing: boolean
  isPreviewing: boolean
  isPrintReady: boolean
}

export function createPaperDocument(title: string, config?: Partial<PaperConfig>): PaperDocument {
  const fullConfig = { ...defaultPaperConfig, ...config }
  return {
    title,
    sections: [],
    config: fullConfig,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function addPaperSection(document: PaperDocument, section: PaperSection): PaperDocument {
  return {
    ...document,
    sections: [...document.sections, section],
    updatedAt: new Date(),
  }
}

export function updatePaperConfig(document: PaperDocument, config: Partial<PaperConfig>): PaperDocument {
  return {
    ...document,
    config: { ...document.config, ...config },
    updatedAt: new Date(),
  }
}
