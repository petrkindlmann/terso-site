export interface DocMeta {
  slug: string;
  title: string;
  order: number;
}

// Inline doc content at build time — no fs.readFileSync needed on Workers
const DOCS: Record<string, { title: string; content: string }> = {
  "getting-started": {
    title: "Getting Started",
    content: `# Getting Started

Terso is a local context compiler for coding agents. It captures your development knowledge and syncs structured Markdown into your project repos so AI agents like Cursor and Claude Code can read it naturally.

## Install

\`\`\`bash
npm install -g terso-cli
\`\`\`

Or use without installing:

\`\`\`bash
npx terso-cli sync
\`\`\`

## Quick start

### 1. Initialize in your project

\`\`\`bash
cd ~/projects/my-app
terso init
\`\`\`

This creates a \`.terso/\` directory with template files and a \`config.json\`.

### 2. Capture something

\`\`\`bash
terso capture "switched from Clerk to Supabase Auth for unified data layer"
\`\`\`

### 3. Sync context

\`\`\`bash
terso sync
\`\`\`

This writes structured Markdown files to \`.terso/generated/\`:

\`\`\`
.terso/generated/
  CURRENT_CONTEXT.md     -- project summary, stack, recent changes
  RECENT_DECISIONS.md    -- last 7 days of architecture decisions
  SHARED_OPS.md          -- relevant deploy recipes, code standards
  KNOWN_RISKS.md         -- active issues and incidents
  context.json           -- machine-readable metadata
\`\`\`

### 4. Your AI agent reads it

Open Cursor or Claude Code. They automatically read the \`.terso/generated/\` files and know your project context. No APIs, no plugins, no MCP servers.`,
  },
  "cli-reference": {
    title: "CLI Reference",
    content: `# CLI Reference

## terso init

Initialize Terso in a project directory.

\`\`\`bash
terso init
\`\`\`

Creates \`.terso/\` directory with template files. Interactive setup prompts for API endpoint and project detection.

## terso capture

Capture knowledge from the terminal.

\`\`\`bash
terso capture "your text here"
\`\`\`

**Output:**
\`\`\`
ingestionId: ing_abc123
status: queued
\`\`\`

## terso auth

Manage API authentication.

\`\`\`bash
terso auth set <token>   # save API token
terso auth status        # show auth status
terso auth clear         # remove stored token
\`\`\`

Tokens are stored in \`~/.terso/config.json\`. Override with \`TERSO_API_TOKEN\` env var.

## terso sync

Pull context from Omnus and write to \`.terso/generated/\`.

\`\`\`bash
terso sync
terso sync --force
terso sync --dry-run
\`\`\`

**Options:**
- \`--force\` -- overwrite even if fresh
- \`--dry-run\` -- preview without writing

## terso search

Quick search from the terminal.

\`\`\`bash
terso search "stripe webhook setup"
\`\`\`

Returns top 3 results with source links and freshness indicators.

## terso status

Show current project knowledge status.

\`\`\`bash
terso status
\`\`\`

## terso doctor

Check project health and configuration.

\`\`\`bash
terso doctor
\`\`\`

Verifies: \`.git\` exists, \`.terso/config.json\` present, API connectivity, stale context warnings.

## terso watch

Watch for file changes and auto-capture significant changes.

\`\`\`bash
terso watch
\`\`\`

## terso compile

Compile raw local captures into structured context (works offline).

\`\`\`bash
terso compile
\`\`\`

Reads from \`.terso/local/captures.jsonl\`, organizes into structured Markdown, and writes to \`.terso/generated/\`.`,
  },
  "terso-format": {
    title: ".terso/ Format",
    content: `# .terso/ Directory Format

The \`.terso/\` directory is the standard format for project context that coding agents read.

## Directory structure

\`\`\`
project-root/
  .terso/
    config.json              # terso configuration
    PROJECT.md               # hand-maintained: what this project is
    ARCHITECTURE.md          # hand-maintained: current system design
    ENVIRONMENT.md           # hand-maintained: services, env vars (no values)
    STATUS.md                # hand-maintained: current state, roadmap
    DECISIONS/
      2026-03.md             # hand-maintained: monthly decision log
    DEBUG/
      2026-03.md             # hand-maintained: monthly debug log
    local/
      captures.jsonl         # offline captures before sync
    generated/               # machine-generated, overwritten on sync
      CURRENT_CONTEXT.md
      RECENT_DECISIONS.md
      SHARED_OPS.md
      KNOWN_RISKS.md
      context.json
\`\`\`

## Hand-maintained vs generated

**Hand-maintained files** (committed to git):
- \`PROJECT.md\` -- what this project is, who it's for
- \`ARCHITECTURE.md\` -- current system design (state document, overwritten when truth changes)
- \`DECISIONS/\` -- monthly decision logs (ledger, append-only)
- \`DEBUG/\` -- monthly debug logs (ledger, append-only)

**Generated files** (\`.terso/generated/\` is in \`.gitignore\`):
- Overwritten on every \`terso sync\`
- Include YAML frontmatter with timestamps and source IDs
- Agents should treat these as current but disposable

## Generated file frontmatter

Every generated file starts with:

\`\`\`yaml
---
generated_at: "2026-03-15T10:00:00Z"
expires_at: "2026-03-16T10:00:00Z"
source_ids: ["mem_123", "mem_456"]
generator: "terso v0.1.0"
connected: true
freshness: "current"
---
\`\`\`

## project.json

\`\`\`json
{
  "projectId": "my-project",
  "apiUrl": "https://omnus.dev",
  "detectedFrom": "package.json",
  "verified": true,
  "createdAt": "2026-03-15T10:00:00Z"
}
\`\`\`

## State vs ledger documents

| If the content is... | Type | Update pattern |
|---|---|---|
| Current truth that replaces old truth | State | Overwrite the file |
| A new event that happened | Ledger | Append with timestamp |
| A temporary observation | Exhaust | Short TTL, auto-expire |`,
  },
  "agent-integration": {
    title: "Agent Integration",
    content: `# Agent Integration

Terso works with any AI coding agent that reads local files. No plugins, APIs, or MCP servers needed.

## Cursor

Cursor automatically indexes all files in your project directory. When \`.terso/generated/CURRENT_CONTEXT.md\` exists, Cursor includes it in context.

Optional \`.cursorrules\` addition:

\`\`\`
When working on this project, read .terso/generated/CURRENT_CONTEXT.md
and .terso/generated/SHARED_OPS.md before making architectural decisions.
\`\`\`

## Claude Code

Claude Code reads \`CLAUDE.md\` automatically. Add Terso references:

\`\`\`markdown
## Before you start
1. Run \\\`terso sync\\\` to get current context
2. Read .terso/generated/CURRENT_CONTEXT.md
3. Read .terso/STATUS.md for current priorities
4. Reference .terso/generated/SHARED_OPS.md for deploy patterns
\`\`\`

## GitHub Copilot

Since \`.terso/generated/\` is in \`.gitignore\`, Copilot won't see generated files by default.

**Option A:** Commit generated files (they're not secret):
\`\`\`bash
terso sync
git add .terso/generated/
git commit -m "chore: sync terso context"
\`\`\`

**Option B:** Use CI to auto-commit context:
\`\`\`yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 6 * * *'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx terso sync
      - run: git add .terso/generated/
      - run: git commit -m "chore: sync terso context" || true
      - run: git push
\`\`\`

## Any file-aware agent

If your agent can read files in the project directory, it can read Terso context. The files are plain Markdown with YAML frontmatter.`,
  },
  "standalone-vs-connected": {
    title: "Standalone vs Connected",
    content: `# Standalone vs Connected Mode

Terso works in two modes: standalone (offline, no account) and connected (synced with Omnus).

## Standalone mode

No Omnus account needed. Free, open-source, works offline.

\`\`\`bash
terso init
terso capture "switched auth to Supabase"
terso compile
\`\`\`

What works:
- Local capture to \`.terso/local/captures.jsonl\`
- Offline compilation into structured Markdown
- Secret scanning (regex-based, runs locally)
- File output to \`.terso/generated/\`

What's missing:
- No LLM-powered classification
- No cross-project search
- No portfolio monitoring
- No state consolidation

## Connected mode

Link to an Omnus account for the full pipeline.

\`\`\`bash
terso auth set <your-api-token>
terso sync
\`\`\`

What's added:
- LLM classification (Gemini Flash + Claude Sonnet)
- Cross-project knowledge search
- Shared operational knowledge
- Nightly state consolidation
- Review queue for uncertain items
- Portfolio health monitoring

## Configuration

Check connection status:

\`\`\`bash
terso doctor
\`\`\`

Clear API token to use standalone mode:

\`\`\`bash
terso auth clear
\`\`\``,
  },
};

