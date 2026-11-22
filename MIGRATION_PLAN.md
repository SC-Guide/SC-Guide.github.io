# SkinCare Guide — migration plan

## Target
A responsive Web App built with React, TypeScript and Vite, with a clean separation between UI, domain logic and persistence. The architecture should leave room for a future mobile client without tying skincare rules to React components.

## Safety rules
- Keep the existing HTML/JS site available as the production fallback until the replacement passes acceptance tests.
- Work on `redesign/react-foundation`; do not merge into `main` or change GitHub Pages publishing until explicitly approved.
- Do not delete or overwrite legacy LocalStorage keys.
- Do not copy sensitive profile data to a cloud service without an explicit product/privacy decision.
- Treat skincare guidance as organisational/educational, not diagnosis or treatment.

## Phases
1. **Inventory and compatibility** — document existing pages, workflows, LocalStorage keys, Firebase Auth setup, language/theme behaviour and product/routine data structures.
2. **Design system** — agree visual direction, typography, colour tokens, spacing, responsive breakpoints, accessible controls and iconography.
3. **Application foundation** — React + TypeScript + Vite, routing, shared layout, component conventions, lint/typecheck/build and test setup.
4. **Feature migration** — profile, product library, planner/calendar, active-ingredient scheduling rules, journal and bilingual content.
5. **Persistence and identity** — versioned local storage adapters first; integrate existing Firebase Authentication after compatibility checks. Cloud sync/Firestore is a separate opt-in milestone.
6. **Quality assurance** — unit tests for scheduling/data logic, component tests for forms and filters, Playwright smoke tests for critical journeys and viewport checks.
7. **Release** — deploy a preview, compare against acceptance criteria, then switch production only with approval.

## Current implementation status
- [x] Created isolated branch `redesign/react-foundation` from current `main`.
- [x] Added a Vite + React + TypeScript starter under `webapp/`.
- [x] Added a first responsive visual direction and navigation for Overview, Skin Profile, Planner, Products and Journal.
- [x] Added English/Russian UI toggle, theme toggle and basic local persistence for the new prototype.
- [ ] Complete legacy data inventory and safe import/migration adapter.
- [x] Add an interactive month calendar, selected-day routine view, editable retinal start date, and individually trackable daily steps in the prototype.
- [ ] Complete parity with all original planner/calendar details and validate ingredient scheduling with tests.
- [ ] Reconnect Firebase Authentication and verify authorized domains/providers.
- [ ] Add automated tests and run a production build.
- [ ] Deploy preview and perform browser/device acceptance testing.
- [ ] Obtain approval before production cutover.

## Current prototype limitations
The starter is a visual and architectural foundation, not a feature-complete replacement. It currently uses sample product content and a simplified checklist planner. It does not yet connect to Firebase, sync across devices, provide medical recommendations, or import the legacy app's saved data.
