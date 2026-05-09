# .terso/ Directory Format

The `.terso/` directory is for the connected-mode flow — context pulled from Omnus into your project. (For the offline AGENTS.md → per-agent config flow, see [AGENTS.md Compiler](./03-agents-md-compiler.md).)

## Directory structure

```
project-root/
  AGENTS.md                # canonical agent instructions (offline flow)
  .terso/
    project.json           # project config (Omnus connection)
    .gitignore             # excludes generated/ from git
    PROJECT.md             # hand-maintained: what this project is
    ARCHITECTURE.md        # hand-maintained: current system design
    STATUS.md              # hand-maintained: current state, roadmap
    DECISIONS/
      2026-05.md           # hand-maintained: monthly decision log
    generated/             # machine-generated, overwritten on sync
      CURRENT_CONTEXT.md
      ...                  # additional files from Omnus
```

## Hand-maintained vs generated

**Hand-maintained files** (committed to git):
- `AGENTS.md` (project root) — single source for the emit flow
- `.terso/PROJECT.md` — what this project is, who it's for
- `.terso/ARCHITECTURE.md` — current system design
- `.terso/STATUS.md` — current state, roadmap
- `.terso/DECISIONS/` — monthly decision logs (append-only ledger)

**Generated files** (`.terso/generated/` is in `.gitignore`):
- Overwritten on every `terso sync`
- Include YAML frontmatter with timestamps and source IDs
- Agents should treat these as current but disposable

## Generated file frontmatter

Every generated file starts with:

```yaml
---
generated_at: "2026-05-09T10:00:00Z"
expires_at: "2026-05-10T10:00:00Z"
source_ids: ["mem_123", "mem_456"]
generator: "terso-cli v0.2.0"
freshness: "current"
---
```

## project.json

```json
{
  "projectId": "my-project",
  "apiUrl": "https://omnus.dev",
  "detectedFrom": "package.json",
  "verified": true,
  "createdAt": "2026-05-09T10:00:00Z"
}
```

## State vs ledger documents

| If the content is... | Type | Update pattern |
|---|---|---|
| Current truth that replaces old truth | State | Overwrite the file |
| A new event that happened | Ledger | Append with timestamp |
| A temporary observation | Exhaust | Short TTL, auto-expire |
