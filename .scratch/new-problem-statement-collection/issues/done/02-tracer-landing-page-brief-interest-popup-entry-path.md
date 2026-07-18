# Tracer: Landing-page Brief Interest popup entry path

Status: done

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Add Brief Interest homepage popup entry path`

## What to build

Build the behavior-first landing-page entry path for Brief Interest. When someone loads or reloads the home page, a popup appears after a short delay, presents the Brief Interest campaign message, and offers a single CTA to `/brief`. The popup can be dismissed with the close icon, Escape key, or overlay click, and dismissal only affects the current page instance.

Keep the visuals simple and stable in this tracer bullet. Shared campaign imagery and richer popup polish are later slices.

## Acceptance criteria

- [ ] The popup appears only on the landing page.
- [ ] The popup appears on each landing-page load or reload after about 700ms.
- [ ] Closing the popup dismisses only the current page instance and does not suppress future reloads.
- [ ] Popup visual assets, if any are used in this slice, begin loading during the delay and the popup still has a stable shell if they load slowly.
- [ ] The popup has one primary CTA and no secondary action.
- [ ] The popup CTA points to `/brief`.
- [ ] The popup title is `Shape What Comes Next in Your Sector`.
- [ ] The popup body includes `Take an early role in shaping the future of work and innovation in your sector.`
- [ ] The popup follow-up copy includes `Submit your interest and our team will guide you through the next step of the ATF AI Challenge.`
- [ ] The popup CTA copy is `Go to Interest Form`.
- [ ] The popup note includes `Be among the first organizations to participate. Limited early access.`
- [ ] The popup is dismissible through the close icon, overlay click, and Escape key.
- [ ] Automated tests cover popup timing, CTA routing, and dismissal behavior where practical.

## Manual checks before commit

1. Run the app locally.
2. Visit `/` and confirm no popup is visible immediately on first paint.
3. Wait roughly 700ms and confirm the popup appears.
4. Click the CTA and confirm the browser reaches `/brief`.
5. Reload `/`, dismiss with the close icon, and confirm the popup closes.
6. Reload `/`, dismiss with Escape, and confirm the popup closes.
7. Reload `/`, dismiss by clicking the overlay, and confirm the popup closes.
8. Reload `/` after a dismissal and confirm the popup appears again.

## Blocked by

- `.scratch/new-problem-statement-collection/issues/01-tracer-brief-interest-iframe-submission-journey.md`
