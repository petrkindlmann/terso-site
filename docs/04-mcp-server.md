# MCP Server

`terso mcp` runs a [Model Context Protocol](https://modelcontextprotocol.io) server that exposes your project context to any agent client — Claude Code, Cursor, Codex, Cline. One config block, every agent reads the same project memory.

## Install

The server ships with the CLI. Print the install snippet for your client and paste it into the right config file:

### Claude Code

```bash
terso mcp install --client claude
```

Add the printed JSON to `.mcp.json` (project-level) or `~/.claude.json` (user-level):

```json
{
  "mcpServers": {
    "terso": { "command": "terso", "args": ["mcp"] }
  }
}
```

Restart Claude Code and the `terso_*` tools will appear.

### Cursor

```bash
terso mcp install --client cursor
```

Add to `~/.cursor/mcp.json` (user-level) or `.cursor/mcp.json` (project-level):

```json
{
  "mcpServers": {
    "terso": { "command": "terso", "args": ["mcp"] }
  }
}
```

### Codex CLI

```bash
terso mcp install --client codex
```

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.terso]
command = "terso"
args = ["mcp"]
```

## Tools

| Tool | Purpose | Auth |
|---|---|---|
| `terso_get_context` | Returns `AGENTS.md` plus any synced files in `.terso/generated/` | none |
| `terso_search` | Search captured knowledge in Omnus | required |
| `terso_capture` | Capture a fragment to Omnus | required |

### terso_get_context

Returns the canonical project context. Works offline. Always available.

The agent calls this once per session (or as needed) to ground itself in your project's rules and current state. Includes:

- `AGENTS.md` from the project root
- Every `.md` file in `.terso/generated/` (if you've connected to Omnus and run `terso sync`)

### terso_search

```json
{
  "query": "stripe webhook setup",
  "limit": 5
}
```

Searches your project knowledge in Omnus and returns ranked results with kind, scope, score, and date. Requires `TERSO_API_TOKEN` or a token saved via `terso auth set`.

### terso_capture

```json
{
  "text": "Switched auth to Supabase — RLS was the dealbreaker",
  "scope": "project"
}
```

Sends a knowledge fragment to Omnus for ingestion. Useful when you want the agent to record decisions it just helped you make. Returns the ingestion id.

## Standalone vs connected

| Tool | Standalone (no Omnus) | Connected |
|---|---|---|
| `terso_get_context` | Returns AGENTS.md only | + synced `.terso/generated/` files |
| `terso_search` | Returns auth error | Full search across project |
| `terso_capture` | Returns auth error | Captures to Omnus |

You can use the MCP server in standalone mode just for `terso_get_context` — agents get your AGENTS.md without any plugin or per-client integration code.

## Troubleshooting

**Tools don't show up after install.** Restart your agent client. MCP server connections are typically established on client startup.

**`terso_search` returns "No Omnus API token".** Run `terso auth set <token>` in the project directory, or set `TERSO_API_TOKEN` in your environment.

**Server keeps crashing.** Run `terso mcp` directly in a terminal and send a JSON-RPC `initialize` request — it should respond on stdout. If `terso` is not on PATH, use the full path in your client config.
