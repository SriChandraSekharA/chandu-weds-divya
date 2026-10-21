# AGENTS.md — chandu-weds-divya

## Project

Chandu weds Divya — a wedding invitation demo site with South Indian temple aesthetics. Built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion + React Three Fiber (3D)
- **Backend**: Supabase (blessings wall, gift pledges)
- **Testing**: Vitest (unit) + Playwright (e2e)

## Deployment Paths

- Build production assets with relative URLs and select the router basename from the current URL, so one build works at the Lovable domain root, GitHub Pages subpath, and local folders.

## Commands

```bash
bun dev        # Start dev server
bun build      # Production build
bun test       # Run unit tests
bun lint       # ESLint check
```

## Structure

```
src/
├── components/wedding/   # Main invitation sections
├── components/ui/        # shadcn/ui primitives
├── pages/                # Index, ThankYou, NotFound
├── integrations/supabase # Supabase client + types
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

## Key Components

| Component | Purpose |
|-----------|---------|
| HeroSection | Animated curtain reveal + scratch card date |
| CoupleSection | Bride & groom introduction |
| EventsSection | Wedding events timeline |
| VenueSection | Location with embedded Google Map |
| CountdownSection | Days/hours/minutes countdown |
| GiftSection | Cauvery Calling / Amazon gift options |
| BlessingsWall | Guest messages (Supabase-backed) |
| GopuramParallax | Temple tower parallax effect |
| LanguageToggle | English ↔ Telugu switcher |

## Board Sync

- Work is tracked in `BOARD.md` (kanban mirror of GitHub Issues).
- Keep `BOARD.md` and issue status in sync when tasks complete or scope changes.
- One card `In Progress` at a time; cards carry a GitHub issue reference (`#N`) and done-criteria.
