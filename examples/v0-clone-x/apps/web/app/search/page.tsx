import { SearchClient } from '@/components/search/search-client'

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <SearchClient initialQuery={(await searchParams).q} />
}
