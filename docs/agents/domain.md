# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- `CONTEXT.md` at the repo root.
- `docs/adr/` for ADRs that touch the area about to be changed, if that directory exists.

This is a single-context repository. If either location does not exist, proceed silently.

## Scope boundary

`docs/atf-challenge-app/` is pure exploration for a separate, related application. Do not read its `CONTEXT.md` or ADRs as domain rules or architectural decisions for this repository unless the task explicitly concerns that exploration.

## Use the glossary's vocabulary

When output names a domain concept—in an issue title, refactor proposal, hypothesis, or test name—use the term as defined in the root `CONTEXT.md`. Do not drift to synonyms the glossary explicitly avoids.

If a needed concept is absent, reconsider whether the project already has a better term or note the gap for domain modeling.

## Flag ADR conflicts

If output contradicts an applicable root ADR, surface the conflict explicitly rather than silently overriding it.
