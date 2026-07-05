# Diagrams

This file collects the key diagrams for visual review. The same diagrams may also appear inline in the focused docs.

## Domain Model

```mermaid
flowchart TD
  LI[Login Identity] --> AU[ATF App User]
  DA[Discord Account] --> AU
  AU --> P[Participant]
  P --> PP[Participant Profile]
  PP --> PR[Participant Roles]
  PP --> TP[Topic Preferences]
  TP --> CT[Challenge Topic]
  CT --> S[Sector]
  P --> TM[Team Membership]
  TM --> T[Team]
  T --> ACT[Assigned Challenge Topic]
  MR[Matchmaking Run] --> T
  TSP[Team Size Policy] --> MR
  A[Admin] --> MR
  A --> AR[Admin Recovery Action]
```

## Participant Lifecycle

```mermaid
flowchart TD
  A[Arrive from Discord or website] --> B[Sign in with email or Google]
  B --> C[Unlinked Login Identity]
  C --> D[Verify inside official ATF Discord server]
  D --> E[Resolve or create ATF App User]
  E --> F[Participant]
  F --> G[Complete Participant Profile]
  G --> H[Submit ranked Topic Preferences]
  H --> I[Eligible for Matchmaking Run]
  I --> J[Admin-approved Team]
  J --> K[Challenge participation]
```

## Identity Resolution

```mermaid
flowchart TD
  A[User signs in with email or Google] --> B[Unlinked Login Identity]
  B --> C[User verifies in official ATF Discord server]
  C --> D{Discord Account already linked?}
  D -->|Yes| E[Resolve existing ATF App User]
  D -->|No| F[Create new ATF App User]
  E --> G{Under 3 active Login Identities?}
  F --> H[Attach Login Identity]
  G -->|Yes| H
  G -->|No| I[Block attach and flag admin]
  H --> J[User continues as Participant]
```

## Discord Verification

```mermaid
sequenceDiagram
  participant Web as Web App
  participant User
  participant Discord
  participant API as Vercel Interaction Endpoint
  participant DB as Convex

  Web->>DB: Create Verification Challenge
  DB-->>Web: Return human-friendly code
  Web-->>User: Show code and instructions
  User->>Discord: Run /verify CODE in ATF server
  Discord->>API: Send interaction with Discord User ID and guild_id
  API->>DB: Check challenge and linked account state
  DB-->>API: Return masked email confirmation details
  API-->>Discord: Ephemeral confirmation prompt
  User->>Discord: Click Confirm
  Discord->>API: Send confirmation interaction
  API->>DB: Link Discord Account to ATF App User
  API-->>Discord: Ephemeral success or failure
  DB-->>Web: Verification complete on refresh or realtime update
```

## Topic Update Impact

```mermaid
flowchart TD
  A[Admin updates Challenge Topic] --> B{Update type}
  B -->|Rename or clarify| C[Preferences remain active]
  B -->|Archive| D[Preferences remain in history but become inactive]
  D --> E{Participant still has 2 or more active preferences?}
  E -->|Yes| F[Still eligible for matchmaking]
  E -->|No| G[Needs Preference Update]
  G --> H[Show participant in admin dashboard]
  G --> I[Prompt participant to choose another topic]
```

## Matchmaking Run Lifecycle

```mermaid
flowchart TD
  A[Admins configure inputs] --> B[Generate Draft Matchmaking Run]
  B --> C[Review quality, coverage, and exceptions]
  C --> D{Approve this draft?}
  D -->|No| E[Generate another draft]
  E --> C
  D -->|Yes| F[Approve Matchmaking Run]
  F --> G[Create Teams]
  G --> H[Publish teams to Participants]
```

## Architecture Boundary

```mermaid
flowchart TD
  U[Participant Browser] --> N[Next.js App on Vercel]
  N --> C[Convex Backend]
  N --> P[PostHog]
  D[Discord Slash Command] --> V[Vercel Discord Interaction Route]
  V --> C
  V --> DR[Discord REST API]
  C --> N
  A[Admin Browser] --> N
```

## Admin Dashboard Grouping

```mermaid
flowchart TD
  A[Admin Dashboard] --> B[Identity And Verification]
  A --> C[Profiles And Preferences]
  A --> D[Topic Catalog]
  A --> E[Matchmaking]
  A --> F[Teams And Support]
  A --> G[Audit History]

  B --> B1[Identity limits]
  B --> B2[Recovery actions]
  B --> B3[Discord verification and role failures]

  C --> C1[Missing profiles]
  C --> C2[Preference distribution]
  C --> C3[Needs Preference Update]

  D --> D1[Sectors]
  D --> D2[Challenge Topics]
  D --> D3[Topic Update impact]

  E --> E1[Team Size Policy]
  E --> E2[Draft runs]
  E --> E3[Quality metrics]
  E --> E4[Approval and publish]

  F --> F1[Team reassignment]
  F --> F2[Support queues]
```

