/**
 * Tiny, dependency-free syntax highlighter used by the code editor overlay.
 *
 * Tokenizes source into HTML-safe strings with theme classes (`.tk-*`).
 * The palette lives in `app/globals.css` under `--code-*` custom properties.
 */

export type Language =
  | 'ts'
  | 'go'
  | 'python'
  | 'shell'
  | 'json'
  | 'yaml'
  | 'css'
  | 'html'
  | 'markdown'
  | 'plain'

const EXTENSION_LANGUAGES: Record<string, Language> = {
  ts: 'ts',
  tsx: 'ts',
  js: 'ts',
  jsx: 'ts',
  mts: 'ts',
  cts: 'ts',
  mjs: 'ts',
  cjs: 'ts',
  go: 'go',
  py: 'python',
  python: 'python',
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  cli: 'shell',
  json: 'json',
  json5: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  css: 'css',
  scss: 'css',
  less: 'css',
  html: 'html',
  htm: 'html',
  svg: 'html',
  xml: 'html',
  md: 'markdown',
  mdx: 'markdown',
  markdown: 'markdown',
}

const SPECIAL_PATHS: Record<string, Language> = {
  'package.json': 'json',
  'tsconfig.json': 'json',
  'next.config.js': 'ts',
  'next.config.ts': 'ts',
  'next.config.mjs': 'ts',
  'eslint.config.js': 'ts',
  'eslint.config.mjs': 'ts',
  '.gitignore': 'plain',
  '.env': 'plain',
  '.env.local': 'plain',
  Dockerfile: 'plain',
}

