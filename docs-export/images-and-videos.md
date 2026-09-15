---
title: Images, Videos, and File Uploads
description: Attach media, documents, code, and other supported assets to give v0 context or add them to your application
product: v0
type: guide
related:
  - /docs/screenshots
  - /docs/figma
---

# Images, Videos, and File Uploads

You can attach images, videos, audio, documents, code, and other assets to give v0 context or add them to your application. v0 supports uploading files directly into the chat or copying and pasting images from your clipboard.

For turning mockups into code specifically, see [Screenshots and Files](/docs/screenshots). For image output in generations, pass `imageGenerations: true` in the model's configuration (up to 5 images per version):

```typescript
const result = await v0.chats.create({
  message: 'Create a landing page with hero images',
  modelConfiguration: { modelId: 'v0-pro', imageGenerations: true },
})
```

## Uploading files

### Using the attachment button

1. Click the **+ icon** in the chat input area and choose **Upload from computer**
2. Select a supported file from your device
3. The file will be uploaded and displayed in the chat
4. Add your prompt describing how v0 should use the file

### Drag and drop

Drag files directly into the chat area — drop when you see the upload indicator.

### Copy and paste

Copy images from any application and paste with `Cmd` + `V` (Mac) or `Ctrl` + `V` (Windows/Linux).

## Supported file types

| Category | Supported formats |
| --- | --- |
| Images | PNG, JPEG/JPG, WebP, GIF, SVG, ICO, AVIF |
| Video | MP4, WebM, OGG, MOV/QuickTime |
| Audio | MP3/MPEG, WAV, OGG |
| Documents | PDF, DOCX, XLSX |
| 3D and model assets | GLB, glTF, OBJ |
| Text, code, and data | Plain text and `text/*`; JSON, TypeScript, JavaScript, YAML, SQL, XML, shell, PHP, Ruby, AWK |
| Archives | ZIP, GZIP/GZ |
| Fonts | WOFF, WOFF2, TTF |
| Email | EML |
| Rive assets | RIV |

File acceptance is based primarily on the detected MIME type. DOCX and XLSX files are available in VM-backed chats, where v0 materializes and reads them in the sandbox. Legacy DOC and XLS files are not supported.

## Use cases

- **Product galleries and catalogs**: "Build a product catalog page that displays these product images in a responsive grid."
- **Media players**: "Create a video player component that can display this video with custom controls."
- **User avatars**: "Build a user profile page that displays this avatar image and allows users to upload their own."
- **Hero sections**: "Create a hero section using this background image with overlay text and call-to-action buttons."

## Limits

| Upload type | Free users | Paid users |
| --- | --- | --- |
| Chat attachments | 5 MB | 20 MB |
| ZIP file uploads | 10 MB | 50 MB |

## Best practices

- Use **high-resolution images** (at least 1024px wide) for better display quality
- Optimize images for web use to ensure fast loading times
- Combine media with clear instructions to get better results

## Troubleshooting

If uploads fail: check the size limit, confirm the format is supported, and try refreshing the page. If v0 isn't integrating your media properly: give more specific instructions about how it should be displayed, specify the component type (gallery, player, background), and include layout preferences (grid, carousel, single display).
