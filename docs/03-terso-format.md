# .terso/ Directory Format

The `.terso/` directory is the standard format for project context that coding agents read.

## Directory structure

```
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
```

## Hand-maintained vs generated

**Hand-maintained files** (committed to git):
- `PROJECT.md` — what this project is, who it's for
- `ARCHITECTURE.md` — current system design (state document, overwritten when truth changes)
- `DECISIONS/` — monthly decision logs (ledger, append-only)
- `DEBUG/` — monthly debug logs (ledger, append-only)

**Generated files** (`.terso/generated/` is in `.gitignore`):
- Overwritten on every `terso sync`
- Include YAML frontmatter with timestamps and source IDs
- Agents should treat these as current but disposable

## Generated file frontmatter

Every generated file starts with:

```yaml
---
generated_at: "2026-03-15T10:00:00Z"
expires_at: "2026-03-16T10:00:00Z"
source_ids: ["mem_123", "mem_456"]
generator: "terso v0.1.0"
connected: true
freshness: "current"
---
```

If `freshness` is `stale` or `expired`, agents should treat the content as potentially outdated.

## config.json

```json
{
  "projectId": "my-project",
  "omnus": {
    "endpoint": "https://api.omnus.dev",
    "connected": true
  },
  "sync": {
    "maxTokens": 30000,
    "includeSharedOps": true,
    "autoSyncOnCommit": false
  },
  "watch": {
    "enabled": false,
    "patterns": ["docs/**", "CHANGELOG.md", ".terso/*.md"]
  }
}
```

## State vs ledger documents

| If the content is... | Type | Update pattern |
|---|---|---|
| Current truth that replaces old truth | State | Overwrite the file |
| A new event that happened | Ledger | Append with timestamp |
| A temporary observation | Exhaust | Short TTL, auto-expire |
