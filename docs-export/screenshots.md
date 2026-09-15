---
title: Screenshots and Files
description: Turn your mockups or wireframes into high-fidelity designs
product: v0
type: guide
related:
  - /docs/images-and-videos
  - /docs/figma
---

# Screenshots and Files

The v0 attachment feature allows users to upload or drag and drop files into the chat. v0 analyzes these files and generates code to replicate the design interface shown, making it useful for turning mockups into high-fidelity designs, and processing code or data.

## How it works

Upload a file by clicking the attachment icon or dragging the file into the chat. If it's a screenshot, v0 will analyze the layout, colors, and components in the image, then generate code that closely replicates the design. It also infers likely functionality based on visible UI elements.

![Screenshot attachment](/docs/light/screenshot.png)

## Best practices

- Use high-resolution screenshots for better accuracy.
- Include the full interface for more context, or crop tightly if focusing on a specific area.
- Add instructions to help clarify behavior, flows, or edge cases.
- Consider using a [Figma file](/docs/figma) for better results.

v0 defaults to using [shadcn/ui](https://ui.shadcn.com/) components. While v0 has knowledge of other component libraries and frameworks, using **Next.js**, **Tailwind CSS**, and **shadcn/ui** will help it generate better results.
