---
status: accepted
---

# Submit Brief Interest through Mailchimp JSONP

ATF will submit the native Brief Interest form directly from the browser to the supplied Mailchimp `/subscribe/post-json` endpoint using JSONP. This keeps Mailchimp as the persistence provider without adding an ATF server endpoint or API key, while allowing ATF to own the success, rejection, network-failure, and timeout experience instead of navigating users to Mailchimp-hosted pages.

## Considered options

- A normal top-level form POST was rejected because Mailchimp owns the resulting browser experience.
- An ATF server endpoint using the Mailchimp Marketing API was rejected because the project does not want server-side credentials or additional deployment configuration.
- Mailchimp JSONP was accepted because Mailchimp's generated validation script uses the same endpoint and structured `result` and `msg` response contract.

## Consequences

- Only `result: "success"` may produce a Brief Interest Confirmation. Errors and unknown responses remain on the form with its values preserved.
- HTTP status is not an acceptance signal; the JSONP payload is authoritative for this user experience.
- The integration must use a unique callback per attempt, enforce a timeout, prevent concurrent submissions, clean up callback and script state, validate the response shape, and render only ATF-owned safe text.
- Contact fields travel in a GET query string, and the response executes as third-party JavaScript in the page.
- The endpoint is generated and used by Mailchimp but is not documented as a public API contract. ATF accepts that compatibility risk and requires a generic failure fallback plus automated contract coverage.
