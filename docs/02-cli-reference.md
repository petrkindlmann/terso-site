# CLI Reference

## terso init

Initialize Terso in a project directory.

```bash
terso init
```

Creates `.terso/` directory with template files. Interactive setup prompts for API endpoint and project detection.

## terso capture

Capture knowledge from the terminal.

```bash
terso capture "your text here"
terso capture --clipboard    # capture from clipboard
```

**Options:**
- `--clipboard` — capture clipboard contents instead of text argument

**Output:**
```
ingestionId: ing_abc123
status: queued
```

If offline, captures are stored locally in `.terso/local/captures.jsonl` and synced when connectivity returns.

## terso sync

Pull context from Omnus and write to `.terso/generated/`.

```bash
terso sync
terso sync --force     # overwrite even if fresh
terso sync --dry-run   # preview without writing
```

**Options:**
- `--force` — overwrite existing files even if they're still fresh
- `--dry-run` — show what would be written without actually writing

**Output:**
```
Terso sync complete for: my-project
  CURRENT_CONTEXT.md    -- fresh (generated 2 min ago)
  RECENT_DECISIONS.md   -- fresh (3 decisions from last 7 days)
  SHARED_OPS.md         -- fresh (deploy/vercel + services/stripe)
```

## terso search

Quick search from the terminal.

```bash
terso search "stripe webhook setup"
```

Returns top 3 results with source links and freshness indicators.

## terso status

Show current project knowledge status.

```bash
terso status
```

**Output:**
```
Project: my-project
  Last sync: 2 hours ago
  Knowledge items: 47 (12 decisions, 8 bugs, 27 notes)
  Pending review: 3 items in queue
```

## terso doctor

Check project health and configuration.

```bash
terso doctor
```

Verifies: `.git` exists, `.terso/config.json` present, API connectivity, stale context warnings.

## terso watch

Watch for file changes and auto-capture significant changes.

```bash
terso watch
```

Monitors files matching patterns in `config.json` and sends change events to the capture pipeline.

## terso compile

Compile raw local captures into structured context (works offline).

```bash
terso compile
```

Reads from `.terso/local/captures.jsonl`, organizes into structured Markdown, and writes to `.terso/generated/`. No network required.
