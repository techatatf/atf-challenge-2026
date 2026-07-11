# Tracer: Brief Interest iframe submission journey

Status: ready-for-agent

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Add Brief Interest iframe submission journey`

## What to build

Build the minimal end-to-end Brief Interest journey. A visitor can open `/brief`, see the Brief Interest page shell with a same-origin iframe wrapper around the supplied Mailchimp form, submit or simulate the Mailchimp completion response, and land on `/brief-submitted`. Manual visits to the submitted page should fail closed by redirecting back to `/brief` unless the page can verify a real recent submission.

This is the first tracer bullet. Keep the visual design simple and stable. Rich campaign visual polish, popup behavior, and final responsive hardening are later slices.

## Acceptance criteria

- [ ] `/brief` is reachable by direct URL and is not added to the regular header or footer navigation.
- [ ] `/brief` renders a page shell that matches the existing ATF AI Challenge website enough to feel coherent.
- [ ] `/brief` embeds a same-origin static iframe wrapper for the supplied Mailchimp Brief Interest form.
- [ ] The iframe wrapper exposes first name, last name, organization name, job title, country, email, phone, and sector fields.
- [ ] The iframe wrapper keeps first name, last name, organization name, job title, email, and sector required.
- [ ] The iframe wrapper keeps country and phone optional.
- [ ] The sector dropdown includes Health, Education, Agriculture, Mining & Manufacturing, Finance, Government, and Other.
- [ ] A real or simulated Mailchimp completion response navigates the top-level page to `/brief-submitted`.
- [ ] `/brief-submitted` shows a confirmation only after a verifiable recent submission.
- [ ] A fresh manual visit to `/brief-submitted` redirects back to `/brief`.
- [ ] Automated tests cover the owned route, iframe wrapper, sector values, and submitted-page gating behavior where practical.

## Manual checks before commit

1. Run the app locally.
2. Visit `/brief` on desktop and confirm the page shell and embedded form render.
3. Confirm the form shows the expected required and optional fields.
4. Trigger a real or simulated Mailchimp completion response and confirm the top-level page reaches `/brief-submitted`.
5. Open a fresh browser context or clear the submission marker, visit `/brief-submitted` directly, and confirm it redirects to `/brief`.
6. Repeat the `/brief` form render check on a narrow mobile viewport and confirm the form is reachable without layout breakage.

## Blocked by

None - can start immediately.
