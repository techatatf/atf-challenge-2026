# Polish: Popup campaign visual composition

Status: ready-for-agent

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Polish Brief Interest popup campaign layout`

## What to build

Polish the landing-page popup so it shares the Brief Interest campaign visual language from the `/brief` page while preserving the behavior from the popup tracer bullet. The popup should feel like part of the same campaign, use the same visual direction where practical, and keep a single CTA to `/brief`.

This slice should not change the popup timing or dismissal contract except to preserve it while adding visual polish.

## Acceptance criteria

- [ ] The popup preserves the behavior from the tracer bullet: appears after about 700ms, appears on every landing-page load or reload, and dismisses by close icon, overlay click, and Escape key.
- [ ] The popup preserves the single primary CTA to `/brief`.
- [ ] The popup uses the same campaign visual language as the polished `/brief` page.
- [ ] Any shared woman asset or campaign imagery is reused consistently where practical.
- [ ] Popup visual assets begin loading during the delay.
- [ ] The popup shows a stable shell if images load slowly.
- [ ] The popup layout works on mobile and desktop without text overlap.
- [ ] The popup remains easy to dismiss on small screens.
- [ ] The popup does not add a secondary action.

## Manual checks before commit

1. Run the app locally.
2. Visit `/` on desktop and confirm the popup appears with polished campaign visuals after the expected delay.
3. Confirm the CTA routes to `/brief`.
4. Reload and dismiss with close icon, Escape, and overlay click.
5. Inspect the popup on a narrow mobile viewport and confirm text, CTA, close control, and imagery do not overlap.
6. Throttle or otherwise simulate slow image loading if practical and confirm the popup shell remains stable.
7. Reload after dismissal and confirm the popup appears again.

## Blocked by

- `.scratch/new-problem-statement-collection/issues/02-tracer-landing-page-brief-interest-popup-entry-path.md`
- `.scratch/new-problem-statement-collection/issues/03-polish-brief-page-campaign-visual-composition.md`
