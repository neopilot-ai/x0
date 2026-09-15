import { SearchPage } from '@/components/docs/directory-page'
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) { return <SearchPage query={(await searchParams).q} /> }
