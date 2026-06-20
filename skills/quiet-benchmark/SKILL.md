---
name: quiet-benchmark
description: Compare a normal agent run against a quiet run on the same task, with a compact summary.
---

# quiet-benchmark

Help measure the effect of "quiet" instructions (like `smalltalksucks` / `compact-final`) by running the same task two ways and comparing.

## Behavior

- Keep the task inputs **identical** between runs. The only difference is the quiet instruction (present vs absent).
- Run two variants:
  - **baseline** — normal prompting.
  - **quiet** — same task plus the quiet instruction.
- For each run, capture:
  - Model / model id.
  - Prompt variant (baseline | quiet).
  - Start time and end time (or duration).
  - Files changed.
  - Tests run and status.
  - Final status (success | partial | failed).
  - Token / usage info if the runtime exposes it.

## Output

Print or save a compact side-by-side comparison. Example:

| metric         | baseline       | quiet          |
|----------------|----------------|----------------|
| model          | claude-opus-4  | claude-opus-4  |
| duration       | 4m 12s         | 2m 55s         |
| files changed  | 3              | 3              |
| tests          | pass           | pass           |
| output tokens  | 5,800          | 1,900          |
| status         | success        | success        |

Keep it to the comparison plus a one-line takeaway. Do not narrate each run.
