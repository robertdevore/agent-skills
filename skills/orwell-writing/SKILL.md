---
name: orwell-writing
description: Write and edit clear, direct prose with plain words, active voice, useful detail, and no mechanical style rules.
---

# orwell-writing

Write clear, direct English. Use as few words as possible without losing meaning, accuracy, tone, or a natural human voice.

Inspired by George Orwell's essay *Politics and the English Language* and its six rules. Apply the judgment behind the rules, not a rigid checklist.

## Use this skill for

- writing or editing prose
- README files, documentation, reports, and specifications
- product copy, articles, posts, and explanations
- comments, error messages, CLI help, and UI copy
- removing AI-sounding filler, needless verbosity, and empty jargon

Do not use it to shorten source code merely because the code could be smaller.

## Writing rules

### Prefer plain English

Choose the shortest word that preserves the meaning. Prefer `use` to `utilize`, `help` to `facilitate`, `start` to `commence`, `show` to `demonstrate` when they mean the same thing, and `about` to `approximately` when precision does not require it.

Do not replace a precise technical term just because it is long. Keep terms such as API, compiler, runtime, dependency, sandbox, memory safety, authentication, and concurrency when they are needed. Explain them plainly when the audience may not know them.

### Cut what adds nothing

Remove words, phrases, sentences, and sections that do not add meaning. Scrutinize `in order to`, `due to the fact that`, `it is important to note that`, `at this point in time`, `in the event that`, `has the ability to`, `a number of`, and `generally speaking`. Replace them with shorter forms when the meaning stays intact.

### Prefer active voice

Give sentences clear subjects and actions: `The agent writes the report` is usually clearer than `The report is written by the agent`.

Keep passive voice when the actor is unknown or unimportant, the object deserves emphasis, or active voice would be awkward or misleading. Do not turn this preference into a ban.

### Avoid stale figures of speech

Do not reach for clichés or stock business and marketing phrases such as `game changer`, `move the needle`, `low-hanging fruit`, `unlock the power of`, `navigate the landscape`, `seamless journey`, or `cutting-edge solution`.

This is not a ban on metaphor. Keep original or useful figurative language when it makes an idea clearer.

### Avoid empty jargon

Do not use corporate, academic, scientific, or AI language to sound authoritative when everyday English says the same thing. Scrutinize words such as `leverage`, `synergy`, `paradigm`, `holistic`, `robust`, `transformative`, `ecosystem`, `orchestration`, `actionable`, and `frictionless`.

Keep a term when it has a necessary, precise meaning. Accuracy beats simplicity.

### Keep sentences easy to follow

Break tangled sentences when that improves understanding. Avoid stacked clauses, long parenthetical remarks, excessive qualifiers, repeated caveats, and chains of abstract nouns. Vary sentence length; clarity matters more than a fixed target.

## Editing procedure

1. **Meaning:** Identify what the text must say. Keep necessary facts, qualifications, and technical detail.
2. **Structure:** Remove repetition, combine duplicated ideas, and reorder sentences when it helps the reader.
3. **Words:** Replace needless long words and jargon with plain, precise words. Remove filler.
4. **Voice:** Prefer active constructions where they improve clarity.
5. **Clichés:** Replace stock phrases and generic AI or business language with direct statements.
6. **Compression:** Ask of every word: “Would removing it change the meaning or make the sentence worse?” If not, cut it.
7. **Naturalness:** Read the result again. Undo edits that made it stiff, choppy, vague, repetitive, or inaccurate.

## Examples

### Verbose

Before: `In order to successfully utilize the configuration system, users are required to first initialize the application.`

After: `To use the configuration system, initialize the app first.`

### Passive

Before: `The configuration file is loaded by the runtime during startup.`

After: `The runtime loads the configuration file at startup.`

### Jargon

Before: `This feature leverages an innovative orchestration layer to facilitate seamless agent workflows.`

After: `This feature coordinates agents so they can work together.`

### Necessary technical language

Bad simplification: `The program keeps things safe in memory.`

Better: `Rust's ownership system provides memory safety without a garbage collector.`

## Final rule

Break any rule sooner than write something barbarous. Use this order of priority:

1. Correctness
2. Meaning
3. Clarity
4. Natural language
5. Brevity
6. Mechanical adherence to an individual rule

Never force an edit that creates unnatural English, misleading simplification, lost precision, choppy prose, missing context, awkward repetition, or strange sentence structure.
