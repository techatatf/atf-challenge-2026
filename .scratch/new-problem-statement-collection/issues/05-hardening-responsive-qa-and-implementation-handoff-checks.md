# Hardening: Responsive QA and implementation handoff checks

Status: ready-for-agent

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Harden Brief Interest campaign experience`

## What to build

Do the final hardening pass for the Brief Interest campaign. Verify the full home page popup to `/brief` to `/brief-submitted` journey, tighten responsive behavior, confirm iframe sizing, check accessibility basics, and clean up any small implementation gaps left by the previous slices.

This slice should not introduce new product scope. It should make the already-built experience reliable, visually coherent, and ready for human review.

## Acceptance criteria

- [ ] The full landing-page popup to `/brief` to `/brief-submitted` journey works end to end.
- [ ] Manual `/brief-submitted` visits still redirect to `/brief` when no recent submission is verified.
- [ ] The iframe is sized well enough for the Mailchimp form on mobile and desktop without avoidable clipping or unusable empty space.
- [ ] `/brief` has no incoherent text or visual overlap at common mobile, tablet, and desktop widths.
- [ ] The popup has no incoherent text or visual overlap at common mobile, tablet, and desktop widths.
- [ ] Popup dismissal remains reliable after visual polish.
- [ ] The CTA copy and popup copy match the PRD.
- [ ] Basic accessibility is checked for page titles, iframe title, modal semantics, focus behavior, Escape dismissal, and usable controls.
- [ ] Existing tests pass, and any new focused tests from earlier slices are included in the final run.
- [ ] The implementation agent records the manual verification results in their final response.

## Manual checks before commit

1. Run the app locally.
2. Run the relevant automated checks for the project.
3. Visit `/` on desktop, wait for the popup, click the CTA, and confirm `/brief`.
4. Complete or simulate the Brief Interest submission and confirm `/brief-submitted`.
5. Open a fresh context and confirm manual `/brief-submitted` redirects to `/brief`.
6. Repeat the popup and `/brief` checks at mobile, tablet, and desktop widths.
7. Confirm no text overlaps, no CTA label overflows, and the iframe remains usable.
8. Confirm close icon, Escape, and overlay dismissal still work.
9. Confirm the final response lists the manual checks performed and any residual risk.

## Blocked by

- `.scratch/new-problem-statement-collection/issues/01-tracer-brief-interest-iframe-submission-journey.md`
- `.scratch/new-problem-statement-collection/issues/02-tracer-landing-page-brief-interest-popup-entry-path.md`
- `.scratch/new-problem-statement-collection/issues/03-polish-brief-page-campaign-visual-composition.md`
- `.scratch/new-problem-statement-collection/issues/04-polish-popup-campaign-visual-composition.md`
