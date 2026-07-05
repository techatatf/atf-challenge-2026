# Open Questions

These questions are intentionally unresolved. Pick one branch at a time in future refinement sessions.

## Team Formation

1. If a Team is formed through Sector-level fallback, how does it get its final Assigned Challenge Topic?
2. Should Sector-level fallback be enabled by default, disabled by default, or decided per Matchmaking Run?
3. What are the default minimum and maximum Team sizes around the current target of four?
4. What cutoff date or milestone should prevent normal team changes?
5. What team-change powers should mentors have compared with Admins?

## Challenge Topic Catalog

1. What are the initial Sectors?
2. What are the initial Challenge Topics under each Sector?
3. Should Challenge Topics have capacity targets or caps?
4. Should admins be able to merge Challenge Topics, or only archive and create new ones?
5. What notification should Participants receive after a Topic Update affects them?

## Participant Profile

1. What exact countries are allowed at launch?
2. Should country be self-reported, inferred, or verified?
3. Are school, graduation year, experience level, and availability required profile fields?
4. Should Participants be able to edit profile details after submitting preferences?
5. What role taxonomy changes are needed after product-owner review?

## Identity And Verification

1. Which auth provider should implement email and Google sign-in?
2. What support evidence is required before Discord Account Recovery?
3. Should Admin Recovery Actions notify all previous Login Identities?
4. What is the exact `Verified Participant` Discord role name?
5. What should happen when Discord role assignment succeeds in the app but fails in Discord?

## Admin Dashboard

1. What surfaces are required in the first admin MVP?
2. What actions require confirmation text versus a simple confirmation dialog?
3. Should admin audit logs be exportable?
4. Should admins receive notifications in Discord, email, or only inside the dashboard?
5. What metrics define Matchmaking Run quality?

## Architecture

1. What auth provider best fits Next.js, Vercel, and Convex for this app?
2. Does Convex own all backend state, or will any data live outside Convex?
3. What PostHog project and event naming conventions should be used?
4. What rate limits should protect Verification Challenge generation and `/verify` attempts?
5. What conditions would force a persistent Discord bot process instead of HTTP interactions?

