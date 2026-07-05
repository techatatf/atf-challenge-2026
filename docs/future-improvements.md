# Future Improvements - ATF Challenge Website

> **Status**: Pending - awaiting more information before implementation

---

## 1. Application Window Automation

**Problem**: The primary CTA is currently controlled by the manual
`APPLICATIONS_OPEN` flag in `lib/application-status.ts`.

**Future option**: Replace the manual flag with an owned application-window
source, such as scheduled config, CMS content, or admin-managed program state.

**Files affected**: `lib/application-status.ts`, primary CTA components

---

## 2. Add Google.org Attribution

**Problem**: Mission section says "supported by our strategic partners" but guidelines require exact phrasing: **"supported by Google.org"**

**Location**: `components/sections/mission.tsx:38`

**Fix**: Change text from:
```
supported by our strategic partners
```
to:
```
supported by Google.org
```

---

## 3. Header Enhancements

- Mobile menu animation (slide-down instead of instant appear)
- Replace inline SVG hamburger with Hugeicons
- Active section highlighting in nav during scroll

**Files affected**: `components/sections/header.tsx`

---

## 4. Key Dates Timeline

- Progress fill showing current position in timeline
- Pulse/glow animation on active milestone
- Sequential reveal animation on scroll
- Review `-z-10` on mobile vertical line (potential stacking issue at line 43)

**Files affected**: `components/sections/key-dates.tsx`

---

## 5. Footer Enhancements

- Partner logos row (Google.org, etc.)
- Social media links
- Newsletter signup option

**Files affected**: `components/sections/footer.tsx`

---

## 6. Hero Section Ideas

- Staggered entrance animations (headline -> subheadline -> CTA)
- Country visualization (flags, animated city names, or map)
- Social proof badge ("Join 15,000 learners")
- Secondary ghost CTA ("Learn More")
- Parallax background on scroll
- Scroll indicator fade-out after scrolling

**Files affected**: `components/sections/hero.tsx`

---

## 7. Eligibility Section

- Interactive checklist feel - checkmarks animate in sequence on scroll
- Self-assessment styling

**Files affected**: `components/sections/eligibility.tsx`
