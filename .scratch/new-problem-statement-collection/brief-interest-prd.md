# Brief Interest Intake PRD

Status: ready-for-agent

## Problem Statement

ATF needs a low-friction way for companies, public agencies, sponsors, and other Interested Organizations to signal interest in contributing sector-specific briefs for the ATF AI Challenge. Those inputs will later be shaped by ATF into participant-ready Problem Statements.

The current public website has pages for participant application, subscription, partnership information, contact support, and general program content, but it does not have a dedicated campaign surface for collecting Brief Interest from organizations. The landing page also does not yet direct organizations toward this new intake path.

The intake must feel like part of the existing ATF AI Challenge website, while drawing visual direction from the provided form and popup references. The MVP form implementation should explicitly use a local static iframe wrapper around the supplied Mailchimp Brief Interest embed, consistent with the existing public form pattern. The page shell should still leave room for a future native or custom-styled form refactor that preserves the same user journey and submitted data.

## Solution

Create a `/brief` page that collects a Brief Interest from a Brief Contact at an Interested Organization. The page should use the existing site design language first, then adapt the split red visual/form composition from the provided reference.

The form itself should be a replaceable iframe-backed component, separate from the page shell. For the MVP, the component should render a same-origin static wrapper around the Mailchimp form. A future refactor may replace the iframe with a native or custom-styled form without redesigning the campaign page, popup, or submitted-page flow.

Create a landing-page popup that appears whenever someone loads or reloads the home page. The popup should introduce the Brief Interest campaign and point users to `/brief`.

Create a `/brief-submitted` completion page. The page should remain visible when reached after a successful submission, but redirect manual visits back to `/brief`.

## User Stories

1. As an Interested Organization, I want a dedicated Brief Interest page, so that I can quickly tell ATF I may want to contribute a brief.
2. As a Brief Contact, I want the form to ask only for essential contact and sector information, so that I can submit interest without preparing a full Problem Statement.
3. As a Brief Contact, I want to enter my first name, so that ATF knows who to follow up with.
4. As a Brief Contact, I want to enter my last name, so that ATF can identify me consistently in Mailchimp.
5. As a Brief Contact, I want to enter my job title, so that ATF understands my role in the Interested Organization.
6. As a Brief Contact, I want to enter my organization name, so that ATF knows which Interested Organization is represented.
7. As a Brief Contact, I want to optionally enter my country, so that ATF can understand my organization context when I choose to provide it.
8. As a Brief Contact, I want to enter my email address, so that ATF can follow up.
9. As a Brief Contact, I want email validation, so that I do not accidentally submit an unusable address.
10. As a Brief Contact, I want to optionally enter my phone number, so that ATF has another way to contact me if I choose to provide it.
11. As a Brief Contact, I want to select a Sector, so that ATF understands the broad domain my organization is interested in.
12. As a Brief Contact in Health, I want Health to be a selectable Sector, so that my interest is categorized correctly.
13. As a Brief Contact in Education, I want Education to be a selectable Sector, so that my interest is categorized correctly.
14. As a Brief Contact in Agriculture, I want Agriculture to be a selectable Sector, so that my interest is categorized correctly.
15. As a Brief Contact in Mining & Manufacturing, I want Mining & Manufacturing to be a selectable Sector, so that my interest is categorized correctly.
16. As a Brief Contact in Finance, I want Finance to be a selectable Sector, so that my interest is categorized correctly.
17. As a Brief Contact in Government, I want Government to be a selectable Sector, so that my interest is categorized correctly.
18. As a Brief Contact outside the listed sectors, I want Other to be a selectable Sector, so that I can still submit interest.
19. As a Brief Contact, I want the form to prevent submission when required fields are missing, so that I know what ATF needs before I submit.
20. As a Brief Contact, I want the page to work well on mobile, so that I can submit interest from my phone.
21. As a Brief Contact, I want the page to work well on desktop, so that I can complete the form comfortably from work.
22. As a Brief Contact, I want the visual treatment to feel official and consistent with ATF, so that I trust the page.
23. As a Brief Contact, I want the embedded form to feel stable within the page, so that I am not surprised by a remote provider page opening in the middle of the flow.
24. As a Brief Contact, I want to see a submitted confirmation page after successful submission, so that I know ATF received my interest.
25. As a Brief Contact, I want manual visits to the submitted page to redirect back to the form, so that I do not land on a misleading success page.
26. As a landing-page visitor, I want to see a popup introducing the Brief Interest opportunity, so that I know organizations can help shape challenge material.
27. As a landing-page visitor, I want the popup to appear when I load or reload the home page, so that the campaign is visible on each visit.
28. As a landing-page visitor, I want the popup to wait briefly before opening, so that the page can render before the campaign message appears.
29. As a landing-page visitor, I want the popup images to preload during the delay, so that the popup appears cleanly when opened.
30. As a landing-page visitor, I want a clear CTA in the popup, so that I can go directly to the Brief Interest page.
31. As a landing-page visitor, I want to dismiss the popup with the close icon, so that I can continue browsing.
32. As a landing-page visitor, I want to dismiss the popup by pressing Escape, so that the interaction follows standard modal behavior.
33. As a landing-page visitor, I want to dismiss the popup by clicking outside it, so that I am not trapped by the campaign prompt.
34. As an ATF operator, I want the Brief Interest form to use Mailchimp for the MVP, so that the campaign can collect responses through the existing provider workflow.
35. As an ATF operator, I want the Mailchimp embed hosted through a local static iframe wrapper, so that the site controls the frame boundary, completion redirect, and future replacement point.
36. As an ATF operator, I want the page shell to stay stable if the iframe is later replaced by a native or custom-styled form, so that design work does not need to be repeated.
37. As an ATF operator, I want the intake to avoid collecting full problem descriptions for now, so that ATF can guide Interested Organizations before shaping Problem Statements.
38. As an ATF operator, I want the Brief Interest language to stay separate from Problem Statement language, so that internal and public terminology remains clear.
39. As an ATF operator, I want the Interested Organization language to avoid implying a formal partnership or sponsorship, so that the intake does not overpromise relationship status.
40. As an ATF operator, I want reusable visual assets for the `/brief` page and popup, so that the campaign feels coherent.
41. As an ATF operator, I want the woman asset generated as a production-ready cutout, so that it can be reused across desktop, mobile, and popup compositions.
42. As an ATF operator, I want the red arrow geometry implemented deterministically, so that it is continuous, even-width, sharp, and responsive.
43. As a mobile visitor, I want the campaign image to use a compact upper-body crop, so that the form remains easy to reach.
44. As a desktop visitor, I want the campaign image and form to sit in a split layout, so that the page matches the campaign reference while remaining usable.
45. As a future implementation agent, I want the iframe/Mailchimp decision documented, so that I do not build native persistence into the MVP.
46. As a future implementation agent, I want the future form-refactor boundary documented, so that later visual improvements preserve the same functionality.
47. As a future implementation agent, I want the popup behavior documented precisely, so that repeated home-page loads behave as intended.
48. As a future implementation agent, I want the submitted-page gating plan documented, so that success-state behavior can be implemented consistently with the iframe form path.

