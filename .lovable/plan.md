# Gift & Blessings Section Plan

## Goal
Add a new "Gift & Blessings" section to the wedding invitation where guests can choose to contribute in one of two ways:

1. **Amazon Gift Card** — guests send an Amazon e-gift card to a specified email.
2. **Cauvery Calling (Sadhguru's campaign)** — guests plant trees as a wedding gift via the contributor's campaign page.

## Placement
Insert the new section between `VenueSection` and `FooterSection` in `src/pages/Index.tsx`, wrapped in a `SnapSection variant="fade"` (matching the existing section flow). It sits just before the closing invite/footer.

## What to build

### 1. New component: `src/components/wedding/GiftSection.tsx`
A themed section following the same visual pattern as `EventsSection` / `VenueSection`:
- `min-h-[60vh]` section, centered content, `gold-border-ornate` cards on `bg-card/80 backdrop-blur-sm`.
- Section heading using `gradient-rose-gold-text` + `font-display`, with the script subtitle above it and a gold divider below — identical to other sections.
- A two-column responsive grid (`grid-cols-1 md:grid-cols-2`) with two gift cards:

  **Card A — Amazon Gift Card**
  - Title: "Amazon Gift Card" (EN) / "అమెజాన్ గిఫ్ట్ కార్డ్" (TE)
  - Short description: invite guests to send an Amazon e-gift card.
  - A prominent "Send Gift Card" button linking to `https://www.amazon.in/gp/gift-card` (opens new tab).
  - A clearly displayed email line (e.g. "Send to: chandu@example.com") so guests know the recipient address. **Placeholder email will be used until you confirm the real address.**

  **Card B — Cauvery Calling**
  - Title: "Cauvery Calling" (EN) / "కావేరి కాలింగ్" (TE)
  - Description: plant trees as a wedding gift through Sri Chandra Sekhar's campaign.
  - "Plant a Tree" button linking to the campaign URL:
    `https://consciousplanet.org/en/cauvery-calling/campaigns/cauvery-calling-action-now-sri-chandra-sekhar-addepalli-0`
  - A small leaf/tree icon (inline SVG) for visual identity.

- `framer-motion` reveal animations (`useInView`, opacity/y) consistent with sibling sections.
- Buttons styled like the existing venue "Open in Google Maps" pill button (`border border-gold/50 rounded-full ... text-gold hover:bg-gold/10`).

### 2. Translations in `src/components/wedding/LanguageContext.tsx`
Add a `gift.*` namespace with bilingual keys:
- `gift.subtitle`, `gift.title`
- `gift.amazon_title`, `gift.amazon_desc`, `gift.amazon_button`, `gift.amazon_send_to`
- `gift.cauvery_title`, `gift.cauvery_desc`, `gift.cauvery_button`

### 3. Wire into the page
In `src/pages/Index.tsx`, add `import GiftSection` and render `<SnapSection variant="fade"><GiftSection /></SnapSection>` between the Venue and Footer `SnapSection` blocks.

## Open item needing your input
- **Amazon gift card recipient email**: I'll use a placeholder (`chandu@example.com`) in the build. Please share the real email so I can replace it, or tell me to remove the email display and rely only on the Amazon gift-card link.

## Out of scope
- No backend, no payment processing — both options are external links/emails only.
- No changes to existing sections, fonts, colors, or layout heights.

## Technical notes
- Component follows the existing `useLanguage`/`t` pattern and `framer-motion` reveal conventions.
- All text uses existing `gradient-rose-gold-text` heading style and `font-body` body text.
- Section height `min-h-[60vh]` matches the other post-venue sections.
