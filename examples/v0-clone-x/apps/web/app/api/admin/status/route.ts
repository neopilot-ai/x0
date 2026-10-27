import { coverageReport } from '@/lib/docs-store'

export const runtime = 'nodejs'

export async function GET() {
  const report = coverageReport()
  return Response.json({
    ok: true,
    dataVersion: report.generatedAt,
    counts: {
      total: report.total,
      withCode: report.withCode,
      withApi: report.withApi,
      withIntegrations: report.withIntegrations,
      withTroubleshooting: report.withTroubleshooting,
      topics: Object.keys(report.byCategory).length,
    },
    sections: report.bySection,
    categories: report.byCategory,
    processed: report.processed,
    failed: report.failed,
    empty: report.empty,
    note: 'Static knowledge base loaded at build time; re-run scripts/ingest-docs.mjs and redeploy to refresh.',
  })
}
