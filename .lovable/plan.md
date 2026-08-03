## Scratch-Card Date Reveal After Curtain

Once the 3D curtain finishes opening, a non-dismissible overlay appears with a scratch card. The guest scratches the foil with finger or mouse; when enough is cleared, the wedding date is revealed and a Continue button takes them into the invitation.

### Flow

```text
Curtain opens (existing) -> onComplete -> ScratchReveal overlay
  (no close button, no ESC, no backdrop click)
  -> guest scratches foil -> ~55 percent cleared -> foil auto-fades
  -> date revealed with shimmer + Continue button -> overlay unmounts -> invitation
```

### Changes

1. `src/components/wedding/CurtainIntro.tsx`
   - Accept an optional `onComplete` prop, fired when the intro unmounts at the end of the existing fade timeline. No change to curtain visuals or timing.

2. New `src/components/wedding/ScratchReveal.tsx`
   - Fixed full-screen overlay, `z-[110]`, dark blurred backdrop, interactive. Non-closable: no X, no ESC handler, no outside-click dismiss; page scroll locked while open.
   - Card (about 320x420, rounded, existing `gold-border-ornate` styling) containing:
     - Underneath: a script "Save the Date" line, `Thursday, 26th November 2026`, and `9:33 AM` Muhurtham time, all bilingual through `t(lang, ...)` and styled with `gradient-rose-gold-text`.
     - On top: an HTML canvas filled with a rose-gold / indigo foil texture plus a "Scratch here" hint.
   - Scratch mechanics: pointer events (mouse and touch) erase with `destination-out` compositing at roughly 28px radius, interpolated between points so fast drags leave no gaps. `touch-action: none` on the canvas so scratching never scrolls the page.
   - Progress: sample canvas alpha about every 150ms; once roughly 55 percent is cleared, fade the canvas out and mark it revealed.
   - Revealed state: framer-motion scale and fade on the date, plus a Continue / కొనసాగించు button that calls `onDone()`.
   - Reduced-motion or no-canvas fallback: a "Tap to reveal" button that reveals instantly.

3. `src/pages/Index.tsx`
   - Local state `phase` with values `curtain`, `scratch`, `done`.
   - `<CurtainIntro onComplete={...} />` moves the phase to `scratch`; `<ScratchReveal onDone={...} />` renders during that phase and moves it to `done`.
   - Overlay sits above the language and music toggles; music still unlocks on the first scratch touch since that counts as a user gesture.

4. `src/components/wedding/LanguageContext.tsx`
   - Add keys `scratch.hint`, `scratch.savedate`, `scratch.continue`, `scratch.reveal` in English and Telugu. Date and time reuse the existing `events.date_wedding` and `events.time_muhurtham` values.

### Notes
- Frontend only; no backend or data changes.
- Shown on every page load. Tell me if you would rather show it only once per visitor.