## Implementation Decisions

- The canonical intake artifact is **Brief Interest**.
- The canonical organization term is **Interested Organization**.
- The person submitting the form is the **Brief Contact**.
- **Problem Statement** remains reserved for the participant-ready challenge material ATF creates later.
- **Sector** remains the high-level domain category used for challenge-related categorization.
- `/brief` is an interest intake page only, not a full brief submission page.
- `/brief` should collect only the fields exposed by the supplied Mailchimp Brief Interest embed:
  - First name
  - Last name
  - Job title
  - Organization name
  - Country (optional)
  - Email address
  - Phone number (optional)
  - Sector
- First name, last name, job title, organization name, email address, and sector are required.
- Country and phone number are optional for the iframe MVP.
- Email address validation is handled by the embedded Mailchimp form.
- The Sector dropdown must include:
  - Health
  - Education
  - Agriculture
  - Mining & Manufacturing
  - Finance
  - Government
  - Other
- Country is a free-text Mailchimp field for the iframe MVP.
- A controlled country dropdown is reserved for a future native or custom-styled form refactor.
- Mailchimp is the persistence provider for the MVP.
- The MVP should not introduce a Vercel-hosted database or custom server-side persistence for Brief Interest submissions.
- The supplied Mailchimp Brief Interest embed is the source form for MVP implementation.
- The Mailchimp embed should be hosted through a same-origin static iframe wrapper, consistent with the existing public form pattern.
- The `/brief` page shell must be separate from the Brief Interest Form component.
- The Brief Interest Form component should own the iframe surface, iframe sizing, loading state, and completion behavior.
- The page shell should own the campaign layout, visual treatment, and page-level copy.
- The form component should be replaceable with a native or custom-styled implementation later without rewriting the page shell.
- The future form refactor should preserve the same required fields, optional fields, Mailchimp-equivalent submitted data, and submitted-page journey unless ATF makes a separate product decision.
- The page should be mobile-first and responsive.
- On desktop, the page should use a split layout with a red visual panel and a form panel.
- On mobile, the red visual panel should appear above the form in a compact format.
- On mobile, the woman visual should use a tighter upper-body crop.
- The design should follow the existing ATF AI Challenge website design language first, then adapt the provided form reference.
- The visual system should avoid over-rounded cards, decorative blobs, and off-brand gradients.
- The production woman image should be generated fresh as a reusable full-body professional African woman cutout.
- The generated concept image is visual direction only, not a production asset.
- The woman asset should not include text, logos, embedded arrows, or UI.
- The woman cutout should be reusable on the `/brief` page and in the landing-page popup.
- The red arrow/ATF geometry should be implemented as deterministic SVG/CSS, not as part of the generated raster image.
- The red arrow must be one continuous shape with uniform width and crisp edges.
- Existing ATF logo assets should be reused rather than generated.
- The popup should appear only on the landing page.
- The popup should appear on each landing-page load or reload.
- Closing the popup should dismiss only the current page instance; it should not suppress future reloads.
- The popup should open after a short delay of about 700ms.
- Popup visual assets should begin loading during the delay.
- The popup should still show a stable shell if images load slowly.
- The popup should be dismissible through the close icon, overlay click, and Escape key.
- The popup should have a single primary CTA and no secondary action.
- The popup CTA should point to `/brief`.
- Popup title copy should be: `Shape What Comes Next in Your Sector`.
- Popup body copy should include: `Take an early role in shaping the future of work and innovation in your sector.`
- Popup follow-up copy should include: `Submit your interest and our team will guide you through the next step of the ATF AI Challenge.`
- Popup CTA copy should be: `Go to Interest Form`.
- Popup note copy should include: `Be among the first organizations to participate. Limited early access.`
- `/brief` should not be added to the regular header or footer navigation for MVP.
- `/brief` should be reachable from the landing-page popup and by direct URL.
- `/partner` remains the general partnership page.
- `/brief-submitted` should be created as the submitted confirmation page.
- Manual visits to `/brief-submitted` should redirect to `/brief`.
- The static iframe wrapper should use the Mailchimp response iframe signal to detect a completed submit response.
- After Mailchimp returns a submit response, the wrapper should navigate the top-level page to `/brief-submitted`, not only the nested iframe.
- The submitted-page gate should use a short-lived same-origin browser submission flag where possible; a `submitted=1` query parameter may be used as a routing hint but should not be the only durable proof of a successful submission.
- If the submitted page cannot verify a real submission, it should redirect to `/brief`.
- Progressive degradation is acceptable for campaign enhancements.
- If client storage is unavailable, `/brief-submitted` should fail closed by redirecting to `/brief`.

