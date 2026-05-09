# Getting Started

Terso is a CLI that keeps your AI coding agents on the same page as you. The fastest path is offline: write project rules in `AGENTS.md` and let `terso emit` compile them into the config files each agent expects.

## Install

```bash
npm install -g terso-cli
```

Or use without installing:

```bash
npx terso-cli emit
```

## Quick start

### 1. Initialize in your project

```bash
cd ~/projects/my-app
terso init
```

This creates a `.terso/` directory and scaffolds an `AGENTS.md` at the project root if you don't already have one.

### 2. Edit AGENTS.md

Write your project rules once — conventions, commands, "don'ts". This is the single source of truth.

### 3. Compile to per-agent config files

```bash
terso emit
```

Output:

```
  create   CLAUDE.md
  create   .cursorrules
  create   .github/copilot-instructions.md

Emitted 3 file(s) from AGENTS.md (0 unchanged).
```

Each emitted file starts with a marker comment so re-running `emit` is safe and won't clobber files you maintain by hand.

### 4. Your AI agents read it

Cursor reads `.cursorrules`. Claude Code reads `CLAUDE.md`. Copilot reads `.github/copilot-instructions.md`. They all get the same instructions, compiled from one source.

## Going further

Want richer project memory — captured decisions, cross-project search, shared ops? Connect to [Omnus](https://omnus.dev) and use `terso sync` / `capture` / `search`. See [Standalone vs Connected](./05-standalone-vs-connected.md).
