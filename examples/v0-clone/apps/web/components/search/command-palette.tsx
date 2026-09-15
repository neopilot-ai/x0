'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { docs, sections, topics, searchDocs } from '@/lib/docs-data'
import { ExternalIcon as ExternalLink } from '@/lib/icons'

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const results = React.useMemo(() => searchDocs(query, 7), [query])

  const run = React.useCallback(
    (href: string) => {
      router.push(href)
      setOpen(false)
      setQuery('')
    },
    [router],
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Jump to" description="Search the documentation corpus and navigation.">
      <CommandInput
        placeholder="Search docs, topics, sections..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {query ? 'No indexed documentation matches.' : 'Type to search the documentation corpus.'}
        </CommandEmpty>
        <CommandGroup heading="Documentation">
          {results.map(({ doc }) => (
            <CommandItem key={doc.id} onSelect={() => run(`/docs/${doc.slug}`)}>
              <span className="truncate">{doc.title}</span>
              <span className="ml-2 shrink-0 truncate text-xs text-muted-foreground">
                {doc.section}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Surfaces">
              {[
                ['/docs', 'Documentation'],
                ['/api-reference', 'API reference'],
                ['/examples', 'Examples'],
                ['/integrations', 'Integrations'],
                ['/graph', 'Knowledge graph'],
                ['/assistant', 'Ask the docs'],
                ['/admin/coverage', 'Coverage report'],
              ].map(([href, label]) => (
                <CommandItem key={href} onSelect={() => run(href)}>
                  <span>{label}</span>
                  <ExternalLink className="text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Sections">
              {sections.map((section) => (
                <CommandItem key={section} onSelect={() => run(`/docs?section=${encodeURIComponent(section)}`)}>
                  {section}
                  <CommandShortcut>{docs.filter((doc) => doc.section === section).length}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Topics">
              {topics.slice(0, 12).map((topic) => (
                <CommandItem key={topic} onSelect={() => run(`/topics/${encodeURIComponent(topic)}`)}>
                  {topic}
                  <CommandShortcut>{docs.filter((doc) => doc.topics.includes(topic)).length}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}