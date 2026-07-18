# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npx tsc --noEmit # Type check without emitting files
```

## Architecture

This is a Next.js 16 project using the App Router with React 19 and Tailwind CSS v4.

### Key Technologies
- **UI Components**: shadcn/ui components using Radix UI primitives and class-variance-authority (CVA) for variants
- **Icons**: Hugeicons (`@hugeicons/react` with `@hugeicons/core-free-icons`)
- **Styling**: Tailwind CSS v4 with `tw-animate-css` for animations, using OKLCH color space for theme variables
- **Animations**: Framer Motion available for complex animations

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Reusable UI components (shadcn/ui style with CVA variants)
- `components/sections/` - Page section components
- `lib/utils.ts` - Utility functions including `cn()` for merging Tailwind classes

### Component Patterns
- UI components use `data-slot` attributes for styling hooks
- Components export both the component and its variants (e.g., `Button` and `buttonVariants`)
- Use `cn()` from `@/lib/utils` to merge class names with proper Tailwind conflict resolution
- Path alias `@/*` maps to the project root

## Agent skills

### Issue tracker

Issues and PRDs are tracked as local Markdown files under `.scratch/`; PRs are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the default canonical label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository. See `docs/agents/domain.md`.
