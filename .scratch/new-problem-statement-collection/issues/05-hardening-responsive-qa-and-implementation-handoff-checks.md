# Hardening: Responsive QA and implementation handoff checks

Status: ready-for-agent

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Harden Brief Interest campaign experience`

## What to build

Do the final hardening pass for the Brief Interest campaign. Verify the full home page popup to `/brief` to `/brief-submitted` journey, tighten the native form's responsive behavior, confirm the Mailchimp success redirect, check accessibility basics, and clean up any small implementation gaps left by the previous slices.

This slice should not introduce new product scope. It should make the already-built experience reliable, visually coherent, and ready for human review.

## Acceptance criteria

- [ ] The full landing-page popup to `/brief` to `/brief-submitted` journey works end to end.
- [ ] Manual `/brief-submitted` visits still redirect to `/brief` when no recent submission is verified.
- [ ] The native form is laid out well on mobile and desktop without avoidable clipping or unusable empty space.
- [ ] `/brief` has no incoherent text or visual overlap at common mobile, tablet, and desktop widths.
- [ ] The popup has no incoherent text or visual overlap at common mobile, tablet, and desktop widths.
- [ ] Popup dismissal remains reliable after visual polish.
- [ ] The CTA copy and popup copy match the PRD.
- [ ] Basic accessibility is checked for page titles, native form labels and validation, modal semantics, focus behavior, Escape dismissal, and usable controls.
- [ ] Mailchimp's Confirmation thank-you page redirects to the resolved absolute production URL ending in `/brief-submitted`.
- [ ] The deployed form does not load Mailchimp's embedded-form JavaScript.
- [ ] Existing tests pass, and any new focused tests from earlier slices are included in the final run.
- [ ] The implementation agent records the manual verification results in their final response.

## Manual checks before commit

1. Run the app locally.
2. Run the relevant automated checks for the project.
3. Visit `/` on desktop, wait for the popup, click the CTA, and confirm `/brief`.
4. In Mailchimp, set the Confirmation thank-you page redirect to `<production-origin>/brief-submitted`, replacing `<production-origin>` with the deployed website origin; record the resolved absolute URL in the manual verification results.
5. If the audience uses double opt-in, configure the Signup thank-you page to the same resolved absolute URL.
6. Submit a real test Brief Interest and confirm Mailchimp redirects the top-level page to `/brief-submitted`.
7. Open a fresh context and confirm manual `/brief-submitted` redirects to `/brief`.
8. Repeat the popup and `/brief` checks at mobile, tablet, and desktop widths.
9. Confirm no text overlaps, no CTA label overflows, and every native form control remains usable.
10. Confirm close icon, Escape, and overlay dismissal still work.
11. Confirm the final response lists the Mailchimp URL, manual checks performed, and any residual risk.

## Blocked by

- `.scratch/new-problem-statement-collection/issues/done/01-tracer-brief-interest-iframe-submission-journey.md`
- `.scratch/new-problem-statement-collection/issues/done/02-tracer-landing-page-brief-interest-popup-entry-path.md`
- `.scratch/new-problem-statement-collection/issues/done/03-polish-brief-page-campaign-visual-composition.md`
- `.scratch/new-problem-statement-collection/issues/04-polish-popup-campaign-visual-composition.md`
