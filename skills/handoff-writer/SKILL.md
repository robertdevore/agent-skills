---
name: handoff-writer
description: Write a clear end-of-session handoff so another agent can pick up the work.
---

# handoff-writer

Produce a reusable handoff that lets another agent (or your future self) resume cleanly.

## Behavior

Write a concise handoff with these sections:

- **Done** — what was actually accomplished this session.
- **Changed** — files added, modified, or deleted, with brief notes on why.
- **Commands run** — key commands used (build, install, migrate, etc.).
- **Tests / results** — what was tested and the outcome (pass/fail, coverage gaps).
- **Unresolved** — known bugs, half-finished work, open questions.
- **Next steps** — the concrete next actions, in priority order.

## Guidelines

- Be specific: name files, commands, and error messages rather than gesturing at them.
- Assume the reader has zero memory of this session.
- Do not assume any particular note-taking tool, wiki, or tracker — output plain text the user can paste anywhere.
- Keep it scannable: short bullets over long prose.
