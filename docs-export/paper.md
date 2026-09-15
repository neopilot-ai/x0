---
title: Paper
description: Paper mode
product: v0
type: guide
---

# Paper

v0's paper mode focuses on layout and typography for document-style applications. Use paper mode when building documents, reports, or content-focused applications.

## Features

- Clean, document-focused layouts
- Typography controls
- Print-friendly designs

## PaperConfig

The `PaperConfig` interface defines the paper mode configuration:

```typescript
import { PaperConfig, defaultPaperConfig, createPaperDocument } from 'v0'

const config: PaperConfig = {
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
```

## PaperMode

Available paper modes:

- `'paper'` — Standard paper mode with document-focused layout
- `'document'` — Document mode for structured content
- `'presentation'` — Presentation mode for slide-like layouts

## Layout Options

- `'single-column'` — Single column layout
- `'two-column'` — Two column layout
- `'wide'` — Wide layout for large screens

## Creating a Paper Document

Use `createPaperDocument()` to create a new paper document with the default configuration or a custom configuration.

```typescript
import { createPaperDocument, addPaperSection, updatePaperConfig } from 'v0'

const document = createPaperDocument('My Document', {
  mode: 'paper',
  layout: 'two-column',
})

const updated = addPaperSection(document, {
  heading: 'Introduction',
  content: 'This is the introduction.',
  level: 1,
})

const styled = updatePaperConfig(updated, {
  typography: {
    ...updated.config.typography,
    fontSize: 18,
  },
})
```

## PaperSection

Each section has:

- `heading` — Section heading text
- `content` — Section content
- `level` — Heading level (1-6)

## PaperDocument

A `PaperDocument` contains:

- `title` — Document title
- `sections` — Array of `PaperSection` objects
- `config` — `PaperConfig` configuration
- `createdAt` — Creation timestamp
- `updatedAt` — Last update timestamp

## PaperRenderer

The `PaperRenderer` interface provides rendering methods:

- `render(document)` — Render as HTML string
- `renderToPDF(document)` — Render as PDF blob
- `renderToHTML(document)` — Render as HTML string

## PaperState

The `PaperState` interface tracks the document editing state:

- `document` — The current paper document
- `mode` — Current paper mode
- `isEditing` — Whether the document is being edited
- `isPreviewing` — Whether the document is being previewed
- `isPrintReady` — Whether the document is ready for print

## See Also

- [createPaperDocument](/docs/api/v2/guides/browser-entry)
- [addPaperSection](/docs/api/v2/guides/browser-entry)
- [updatePaperConfig](/docs/api/v2/guides/browser-entry)
