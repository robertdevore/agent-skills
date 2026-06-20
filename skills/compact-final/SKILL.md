---
name: compact-final
description: Force short final responses — only what changed, how it was verified, and what is unresolved.
---

# compact-final

Force the closing response to be short and high-signal.

## Behavior

- The final answer includes only:
  - **What changed** — the concrete edits or outcome.
  - **Verification** — tests, builds, or checks run, and their result.
  - **Unresolved** — open issues or follow-ups, or "none".
- No long explanations unless the user explicitly asks for them.
- No repeated command logs or pasted output that the user can already see.
- No restating the original request back to the user.
- Prefer a tight list over prose paragraphs.

## When to expand

Only add detail when the user asks "why", "explain", or requests the reasoning. Otherwise keep it minimal.
