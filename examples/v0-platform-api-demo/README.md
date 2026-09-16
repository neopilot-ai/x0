# v0 Platform API Demo

A Next.js application showcasing the v0 Platform API. Build AI-powered apps with real-time generation, project management, and seamless deployment to Vercel.

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Configure environment: Create a `.env.local` file in the root directory:

   ```
   V0_API_KEY=your_api_key_here
   # Optional: For rate limiting
   KV_REST_API_URL=your_kv_rest_api_url
   KV_REST_API_TOKEN=your_kv_rest_api_token
   ```

3. Run development server:
   ```bash
   bun run dev
   ```

## Features

- **AI App Generation**: Create applications from natural language prompts
- **Project Management**: Organize work into projects
- **Live Preview**: Preview generated applications
- **Chat Management**: Continue conversations, fork chats, rename, delete
- **One-Click Deployment**: Deploy to Vercel
- **Rate Limiting**: 3 AI generations per 12 hours

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run linter
- `bun run typecheck` - Run TypeScript type checking
