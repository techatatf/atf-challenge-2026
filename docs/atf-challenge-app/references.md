# ATF Challenge Reference

This file carries forward the ATF Challenge context that is currently spread across the landing-page repo. It should travel with the app docs when the ATF Challenge App becomes a separate repository.

## Program

The ATF AI Challenge is a Pan-African AI education and challenge program run by the African Technology Forum (ATF), supported by Google.org.

The public landing page describes the program as a path from learning to building to demoing: participants join the AI School, form teams for the AI Challenge, and later present at Demo Day.

## Audience

The target audience is university students and recent graduates in:

- Ghana
- Nigeria
- Kenya
- South Africa

The public website positions the program as open to students and recent graduates who are passionate about technology. Prior AI coding experience is not required for the beginner track.

## Current Scale Assumptions

The app is being designed for a major scale increase:

- Previous context: about 90 teams.
- Target context: about 2,500 teams.
- Expected users: roughly 15,000 to 20,000.
- Possible burst traffic: roughly 5,000 users active around the same time after an announcement link is posted in Discord.

These assumptions are why account linking, admin review, and system-supported team formation are core product needs rather than nice-to-haves.

## Program Journey

Current public content describes three phases:

- AI School: April to July 2026.
- AI Challenge: August to November 2026.
- Demo Day: April 2027 in the phase description.

The timeline table in the current content brief also says "May 2027" for Demo Day Finals. Treat the final Demo Day date as a content question to confirm before the app depends on it.

## Current Landing-Page Repo

The current repository is a Next.js landing-page project for the ATF AI Challenge. It includes:

- Public marketing sections such as Hero, Mission, Journey, Why Join, Eligibility, Key Dates, and Footer.
- Public pages such as `/apply`, `/subscribe`, `/faq`, `/partner`, `/contact`, and `/privacy`.
- A state-aware CTA model controlled by `lib/application-status.ts`.

The app docs should not assume this repository will remain available. When context from the landing page matters, it should be repeated here.

## Strategic Partner Language

Use this exact phrase:

> supported by Google.org

Avoid "sponsored by Google.org", "partnered with Google.org", and "funded by Google.org".

## App Boundary

The proposed authenticated product is the ATF Challenge App, intended for:

- Participant account verification.
- Participant profile completion.
- Sector and Challenge Topic preference collection.
- System-supported team formation.
- Admin review and recovery workflows.

The proposed deployment boundary is `app.atfchallenge.org`.

