# Thank-You & Blessings Wall

A new page where guests share the gift they chose, and everyone can see the growing list of names, trees planted, and messages.

## What guests will see

- A new page at `/thank-you`, reached from a button added to the Gift & Blessings section ("I've sent my gift" / "నా బహుమతి పంపాను").
- A short form in the same gold-and-lavender style:
  - Name (required)
  - Which gift: Trees for Cauvery Calling, or Amazon gift card
  - Number of trees (shown only when Cauvery Calling is picked)
  - A short blessing message (optional)
- After submitting, a warm thank-you note appears, styled like the rest of the invitation.
- Below the form, a public wall of all entries: name, gift chosen, tree count, and message, newest first.
- A small summary at the top: total trees planted by all guests and number of well-wishers.
- Fully bilingual, following the existing `?lang=te` link behaviour.

## What you get

Open the same page any time to see every guest, their gift, tree count, and message — that's your donation tracking list.

## Notes

- Saving entries needs online storage, so this page only works with an internet connection. The rest of the invitation keeps working offline; the offline copy will simply not include this page's saved list.
- Anyone with the link can add an entry and read the wall (as chosen). Entries cannot be edited or deleted by guests. If unwanted entries appear, they can be removed on request.

## Technical details

1. Enable Lovable Cloud (adds database backing).
2. Migration: `public.gift_pledges` — `id uuid pk default gen_random_uuid()`, `guest_name text not null` (length-checked 1..80), `gift_type text not null check in ('cauvery','amazon')`, `tree_count int check (tree_count between 1 and 10000)`, `message text` (max 500), `created_at timestamptz default now()`.
   - GRANTs: `SELECT, INSERT ON public.gift_pledges TO anon, authenticated;` `ALL TO service_role;`
   - RLS enabled; policies: public `SELECT` using `true`, public `INSERT` with `true` (no update/delete policies).
3. New route `/thank-you` registered in `src/App.tsx`, page `src/pages/ThankYou.tsx`.
4. New components under `src/components/wedding/`: `GiftPledgeForm.tsx` (client-side validation with zod, insert via Supabase client) and `BlessingsWall.tsx` (fetch ordered by `created_at desc`, totals computed from rows).
5. Bilingual `thanks.*` keys added to `LanguageContext.tsx`; language state read from the query param as today.
6. Link button added to `GiftSection.tsx` under both cards.
7. Tests: extend `src/components/wedding/__tests__` with a form validation test and a translation-key test for the new `thanks.*` keys.
