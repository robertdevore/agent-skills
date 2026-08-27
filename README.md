# agent-skills

Reusable, tool-agnostic AI agent skills you can install with a single `npx` command.

Each skill is a plain `SKILL.md` file with YAML frontmatter. The CLI just copies the skills you pick into a skills directory (default `~/.agents/skills`), where your coding agent can pick them up.

## Included skills

| Skill | Purpose |
|-------|---------|
| `smalltalksucks` | Work quietly and keep the final response compact. |
| `orwell-writing` | Write clear, direct prose with plain words and useful detail. |

The skills are plain Markdown files with YAML frontmatter. They work with any coding agent that can read skill or instruction files.

## Quick start

No install needed — run it straight from npm with `npx`:

```sh
# List available skills
npx @robertdevore/agent-skills list

# Install a single skill
npx @robertdevore/agent-skills install smalltalksucks

# Install another
npx @robertdevore/agent-skills install orwell-writing

# Install everything
npx @robertdevore/agent-skills install all
```

By default skills are copied into `~/.agents/skills`.

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
npx @robertdevore/agent-skills install orwell-writing --target ./.agents/skills

# Preview an "install all" without touching the filesystem
npx @robertdevore/agent-skills install all --dry-run

# Re-install and overwrite an existing copy
npx @robertdevore/agent-skills install smalltalksucks --force
```

Without `--force`, an existing skill folder is never overwritten — the CLI prints a
`skipped ... (already exists; use --force to overwrite)` message and leaves your copy intact.

## Using skills with your agent

These skills are plain Markdown, so they work with most coding agents. A few patterns:

- **Claude / Claude Code** — point your agent at `~/.agents/skills` (or a project `.agents/skills`) and reference a skill by name, e.g. "follow the `smalltalksucks` skill". You can also copy a `SKILL.md` into your project and add it to `CLAUDE.md`.
- **Codex-style agents** — include the relevant `SKILL.md` contents in your system/instructions file, or reference the installed path so the agent reads it at session start.
- **Cursor** — drop a skill into your project (e.g. `.agents/skills/orwell-writing/SKILL.md`) and reference it from your rules, or paste its body into a project rule.

This package does not claim exclusive compatibility with any agent — the skills are just Markdown instructions. Use them wherever your agent reads context.

## Local development

```sh
node bin/agent-skills.js help
node bin/agent-skills.js list
npm test       # run the CLI test suite
npm run check  # syntax-check the CLI and list skills
```

## Publish updates to npm

After making changes, bump the version, push the release tag, and publish:

```sh
npm version patch
git push --follow-tags
npm publish --access public
```

The package is scoped. Keep `--access public` when publishing updates; `publishConfig.access` is also set to `public`.

## License

[MIT](LICENSE) © Robert DeVore
