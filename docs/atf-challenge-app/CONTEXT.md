# ATF Challenge App

The ATF Challenge App is the authenticated product that verifies participants, captures their profiles and topic preferences, forms teams, and gives admins operational control at challenge scale.

## Program

**ATF Challenge App**:
The authenticated app experience for participants and admins of the ATF Challenge.
_Avoid_: App, portal

**Cohort**:
A specific run of the ATF Challenge program.
_Avoid_: Season, batch

## Identity

**ATF App User**:
The canonical participant identity inside the ATF Challenge App.
_Avoid_: Account, user account, Discord member

**Login Identity**:
An email or provider-based sign-in identity that can grant access to one ATF App User.
_Avoid_: Gmail account, email account, credential

**Unlinked Login Identity**:
A newly authenticated Login Identity that has not yet been resolved to an ATF App User through Discord verification.
_Avoid_: Temporary account, duplicate account

**Discord Account**:
The participant's Discord identity, anchored by Discord's stable user ID.
_Avoid_: Discord username, Discord member

**Verification Challenge**:
A time-limited proof that connects an Unlinked Login Identity to a Discord Account.
_Avoid_: Confirmation code, login code

**Participant**:
An ATF App User who has completed Discord verification.
_Avoid_: Discord member, verified user

## Profile And Preferences

**Participant Profile**:
The participant-provided information used for eligibility, communication, and matchmaking.
_Avoid_: Application, bio

**Participant Role**:
A controlled role label used to describe how a Participant may contribute to a team.
_Avoid_: Skill, job title

**Primary Role**:
The Participant Role that best describes the participant's main contribution.
_Avoid_: Main skill

**Secondary Role**:
An additional Participant Role that describes another useful contribution.
_Avoid_: Extra skill

**Sector**:
A high-level domain category for Challenge Topics, such as Health, Agriculture, Finance, or Education.
_Avoid_: Industry, category

**Challenge Topic**:
A prepared selectable topic within a Sector that Participants rank during profile completion.
_Avoid_: Problem, prompt, challenge brief

**Topic Preference**:
A Participant's ranked choice of a Challenge Topic for matchmaking.
_Avoid_: Topic selection, interest

**Topic Update**:
An admin change to a Challenge Topic that may affect whether existing Topic Preferences remain active for matchmaking.
_Avoid_: Topic edit

**Needs Preference Update**:
A Participant state where fewer than two Topic Preferences remain active.
_Avoid_: Invalid profile, incomplete profile

## Teams And Matchmaking

**Team**:
A cohort-scoped group of Participants competing together in the ATF Challenge.
_Avoid_: Group, squad

**Team Membership**:
The relationship between a Participant and a Team.
_Avoid_: Team link, membership

**Assigned Challenge Topic**:
The Challenge Topic a Team is formed around or commits to for the challenge.
_Avoid_: Team topic, chosen problem

**Team Size Policy**:
Cohort-specific settings for target, minimum, and maximum Team size.
_Avoid_: Team size config

**Matchmaking Run**:
A generated set of proposed Teams based on Participant Profiles, Topic Preferences, and a Team Size Policy.
_Avoid_: Algorithm run, team generation

**Draft Matchmaking Run**:
A Matchmaking Run that admins can inspect, compare, discard, or approve.
_Avoid_: Simulation

**Approved Matchmaking Run**:
A Draft Matchmaking Run accepted by admins, after which Teams are formed and published.
_Avoid_: Final run

## Administration

**Admin**:
A trusted operator who can review, approve, and recover ATF Challenge App records.
_Avoid_: Moderator, super admin

**Admin Recovery Action**:
A support action that changes identity linkage while preserving audit history.
_Avoid_: Manual fix, override

**Login Identity Reset**:
An Admin Recovery Action that revokes active Login Identities while preserving the ATF App User.
_Avoid_: Delete emails, reset Discord identity

**Discord Account Recovery**:
An Admin Recovery Action that changes the Discord Account linked to an ATF App User.
_Avoid_: Reset Discord link

