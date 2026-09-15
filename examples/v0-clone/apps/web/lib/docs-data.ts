export type Doc = {
  id: string
  slug: string
  title: string
  section: string
  description: string
  topics: string[]
  sourceUrl: string
  headings: string[]
}

export const docs: Doc[] = [
  {
    id: 'getting-started',
    slug: 'getting-started',
    title: 'Getting started',
    section: 'Guides',
    description: 'Build your first app with v0 and learn the core workflow.',
    topics: ['basics', 'prompts', 'workspace'],
    sourceUrl: 'https://v0.app/docs/getting-started',
    headings: ['Create your first app', 'Iterate with prompts', 'Share and deploy'],
  },
  {
    id: 'code-editing',
    slug: 'code-editing',
    title: 'Code editing',
    section: 'Guides',
    description: 'Edit files, review changes, and work directly in the generated codebase.',
    topics: ['code', 'workspace', 'files'],
    sourceUrl: 'https://v0.app/docs/code-editing',
    headings: ['File explorer', 'Editing files', 'Reviewing changes'],
  },
  {
    id: 'terminal-commands',
    slug: 'terminal-commands',
    title: 'Terminal commands',
    section: 'Guides',
    description: 'Run development commands in the project workspace.',
    topics: ['terminal', 'commands', 'workspace'],
    sourceUrl: 'https://v0.app/docs/terminal-commands',
    headings: ['Running commands', 'Command output', 'Safety'],
  },
  {
    id: 'design-mode',
    slug: 'design-mode',
    title: 'Design mode',
    section: 'Guides',
    description: 'Tune a generated interface with visual design controls.',
    topics: ['design', 'styling', 'interface'],
    sourceUrl: 'https://v0.app/docs/design-mode',
    headings: ['Select an element', 'Adjust styles', 'Apply changes'],
  },
  {
    id: 'design-systems',
    slug: 'design-systems-2',
    title: 'Design systems',
    section: 'Guides',
    description: 'Create consistent visual foundations for generated apps.',
    topics: ['design', 'tokens', 'components'],
    sourceUrl: 'https://v0.app/docs/design-systems-2',
    headings: ['Design tokens', 'Reusable components', 'Applying a system'],
  },
  {
    id: 'images-videos',
    slug: 'images-and-videos',
    title: 'Images and videos',
    section: 'Guides',
    description: 'Add visual assets to your projects with the supported media workflow.',
    topics: ['media', 'assets', 'images'],
    sourceUrl: 'https://v0.app/docs/images-and-videos',
    headings: ['Adding media', 'Image prompts', 'Video assets'],
  },
  {
    id: 'versions',
    slug: 'versions',
    title: 'Versions',
    section: 'Guides',
    description: 'Compare, restore, and continue from earlier versions of a project.',
    topics: ['versions', 'history', 'workflow'],
    sourceUrl: 'https://v0.app/docs/versions',
    headings: ['Version history', 'Compare changes', 'Restore a version'],
  },
  {
    id: 'ai-models',
    slug: 'ai-models',
    title: 'AI models',
    section: 'Reference',
    description: 'Understand model choices and how they affect generation.',
    topics: ['ai', 'models', 'generation'],
    sourceUrl: 'https://v0.app/docs/ai-models',
    headings: ['Choosing a model', 'Generation quality', 'Model availability'],
  },
  {
    id: 'databases',
    slug: 'databases',
    title: 'Databases',
    section: 'Integrations',
    description: 'Connect a database when your application needs persistent data.',
    topics: ['database', 'storage', 'backend'],
    sourceUrl: 'https://v0.app/docs/databases',
    headings: ['Connect a database', 'Environment variables', 'Data access'],
  },
  {
    id: 'github',
    slug: 'github',
    title: 'GitHub',
    section: 'Integrations',
    description: 'Connect a repository and collaborate on project changes.',
    topics: ['github', 'git', 'collaboration'],
    sourceUrl: 'https://v0.app/docs/github',
    headings: ['Connect a repository', 'Branches and changes', 'Pull requests'],
  },
  {
    id: 'mcp',
    slug: 'MCP',
    title: 'MCP',
    section: 'Integrations',
    description: 'Use Model Context Protocol servers to extend the development workflow.',
    topics: ['mcp', 'tools', 'integrations'],
    sourceUrl: 'https://v0.app/docs/MCP',
    headings: ['What is MCP', 'Connect a server', 'Using tools'],
  },
  {
    id: 'pre-installed-agents',
    slug: 'pre-installed-agents',
    title: 'Pre-installed agents',
    section: 'Reference',
    description: 'Learn about agents available in the project environment.',
    topics: ['agents', 'automation', 'tools'],
    sourceUrl: 'https://v0.app/docs/pre-installed-agents',
    headings: ['Available agents', 'Agent capabilities', 'Using an agent'],
  },
]

export const sections = ['Guides', 'Reference', 'Integrations']
export const topics = [...new Set(docs.flatMap((doc) => doc.topics))]
export const getDoc = (slug: string) =>
  docs.find((doc) => doc.slug.toLowerCase() === slug.toLowerCase())
export function searchDocs(query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return docs
  return docs
    .map((doc) => ({
      doc,
      score: [doc.title, doc.description, doc.section, ...doc.topics, ...doc.headings]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
        ? 1
        : 0,
    }))
    .filter(({ score }) => score > 0)
    .map(({ doc }) => doc)
}
