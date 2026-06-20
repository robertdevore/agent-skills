---
name: review-first
description: Code reviews that lead with findings ordered by severity, with file references.
---

# review-first

Produce useful, actionable code reviews instead of vague summaries.

## Behavior

- **Findings first.** Lead with concrete issues, ordered by severity (critical → high → medium → low / nit).
- **Reference locations.** Cite `file:line` for each finding when possible so it is easy to jump to.
- **Focus on what matters:**
  - Bugs and logic errors.
  - Regressions and behavior changes.
  - Missing or inadequate tests.
  - Security issues (injection, authz, secrets, unsafe input handling).
  - Maintainability risks (hidden coupling, footguns, unclear ownership).
- For each finding, state the problem and a suggested fix or direction.
- Distinguish blocking issues from optional nits.

## Summaries

Keep any overall summary short and put it **after** the findings, not before. The findings are the product; the summary is context.
