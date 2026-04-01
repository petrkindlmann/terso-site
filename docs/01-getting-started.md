# Getting Started

Terso is a local context compiler for coding agents. It captures your development knowledge and syncs structured Markdown into your project repos so AI agents like Cursor and Claude Code can read it naturally.

## Install

```bash
npm install -g terso
```

Or use without installing:

```bash
npx terso sync
```

## Quick start

### 1. Initialize in your project

```bash
cd ~/projects/my-app
terso init
```

This creates a `.terso/` directory with template files and a `config.json`.

### 2. Capture something

```bash
terso capture "switched from Clerk to Supabase Auth for unified data layer"
```

### 3. Sync context

```bash
terso sync
```

This writes structured Markdown files to `.terso/generated/`:

```
.terso/generated/
  CURRENT_CONTEXT.md     -- project summary, stack, recent changes
  RECENT_DECISIONS.md    -- last 7 days of architecture decisions
  SHARED_OPS.md          -- relevant deploy recipes, code standards
  KNOWN_RISKS.md         -- active issues and incidents
  context.json           -- machine-readable metadata
```

### 4. Your AI agent reads it

Open Cursor or Claude Code. They automatically read the `.terso/generated/` files and know your project context. No APIs, no plugins, no MCP servers.