## Testing Decisions

- Tests should focus on external behavior rather than implementation details.
- The highest-value test seam is the public user journey:
  - home page load shows the popup after the expected delay
  - popup CTA routes to `/brief`
  - `/brief` renders the campaign shell and same-origin Brief Interest iframe
  - the iframe wrapper contains the expected Mailchimp Brief Interest fields and selectable sector values
  - a simulated Mailchimp completion signal routes the top-level page to `/brief-submitted`
  - manual `/brief-submitted` visits redirect to `/brief`
- Test the page shell and redirect/gating behavior rather than Mailchimp internals.
- Test the iframe wrapper only for owned behavior:
  - it points at the intended Mailchimp audience/form action
  - it exposes first name, last name, organization name, job title, country, email, phone, and sector fields
  - it marks first name, last name, organization name, job title, email, and sector as required
  - it keeps country and phone optional
  - it redirects the top-level page after a real or simulated Mailchimp response
- Test the sector list as user-visible behavior.
- Test responsive rendering with visual/regression coverage if browser tests are added.
- Existing prior art includes utility-level tests for application CTA behavior and hero geometry. This feature likely needs a higher-level browser-oriented seam for popup, routing, and form interaction.
- If browser test infrastructure is not introduced, cover deterministic utilities such as submitted-page gating helpers with unit tests, then manually verify layout, iframe rendering, popup behavior, and the Mailchimp submission redirect.
- Visual implementation should be checked on mobile and desktop viewports to ensure text does not overlap, the popup is dismissible, and the red arrow geometry remains continuous.

## Out of Scope

- Building a full Problem Statement authoring workflow.
- Asking Interested Organizations to write problem descriptions in the MVP form.
- Admin review tooling for Brief Interest records.
- Converting Brief Interests into Problem Statements.
- Native database persistence for Brief Interest records.
- Replacing Mailchimp as the MVP form provider.
- Rebuilding the Mailchimp form as a native or custom-styled form in the MVP.
- Adding a controlled country dropdown in the MVP.
- Analytics/event tracking for the popup or form.
- Adding `/brief` to global site navigation.
- Replacing `/partner`.
- Participant-facing Challenge Topic preference collection.
- Authenticated ATF Challenge App workflows.
- Final generated production assets, until implementation begins.

## Further Notes

- The iframe/native form choice is resolved for the MVP: use the supplied Mailchimp embed through a local static iframe wrapper.
- The current Mailchimp embed uses separate first-name and last-name fields, an optional free-text country field, optional phone number, required email, required job title, required organization name, and a required sector dropdown.
- A future native or custom-styled form may improve the visual polish, country selection, validation behavior, and integration shape, but it should preserve the same functional journey unless ATF approves a separate scope change.
- Additional privacy or consent copy for Mailchimp data collection should be handled as content/legal review if ATF wants language beyond the provider form's existing behavior.
- The production image asset should be generated separately from the concept mockup. The concept mockup remains useful for visual direction.
- The visual arrow should be deterministic code, not generated imagery, because the concept arrow has uneven width and discontinuities.
- The popup and `/brief` page should share the same woman asset and red arrow visual language.
