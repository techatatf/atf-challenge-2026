# Tracer: Brief Interest native submission journey

Status: done

## Parent

- `.scratch/new-problem-statement-collection/PRD.md`

## Implementation skill

Use the `$implement` skill for implementation. This issue has a manual commit checkpoint: before any commit is made, complete the manual checks below and report the suggested commit message for the human to use if they are happy with the changes.

Suggested commit message: `Replace Brief Interest iframe with native form`

## What to build

Build the minimal end-to-end Brief Interest journey. A visitor can open `/brief`, see the Brief Interest page shell with a native form that posts directly to Mailchimp, and land on `/brief-submitted` through Mailchimp's configured success redirect. Manual visits to the submitted page should fail closed by redirecting back to `/brief` unless the page can verify a recent submission attempt.

This is the first tracer bullet. Keep the visual design simple and stable. Rich campaign visual polish, popup behavior, and final responsive hardening are later slices.

## Acceptance criteria

- [ ] `/brief` is reachable by direct URL and is not added to the regular header or footer navigation.
- [ ] `/brief` renders a page shell that matches the existing ATF AI Challenge website enough to feel coherent.
- [ ] `/brief` renders a native, custom-styled Brief Interest form that posts directly to Mailchimp.
- [ ] The native form exposes first name, last name, organization name, job title, country, email, phone, and sector fields.
- [ ] The native form keeps first name, last name, organization name, job title, email, and sector required.
- [ ] The native form keeps country and phone optional.
- [ ] The sector dropdown includes Health, Education, Agriculture, Mining & Manufacturing, Finance, Government, and Other.
- [ ] The form posts through the top-level page and Mailchimp redirects successful submissions to `/brief-submitted`.
- [ ] `/brief-submitted` shows a confirmation only after a verifiable recent submission.
- [ ] A fresh manual visit to `/brief-submitted` redirects back to `/brief`.
- [ ] Automated tests cover the owned route, native form, sector values, submission marker, and submitted-page gating behavior where practical.

## Manual checks before commit

1. Run the app locally.
2. Visit `/brief` on desktop and confirm the page shell and native form render.
3. Confirm the form shows the expected required and optional fields.
4. Submit a test Brief Interest and confirm Mailchimp redirects the top-level page to `/brief-submitted`.
5. Open a fresh browser context or clear the submission marker, visit `/brief-submitted` directly, and confirm it redirects to `/brief`.
6. Repeat the `/brief` form render check on a narrow mobile viewport and confirm the form is reachable without layout breakage.

## Blocked by

None - can start immediately.
