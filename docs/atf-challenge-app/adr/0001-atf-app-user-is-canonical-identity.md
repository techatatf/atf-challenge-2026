# ATF App User Is The Canonical Identity

Status: accepted

The ATF Challenge App will treat the ATF App User as the canonical participant identity. Email and Google sign-ins are Login Identities that attach to an ATF App User after Discord verification, and the Discord Account resolves returning users back to the same ATF App User. This avoids duplicate participant records while still allowing a participant to regain access with a different email.

## Considered Options

- Use email login as the canonical identity.
- Use Discord Account as the canonical identity.
- Use ATF App User as the canonical identity.

## Consequences

The app must support Unlinked Login Identities, Discord verification, identity attach limits, and Admin Recovery Actions. Participant history, Team Memberships, and submissions attach to the ATF App User rather than to a specific email or Discord username.