export function languageForPath(path: string): Language {
  const name = path.slice(path.lastIndexOf('/') + 1)
  const special = SPECIAL_PATHS[name]
  if (special) return special
  const dot = name.lastIndexOf('.')
  if (dot === -1) return 'plain'
  const ext = name.slice(dot + 1).toLowerCase()
  return EXTENSION_LANGUAGES[ext] ?? 'plain'
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/** Shared grammar options for C-style programming languages. */
type ProgramOptions = {
  lineComments: string[]
  blockComments: { open: string; close: string }[]
  quotes: { open: string; close: string }[]
  keywords: ReadonlySet<string>
  literals: ReadonlySet<string>
  variablePrefixes?: string[]
}

const TS_KEYWORDS = new Set([
  'abstract',
  'as',
  'asserts',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'declare',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'finally',
  'for',
  'from',
  'function',
  'get',
  'if',
  'implements',
  'import',
  'in',
  'infer',
  'instanceof',
  'interface',
  'is',
  'keyof',
  'let',
  'namespace',
  'new',
  'of',
  'override',
  'package',
  'private',
  'protected',
  'public',
  'readonly',
  'return',
  'satisfies',
  'set',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'type',
  'using',
  'var',
  'void',
  'while',
  'with',
  'yield',
])
const TS_TYPES = new Set([
  'any',
  'bigint',
  'boolean',
  'never',
  'number',
  'object',
  'string',
  'symbol',
  'unknown',
])
const TS_LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'])

const GO_KEYWORDS = new Set([
  'break',
  'case',
  'chan',
  'const',
  'continue',
  'default',
  'defer',
  'else',
  'fallthrough',
  'for',
  'func',
  'go',
  'goto',
  'if',
  'import',
  'interface',
  'map',
  'package',
  'range',
  'return',
  'select',
  'struct',
  'switch',
  'type',
  'var',
])
const GO_LITERALS = new Set(['true', 'false', 'nil', 'iota'])

const PYTHON_KEYWORDS = new Set([
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'case',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'match',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
])
const PYTHON_LITERALS = new Set(['None', 'True', 'False'])

const SHELL_KEYWORDS = new Set([
  'case',
  'do',
  'done',
  'elif',
  'else',
  'esac',
  'fi',
  'for',
  'function',
  'if',
  'in',
  'local',
  'readonly',
  'select',
  'then',
  'until',
  'while',
])
const SHELL_LITERALS = new Set(['true', 'false'])

const JSON_LITERALS = new Set(['true', 'false', 'null'])
const YAML_LITERALS = new Set(['true', 'false', 'null', 'yes', 'no', 'on', 'off'])

const PROGRAMS: Record<'ts' | 'go' | 'python' | 'shell' | 'json' | 'yaml', ProgramOptions> = {
  ts: {
    lineComments: ['//'],
    blockComments: [{ open: '/*', close: '*/' }],
    quotes: [
      { open: '`', close: '`' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    keywords: new Set([...TS_KEYWORDS, ...TS_TYPES]),
    literals: TS_LITERALS,
  },
  go: {
    lineComments: ['//'],
    blockComments: [{ open: '/*', close: '*/' }],
    quotes: [
      { open: '`', close: '`' },
      { open: '"', close: '"' },
    ],
    keywords: GO_KEYWORDS,
    literals: GO_LITERALS,
  },
  python: {
    lineComments: ['#'],
    blockComments: [],
    quotes: [
      { open: "'''", close: "'''" },
      { open: '"""', close: '"""' },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    keywords: PYTHON_KEYWORDS,
    literals: PYTHON_LITERALS,
  },
  shell: {
    lineComments: ['#'],
    blockComments: [],
    quotes: [
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    keywords: SHELL_KEYWORDS,
    literals: SHELL_LITERALS,
    variablePrefixes: ['$'],
  },
  json: {
    lineComments: [],
    blockComments: [],
    quotes: [{ open: '"', close: '"' }],
    keywords: new Set(),
    literals: JSON_LITERALS,
  },
  yaml: {
    lineComments: ['#', '---'],
    blockComments: [],
    quotes: [
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    keywords: new Set(),
    literals: YAML_LITERALS,
  },
}

const NUMBER_PATTERN = /(?:0[xXbB][0-9a-fA-F]+|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)/

const WORD_START = /[A-Za-z$_]/
const WORD_CHAR = /[A-Za-z0-9$_]/
const OPERATOR_CHARS = new Set('=+-*/%<>&|^~!?:.')

function highlightProgram(code: string, options: ProgramOptions): string {
  const { lineComments, blockComments, quotes, keywords, literals, variablePrefixes = [] } = options
  let html = ''
  let i = 0
  let previous = ''

  const emit = (text: string, className?: string) => {
    const safe = escapeHtml(text)
    if (className) html += `<span class="${className}">${safe}</span>`
    else html += safe
    if (/(?:\S)/.test(text)) previous = text[text.length - 1]
  }

  while (i < code.length) {
    let hit = false

    for (const { open, close } of blockComments) {
      if (code.startsWith(open, i)) {
        const end = code.indexOf(close, i + open.length)
        emit(code.slice(i, end === -1 ? code.length : end + close.length), 'tk-comment')
        i = end === -1 ? code.length : end + close.length
        hit = true
        break
      }
    }
    if (hit) continue

    for (const marker of lineComments) {
      if (code.startsWith(marker, i)) {
        const end = code.indexOf('\n', i)
        emit(code.slice(i, end === -1 ? code.length : end), 'tk-comment')
        i = end === -1 ? code.length : end
        hit = true
        break
      }
    }
    if (hit) continue

    const quote = quotes.find(({ open }) => code.startsWith(open, i))
    if (quote) {
      let j = i + quote.open.length
      while (j < code.length) {
        if (code[j] === '\\') {
          j += 2
          continue
        }
        if (code.startsWith(quote.close, j)) break
        j += 1
      }
      const end = j < code.length ? j + quote.close.length : code.length
      emit(code.slice(i, end), 'tk-string')
      i = end
      continue
    }

    const prefix = variablePrefixes.find((value) => code.startsWith(value, i))
    if (prefix && WORD_START.test(code[i + prefix.length] ?? '')) {
      let j = i + prefix.length
      while (j < code.length && WORD_CHAR.test(code[j])) j += 1
      emit(code.slice(i, j), 'tk-property')
      i = j
      continue
    }

    if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i + 1] ?? ''))) {
      const match = NUMBER_PATTERN.exec(code.slice(i))
      if (match && match[0]) {
        emit(match[0], 'tk-number')
        i += match[0].length
        continue
      }
    }

    if (WORD_START.test(code[i])) {
      let j = i
      while (j < code.length && WORD_CHAR.test(code[j])) j += 1
      const word = code.slice(i, j)
      let className: string | undefined
      if (keywords.has(word)) className = 'tk-keyword'
      else if (literals.has(word)) className = 'tk-literal'
      else {
        let k = j
        while (k < code.length && /\s/.test(code[k])) k += 1
        const next = code[k]
        if (next === '(') className = 'tk-fn'
        else if (previous === '.') className = 'tk-property'
        else if (next === ':' && previous !== ':' && previous !== '?') className = 'tk-property'
      }
      emit(word, className)
      i = j
      continue
    }

    const ch = code[i]
    emit(ch, OPERATOR_CHARS.has(ch) ? 'tk-operator' : undefined)
    i += 1
  }

  return html
}

function highlightCss(code: string): string {
  let html = ''
  let i = 0

  const emit = (text: string, className?: string) => {
    const safe = escapeHtml(text)
    if (className) html += `<span class="${className}">${safe}</span>`
    else html += safe
  }

  while (i < code.length) {
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2)
      emit(code.slice(i, end === -1 ? code.length : end + 2), 'tk-comment')
      i = end === -1 ? code.length : end + 2
      continue
    }

    const ch = code[i]
    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < code.length && code[j] !== ch) j += 1
      emit(code.slice(i, j < code.length ? j + 1 : code.length), 'tk-string')
      i = j < code.length ? j + 1 : code.length
      continue
    }

    if (ch === '@') {
      const match = /^@[\w-]+/.exec(code.slice(i))
      if (match) {
        emit(match[0], 'tk-keyword')
        i += match[0].length
        continue
      }
    }

    if (ch === '#') {
      const hex = /^#[0-9a-fA-F]{3,8}\b/.exec(code.slice(i))
      if (hex) {
        emit(hex[0], 'tk-number')
        i += hex[0].length
        continue
      }
    }

    if (ch === '-' && code[i + 1] === '-') {
      const match = /^--[\w-]+/.exec(code.slice(i))
      if (match) {
        emit(match[0], 'tk-property')
        i += match[0].length
        continue
      }
    }

    if (/[0-9]/.test(ch)) {
      const match =
        /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%|vh|vw|vmin|vmax|s|ms|deg|rad|fr|ch|ex|cm|mm|in|pt|pc)?/.exec(
          code.slice(i),
        )
      if (match) {
        emit(match[0], 'tk-number')
        i += match[0].length
        continue
      }
    }

    if (/[A-Za-z_]/.test(ch)) {
      const word = /^[A-Za-z_][\w-]*/.exec(code.slice(i))![0]
      let k = i + word.length
      while (k < code.length && /\s/.test(code[k])) k += 1
      const next = code[k]
      emit(word, next === '(' ? 'tk-fn' : next === ':' ? 'tk-property' : undefined)
      i += word.length
      continue
    }

    emit(ch)
    i += 1
  }

  return html
}