const SLUG_ORDER = [
  "getting-started",
  "cli-reference",
  "terso-format",
  "agent-integration",
  "standalone-vs-connected",
];

export function getAllDocs(): DocMeta[] {
  return SLUG_ORDER.map((slug, i) => ({
    slug,
    title: DOCS[slug].title,
    order: i,
  }));
}

export function getDocBySlug(
  slug: string
): { meta: DocMeta; content: string } | null {
  const doc = DOCS[slug];
  if (!doc) return null;
  const order = SLUG_ORDER.indexOf(slug);
  return {
    meta: { slug, title: doc.title, order },
    content: doc.content,
  };
}

export function getDocSlugs(): string[] {
  return SLUG_ORDER;
}

export interface NavGroup {
  label: string;
  items: DocMeta[];
}

export function getNavGroups(): NavGroup[] {
  const docs = getAllDocs();
  return [
    {
      label: "Getting Started",
      items: docs.filter((d) =>
        ["getting-started", "cli-reference"].includes(d.slug)
      ),
    },
    {
      label: "Concepts",
      items: docs.filter((d) =>
        ["terso-format", "agent-integration"].includes(d.slug)
      ),
    },
    {
      label: "Modes",
      items: docs.filter((d) =>
        ["standalone-vs-connected"].includes(d.slug)
      ),
    },
  ];
}
