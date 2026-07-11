# ATF Challenge 2026 Website

This repository contains the public-facing website for the ATF AI Challenge 2026. It explains the program and moves visitors toward the appropriate current action: applying while applications are open or subscribing for updates while applications are closed.

## Scope boundary

The material under `docs/atf-challenge-app/` explores a possible separate authenticated product. Its `CONTEXT.md` and ADRs apply only within that exploratory folder. They are not domain definitions or architectural decisions for this website.

## Program language

**ATF AI Challenge**:
The overall pan-African program presented by this website.
_Avoid_: ATF Challenge App

**AI School**:
The learning phase that prepares participants for the challenge.
_Avoid_: Bootcamp when referring to the named program phase

**AI Challenge**:
The build phase in which participants form teams and create solutions.
_Avoid_: Hackathon

**Demo Day**:
The final phase where selected teams present their work.
_Avoid_: Graduation

## Website language

**Application State**:
Whether applications are open or closed, controlled by `APPLICATIONS_OPEN` in `lib/application-status.ts`.
_Avoid_: Campaign status

**Primary Action**:
The state-aware conversion goal shown across the website: apply when applications are open, or subscribe for next-cohort updates when they are closed.
_Avoid_: Always referring to this action as Apply

**Application Channel**:
The attribution value passed through the `channel` query parameter to the application flow. It is not currently part of the subscription flow.
_Avoid_: Source when referring to the implemented query parameter

## Brief Interest language

**Brief Interest**:
An early signal that an organization may contribute sector-specific input to the ATF AI Challenge. It is not a participant-ready challenge artifact.
_Avoid_: Brief submission, Problem Statement submission

**Interested Organization**:
An organization expressing Brief Interest without implying a formal partnership or sponsorship.
_Avoid_: Partner, Sponsor

**Brief Contact**:
The person who submits Brief Interest on behalf of an Interested Organization.
_Avoid_: Applicant, Participant

**Problem Statement**:
Participant-ready challenge material that ATF shapes after receiving and developing relevant input.
_Avoid_: Brief Interest

**Sector**:
The high-level domain category attached to a Brief Interest.
_Avoid_: Challenge Topic

## Sources of truth

- `docs/content-brief.md` is the source of truth for website content and must not be edited as part of ordinary page work.
- `lib/application-status.ts` is the source of truth for the current Application State and state-aware destinations.
