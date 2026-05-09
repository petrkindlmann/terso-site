# Agent Integration

Terso ships two ways for AI coding agents to read your project context. Pick whichever fits — or use both.

## 1. The emit flow (offline, recommended start)

You write `AGENTS.md` once. `terso emit` compiles it into the config file each agent expects:

| Agent | File |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |

Each agent reads its native file at the project root. No plugins, no MCP, no API calls. See [AGENTS.md Compiler](./03-agents-md-compiler.md) for details.

## 2. The Omnus flow (connected, richer memory)

For richer, dynamically-updated context — captured decisions, cross-project search, shared ops — connect to [Omnus](https://omnus.dev) and run `terso sync`. Files land in `.terso/generated/` and are read by file-aware agents.

### Cursor

Cursor automatically indexes all files in your project directory. Reference Terso files from `.cursorrules` (which `terso emit` keeps in sync with `AGENTS.md`):

```
Always read .terso/generated/CURRENT_CONTEXT.md before making
architectural decisions.
```

### Claude Code

Claude Code reads `CLAUDE.md` automatically. Add Terso references to your `AGENTS.md` (the canonical source) and they'll flow into `CLAUDE.md` on the next `emit`:

```markdown
## Before you start
1. Run `terso sync` to pull current context.
2. Read .terso/generated/CURRENT_CONTEXT.md for project state.
3. Reference .terso/STATUS.md for current priorities.
```

### GitHub Copilot

Since `.terso/generated/` is in `.gitignore`, Copilot won't see generated files by default. Two options:

**Commit generated files** (they're not secret):

```bash
# Remove from .terso/.gitignore, commit them
terso sync
git add .terso/generated/
git commit -m "chore: sync terso context"
```

**Or run sync in CI** so context is always fresh:

```yaml
# .github/workflows/sync-context.yml
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
      - run: npx terso-cli sync
      - run: |
          git add .terso/generated/
          git commit -m "chore: sync terso context" || true
          git push
```

## Any file-aware agent

If your agent reads files in the project directory, it can read Terso output. Both flows produce plain Markdown. No special parsing required.
