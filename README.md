# agent-skills

Reusable, tool-agnostic AI agent skills you can install with a single `npx` command.

Each skill is a plain `SKILL.md` file with YAML frontmatter. The CLI just copies the skills you pick into a skills directory (default `~/.agents/skills`), where your coding agent can pick them up.

## Why reusable agent skills?

Most useful agent behaviors — "stop narrating", "don't drift outside scope", "review code by severity" — are the same across every project. Instead of pasting the same instructions into every session, you install them once as named skills and reference them anywhere. They are:

- **Portable** — plain Markdown, no lock-in to a single agent or vendor.
- **Composable** — install one, a few, or all of them.
- **Versionable** — keep them in a repo, update them in one place.

## Quick start

No install needed — run it straight from npm with `npx`:

```sh
# List available skills
npx @robertdevore/agent-skills list

# Install a single skill
npx @robertdevore/agent-skills install smalltalksucks

# Install another
npx @robertdevore/agent-skills install compact-final

# Install everything
npx @robertdevore/agent-skills install all
```

By default skills are copied into `~/.agents/skills`.

## Available skills

| Skill | Purpose |
|-------|---------|
| `smalltalksucks` | Work quietly; stop narrating every step; keep the final response compact. |
| `compact-final` | Force short final responses — what changed, verification, unresolved. |
| `scope-lock` | Stay inside the requested scope; no unrelated refactors or drift. |
| `review-first` | Code reviews that lead with findings ordered by severity, with file refs. |
| `handoff-writer` | Write an end-of-session handoff another agent can pick up. |
| `quiet-benchmark` | Compare a normal vs. quiet agent run on the same task. |
| `orwell-writing` | Write and edit clear, direct prose with plain words and useful detail. |

Run `agent-skills list` for the live list and one-line descriptions.

## Commands

```
agent-skills list                 List available skills with descriptions
agent-skills install <skill>      Install one skill
agent-skills install all          Install all bundled skills
agent-skills help                 Show usage and examples
```

## Options

| Option | Description |
|--------|-------------|
| `--target <path>` | Install into `<path>` instead of `~/.agents/skills`. |
| `--force` | Overwrite an existing installed skill folder. |
| `--dry-run` | Show what would be installed without writing anything. |

### Examples

```sh
# Install into a project-local skills directory
npx @robertdevore/agent-skills install scope-lock --target ./.agents/skills

# Preview an "install all" without touching the filesystem
npx @robertdevore/agent-skills install all --dry-run

# Re-install and overwrite an existing copy
npx @robertdevore/agent-skills install review-first --force
```

Without `--force`, an existing skill folder is never overwritten — the CLI prints a
`skipped ... (already exists; use --force to overwrite)` message and leaves your copy intact.

## Using skills with your agent

These skills are plain Markdown, so they work with most coding agents. A few patterns:

- **Claude / Claude Code** — point your agent at `~/.agents/skills` (or a project `.agents/skills`) and reference a skill by name, e.g. "follow the `smalltalksucks` skill". You can also copy a `SKILL.md` into your project and add it to `CLAUDE.md`.
- **Codex-style agents** — include the relevant `SKILL.md` contents in your system/instructions file, or reference the installed path so the agent reads it at session start.
- **Cursor** — drop a skill into your project (e.g. `.agents/skills/scope-lock/SKILL.md`) and reference it from your rules, or paste its body into a project rule.

This package does not claim exclusive compatibility with any agent — the skills are just Markdown instructions. Use them wherever your agent reads context.

## Local development

```sh
node bin/agent-skills.js help
node bin/agent-skills.js list
npm test       # run the CLI test suite
npm run check  # syntax-check the CLI and list skills
```

## Publishing later

This repo is publish-ready but is **not** published. When you want to publish:

```sh
npm login
npm publish --access public
```

Because the package name is **scoped** (`@robertdevore/...`), npm treats it as private by
default. The first public publish needs `--access public` (this repo also sets
`publishConfig.access` to `public` so subsequent publishes stay public).

## License

[MIT](LICENSE) © Robert DeVore
