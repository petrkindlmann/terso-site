# Standalone vs Connected Mode

Terso works in two modes. Standalone is free, offline, and gets you the AGENTS.md compiler immediately. Connected adds richer project memory backed by [Omnus](https://omnus.dev).

## Standalone mode (recommended start)

No Omnus account, no network, no auth. Free, open source.

```bash
npm install -g terso-cli
cd ~/projects/my-app
terso init
# edit AGENTS.md
terso emit
```

What works in standalone:
- `terso emit` — compile `AGENTS.md` to `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- `emit --watch` — live re-compile on save
- `emit --check` — CI gate to prevent drift
- `terso mcp` — MCP server exposes `AGENTS.md` to any agent via [MCP](./04-mcp-server.md)
- `terso compile` — combine `.terso/`-tracked source docs into a single context artifact

What's missing without Omnus:
- No captured decisions from the terminal
- No cross-project search
- No shared operational knowledge across projects
- No nightly state consolidation
- No portfolio health monitoring

## Connected mode

Add an Omnus account to unlock the capture/sync/search pipeline.

```bash
terso auth set <your-api-token>
terso capture "switched auth to Supabase — RLS was the dealbreaker"
terso sync
```

What's added:
- Capture from CLI, web, email, or webhooks
- LLM classification and dedup
- Cross-project knowledge search
- Shared ops compiled across all your projects
- Nightly state consolidation
- Review queue for uncertain items
- Portfolio health monitoring

## Switching modes

You don't have to choose. Connected mode is purely additive — `emit` keeps working regardless.

Check connection status:

```bash
terso doctor
```

Clear the API token to fall back to standalone:

```bash
terso auth clear
```
