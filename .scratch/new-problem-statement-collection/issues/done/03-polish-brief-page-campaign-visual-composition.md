# Polish: Brief page campaign visual composition

Status: done

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Polish Brief Interest page campaign layout`

## What to build

Polish the `/brief` page into the campaign composition described by the PRD. The page should keep the already-working iframe submission journey while introducing the split red visual/form layout, deterministic arrow geometry, and reusable campaign visual treatment. On desktop, the visual panel and form panel should sit side by side. On mobile, the visual panel should become compact and sit above the form so the form remains easy to reach.

This slice should improve the page presentation without changing Mailchimp persistence, the submitted-page journey, or popup behavior.

## Acceptance criteria

- [ ] `/brief` preserves the iframe submission journey from the tracer bullet.
- [ ] Desktop layout uses a split composition with a red campaign visual panel and a form panel.
- [ ] Mobile layout places a compact visual panel above the form.
- [ ] The form remains reachable and usable on mobile without excessive scrolling before the first field.
- [ ] The campaign visual treatment follows the existing ATF AI Challenge design language first, then adapts the provided reference.
- [ ] Red arrow or ATF geometry is deterministic SVG or CSS, not baked into generated raster imagery.
- [ ] The arrow geometry is continuous, even-width, crisp, and responsive.
- [ ] Existing ATF logo assets are reused rather than generated.
- [ ] If a woman cutout is introduced in this slice, it has no text, logos, embedded arrows, or UI and can be reused by the popup later.
- [ ] The visual system avoids over-rounded cards, decorative blobs, and off-brand gradients.

## Manual checks before commit

1. Run the app locally.
2. Visit `/brief` on desktop and confirm the visual panel and form panel sit in a clean split layout.
3. Confirm the iframe still renders and the fields are usable after visual polish.
4. Confirm the red arrow or ATF geometry has crisp edges and does not look broken or uneven.
5. Resize to tablet and mobile widths and confirm the visual panel stacks above the form.
6. Confirm text and visual elements do not overlap at mobile, tablet, and desktop widths.
7. Trigger or simulate the submit redirect once to confirm `/brief-submitted` still works.

## Blocked by

- `.scratch/new-problem-statement-collection/issues/01-tracer-brief-interest-iframe-submission-journey.md`