function highlightHtml(code: string): string {
  let html = ''
  let i = 0

  const emit = (text: string, className?: string) => {
    const safe = escapeHtml(text)
    if (className) html += `<span class="${className}">${safe}</span>`
    else html += safe
  }

  while (i < code.length) {
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4)
      emit(code.slice(i, end === -1 ? code.length : end + 3), 'tk-comment')
      i = end === -1 ? code.length : end + 3
      continue
    }

    if (code[i] !== '<') {
      const next = code.indexOf('<', i)
      emit(code.slice(i, next === -1 ? code.length : next))
      i = next === -1 ? code.length : next
      continue
    }

    emit('<', 'tk-tag')
    i += 1
    if (code[i] === '/') {
      emit('/', 'tk-tag')
      i += 1
    }
    const name = /^[A-Za-z][\w-]*/.exec(code.slice(i))
    if (name) {
      emit(name[0], 'tk-tag')
      i += name[0].length
    }

    while (i < code.length && code[i] !== '>') {
      if (/\s/.test(code[i])) {
        emit(code[i])
        i += 1
        continue
      }
      if (code[i] === '=') {
        emit('=', 'tk-operator')
        i += 1
        continue
      }
      if (code[i] === '"' || code[i] === "'") {
        const quote = code[i]
        let j = i + 1
        while (j < code.length && code[j] !== quote) j += 1
        emit(code.slice(i, j < code.length ? j + 1 : code.length), 'tk-string')
        i = j < code.length ? j + 1 : code.length
        continue
      }
      const attr = /^[A-Za-z_:][\w:.-]*/.exec(code.slice(i))
      if (attr) {
        emit(attr[0], 'tk-attr')
        i += attr[0].length
        continue
      }
      emit(code[i])
      i += 1
    }
    if (code[i] === '>') {
      emit('>', 'tk-tag')
      i += 1
    }
  }

  return html
}

function highlightMarkdown(code: string): string {
  const lines = code.split('\n')
  let fence: string | null = null

  const renderInline = (raw: string) => {
    const escaped = escapeHtml(raw)
    return escaped.replace(
      /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g,
      (match, codeGroup, linkGroup) => {
        if (codeGroup) return `<span class="tk-string">${codeGroup}</span>`
        if (linkGroup) {
          const inner = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(linkGroup)
          if (inner) {
            const [, text, url] = inner
            return `<span class="tk-string">[${text}]</span><span class="tk-fn">(${url})</span>`
          }
        }
        return match
      },
    )
  }

  const rows: string[] = []
  for (const line of lines) {
    if (fence) {
      rows.push(`<span class="tk-string">${escapeHtml(line)}</span>`)
      if (/^(```|~~~)/.test(line.trim())) fence = null
      continue
    }
    if (/^(```|~~~)/.test(line.trim())) {
      fence = line
      rows.push(`<span class="tk-string">${escapeHtml(line)}</span>`)
      continue
    }
    const heading = /^(#{1,6})\s+/.exec(line)
    if (heading) {
      rows.push(
        `<span class="tk-keyword">${escapeHtml(heading[1])}</span> ${renderInline(line.slice(heading[1].length + 1))}`,
      )
      continue
    }
    rows.push(renderInline(line))
  }

  return rows.join('\n')
}

/**
 * Highlights source code into an HTML string safe for `dangerouslySetInnerHTML`.
 */
export function highlight(code: string, language: Language): string {
  if (language === 'plain') return escapeHtml(code)
  if (language === 'css') return highlightCss(code)
  if (language === 'html') return highlightHtml(code)
  if (language === 'markdown') return highlightMarkdown(code)
  return highlightProgram(code, PROGRAMS[language])
}

/**
 * Highlights source code for a given project-relative file path.
 */
export function highlightCodeForPath(code: string, path: string): string {
  return highlight(code, languageForPath(path))
}
