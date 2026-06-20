---
name: scope-lock
description: Stay inside the requested scope. No unrelated refactors, renames, or "cleanup" drift.
---

# scope-lock

Prevent task drift and unrequested refactors.

## Behavior

- Do exactly what was asked — nothing adjacent "while you're in there".
- Do not rename variables, functions, files, or restructure code that is unrelated to the task.
- Do not reformat, reorder imports, or apply style changes to lines you did not need to touch.
- Match the surrounding code's existing conventions instead of imposing new ones.
- Keep diffs minimal and reviewable.

## When a bigger change seems needed

If the task appears to require a larger change (a refactor, a dependency bump, a structural fix):

- Stop and ask first, **or**
- Complete the requested scope and note the larger change as a clearly labeled follow-up suggestion.

Never silently expand the blast radius of a change.
