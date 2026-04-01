# Standalone vs Connected Mode

Terso works in two modes: standalone (offline, no account) and connected (synced with Omnus).

## Standalone mode

No Omnus account needed. Free, open-source, works offline.

```bash
terso init
terso capture "switched auth to Supabase"
terso compile
```

What works:
- Local capture to `.terso/local/captures.jsonl`
- Offline compilation into structured Markdown
- Secret scanning (regex-based, runs locally)
- File output to `.terso/generated/`

What's missing:
- No LLM-powered classification
- No cross-project search
- No portfolio monitoring
- No state consolidation
- No review queue

## Connected mode

Link to an Omnus account for the full pipeline.

```bash
terso login
terso sync
```

What's added:
- LLM classification (Gemini Flash for extraction, Claude Sonnet for synthesis)
- Cross-project knowledge search
- Shared operational knowledge (deploy recipes, code standards)
- Nightly state consolidation
- Review queue for uncertain items
- Portfolio health monitoring

## Configuration

Check your connection status:

```bash
terso doctor
```

Switch modes by editing `.terso/config.json`:

```json
{
  "omnus": {
    "endpoint": "https://api.omnus.dev",
    "connected": false
  }
}
```

Set `connected: false` to force standalone mode even with an account.
