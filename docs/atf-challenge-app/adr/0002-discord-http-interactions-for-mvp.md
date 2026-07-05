# Use Discord HTTP Interactions For The MVP

Status: accepted

The MVP Discord integration will use server-installed slash-command HTTP interactions handled by a Vercel route, with Convex owning durable verification state. A persistent Discord bot process remains a fallback if future requirements need Gateway events, ongoing server monitoring, direct message workflows, or richer Discord automation.

## Considered Options

- HTTP slash-command interactions.
- Persistent Discord bot process connected to the Gateway.

## Consequences

The `/verify` command must be installed only for the official ATF Discord server and rejected outside that server. The Vercel interaction route must respond within Discord's interaction response deadline and should call Convex for atomic account-linking decisions.

