# Agent Integration

Terso works with any AI coding agent that reads local files. No plugins, APIs, or MCP servers needed.

## Cursor

Cursor automatically indexes all files in your project directory. When `.terso/generated/CURRENT_CONTEXT.md` exists, Cursor includes it in context when answering questions or generating code.

Optional `.cursorrules` addition:

```
When working on this project, read .terso/generated/CURRENT_CONTEXT.md
and .terso/generated/SHARED_OPS.md before making architectural decisions.
```

## Claude Code

Claude Code reads `CLAUDE.md` automatically. Add Terso references to your project's `CLAUDE.md`:

```markdown
## Before you start
1. Run `terso sync` to get current context
2. Read .terso/generated/CURRENT_CONTEXT.md
3. Read .terso/STATUS.md for current priorities
4. Reference .terso/generated/SHARED_OPS.md for deploy and service patterns
```

Claude Code can also run `terso sync` directly if the CLI is installed globally.

## GitHub Copilot

Copilot indexes repo files. Since `.terso/generated/` is in `.gitignore`, Copilot won't see generated files by default.

**Option A:** Commit generated files (they're not secret):
```bash
# Remove from .gitignore, commit them
terso sync
git add .terso/generated/
git commit -m "chore: sync terso context"
```

**Option B:** Use CI to auto-commit context:
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
      - run: npx terso sync
      - run: git add .terso/generated/
      - run: git commit -m "chore: sync terso context" || true
      - run: git push
```

## Any file-aware agent

If your agent can read files in the project directory, it can read Terso context. The files are plain Markdown with YAML frontmatter. No special parsing required.
