# Add Embedded Google Map to Venue Section

## Goal
Add a full-width, interactive embedded Google Map beneath the existing address + QR code columns in the Venue section.

## Venue coordinates (resolved from the short link)
- Latitude: 17.5406364
- Longitude: 78.2704928
- Place name: APR Praveen's Higheria

## Approach
Use the free Google Maps embed URL with coordinates — no API key or connector required:
```
https://maps.google.com/maps?q=17.5406364,78.2704928&z=15&output=embed
```
This keeps the project standalone (no backend/Cloud needed) and works on the published `*.lovable.app` domain.

## Changes

### 1. `src/components/wedding/VenueSection.tsx`
- Add a `mapEmbedUrl` constant with the coordinates-based embed URL.
- After the existing `flex flex-col md:flex-row` row (address + QR code), add a new full-width `<motion.div>` containing an `<iframe>`:
  - `src={mapEmbedUrl}`, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `title="Venue map"`.
  - Styled with the existing `.gold-border-ornate` class, `rounded-xl`, `w-full`, responsive height (`h-48 md:h-72`), `bg-card/60`.
  - Reveal animation matching the section (fade/slide, slight delay).
- Keep the QR code and "Open in Google Maps" link as-is.

## Verification
- Build passes.
- Browser check on mobile (390px) and desktop that the map renders inside an iframe, fits the section width, and the QR code/link still work.

## Notes
- The embedded map requires an internet connection at view time (same as the existing QR code/link). The rest of the invitation stays offline-capable.
