# Plan: Remove full-page snap scroll and fix QR clipping on mobile

## Goal
Drop the one-section-per-swipe full-page snap behavior so the invitation scrolls like a normal page, and fix the venue QR code getting clipped on mobile.

## What we will change

### 1. Remove full-page snap from the main container
- In `src/pages/Index.tsx`: remove `snap-y snap-mandatory` and `mobile-snap-container` from the `<main>` element.
- Keep the main element as a normal vertical scroll container with `overflow-x-hidden`.

### 2. Let sections size to their content
- In `src/components/wedding/SnapSection.tsx`: remove the fixed `h-[100dvh]` so the wrapper does not force a viewport height.
- Keep the `useInView` reveal animation and the `overflow-hidden` / `touch-pan-y` classes, because they still control entrance fades without the snap behavior.
- Add `min-h-[100dvh]` to the inner `<motion.div>` so each section still feels full-height when content is short, but can grow when needed.

### 3. Update every section to use natural height + centering
- Convert each section (`HeroSection`, `CoupleSection`, `GopuramParallax`, `CountdownSection`, `EventsSection`, `VenueSection`, `FooterSection`) from `min-h-screen` to `min-h-[100dvh]` with `flex flex-col justify-center items-center` where needed, so vertical centering works without the snap container.
- Preserve existing padding but ensure it is mobile-safe (e.g. `py-12 md:py-20`).

### 4. Fix the QR code on mobile
- In `src/components/wedding/VenueSection.tsx`:
  - Make the QR code responsive: `size` tied to a small breakpoint (e.g. `140` on mobile, `180` on desktop).
  - Switch the venue card from `flex-col md:flex-row` to a stacked layout that guarantees the QR card fits within the viewport width.
  - Reduce padding on the card for small screens (`p-4 md:p-6`).
  - Reduce text size for the address block on mobile.

### 5. Preserve intro/loading phases
- Ensure the loading overlay, curtain, and scratch reveal still run before the main content is revealed.
- The main content remains hidden behind the fixed overlay until the scratch reveal completes.

### 6. Verify after the change
- Run the existing test suite (`bunx vitest run`).
- Check the preview at mobile viewport (390x844) to confirm no section is clipped and the QR code is fully visible.
- Check desktop viewport to confirm the centered, full-height sections still look good.

## Outcome
The invitation becomes a smooth, normal-scrolling page with full-height sections and a mobile-safe QR code.
