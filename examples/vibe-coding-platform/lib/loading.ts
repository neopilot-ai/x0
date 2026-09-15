export function previewLoadingHtml(sandboxId: string, port: number): Response {
  const html = `<!DOCTYPE html>
<html>
<head><title>Preview Loading</title></head>
<body>
<div id="sandbox-loading">
  <p>Loading preview for sandbox ${sandboxId}...</p>
  <script>
    setTimeout(() => window.location.reload(), 3000)
  </script>
</div>
</body>
</html>`
  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html' },
  })
}
