# SkinCare Guide Web App (new foundation)

This is the new React + TypeScript + Vite application, developed separately from the legacy static site.

## Run locally
```bash
cd webapp
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Stack
- React + TypeScript
- Vite
- lucide-react icons
- CSS design tokens and responsive layouts

## Current status
This is an early design and architecture prototype. It includes Overview, Skin Profile, Planner, Products and Journal screens, bilingual EN/RU labels, a dark appearance toggle, and local-only prototype persistence. Sample product content is illustrative.

It is not yet a production replacement: legacy data import, full calendar and active-ingredient scheduling, Firebase Authentication, automated tests and deployment remain planned work. See the repository root `MIGRATION_PLAN.md`.
