# Expedition Org.

A demo / portfolio build for **Expedition Org.** — a public site, multi-step
registration, participant portal, and organizer dashboard concept around the
organization’s business summit and Model United Nations work.

> **Not production internship code.** This repository is demo work posted for
> portfolio purposes. It is **not** the real codebase used during internship
> work from December 2025 to January 2026. Names, copy, and flows here are
> illustrative; registrations stay in the browser and are not official.

## Features

- **Public site** — homepage, about, events, FAQ, and a contact form.
- **Registration** — a single multi-step flow covering five participant roles
  (delegate, chair, attendee, volunteer, speaker/judge) with conditional
  role-specific fields, Zod validation, a review step, and a confirmation ID.
- **Participant portal** — look up a registration by ID or email to see status
  and announcements.
- **Organizer dashboard** — registration stats, a filterable participant table,
  CSV export, and announcement publishing that feeds the portal.
- **Engineering** — lazy-loaded route bundles, a top-level error boundary,
  per-route document titles, ESLint, a Vitest + Testing Library suite, and a
  GitHub Actions CI pipeline running lint, tests, and build on every push.

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for build tooling
- [Tailwind CSS v4](https://tailwindcss.com) with a custom brand theme
- [React Router](https://reactrouter.com) for routing
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for forms
  and validation

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # type-check and build for production
npm run preview   # serve the production build locally
npm run lint      # run ESLint
npm test          # run the Vitest suite once
npm run test:watch
```

## Data layer

All persistence goes through `src/lib/storage.ts`, currently backed by
localStorage (registrations are stored in the visitor's browser). It is designed
to be swapped for Supabase (or any backend) without touching the UI — the app
only calls `saveRegistration`, `findRegistration`, `getRegistrations`,
`getAnnouncements`, and `publishAnnouncement`.

## Deployment

The repo includes a `vercel.json` with the SPA rewrite needed for React Router,
so importing the repository into Vercel deploys with zero further configuration.
CI runs lint, tests, and a production build on every push via GitHub Actions.

## Project structure

```
src/
  components/
    forms/      # reusable form field components (text, select, textarea, checkbox)
    layout/     # navbar, footer, page layout
    ui/         # design-system primitives (Button, Card, Badge, ...)
  data/         # site content: event info, FAQs
  lib/          # storage layer and registration schema
  pages/        # one component per route
```
