## Project overview
Angular Example App is a real-world Angular starter focused on learning, productivity, and scaling. It showcases a production-style frontend with authentication, routing, i18n, API integration, and polished UI patterns. The app is designed as a reference implementation for modern Angular best practices rather than a narrow demo.

## Tech stack
- Language: TypeScript
- Framework: Angular 21, Angular CLI, RxJS
- Styling/UI: SCSS, BEM, Shoelace components
- Testing: Vitest for unit tests, Playwright for E2E
- Tooling: ESLint, Stylelint, Prettier, Knip, Husky
- i18n: Angular localization with English and Spanish
- Backend assumption: REST API backend; README mentions NestJS, PostgreSQL, Prisma

## Directory layout
- `src/` — Angular application source, including app code, styles, locales, and environments
- `src/app/core/` — cross-cutting infrastructure such as interceptors, constants, providers, and services
- `src/app/features/` — feature areas like authentication, home, pokemon, user, and error
- `src/app/shared/` — reusable components, directives, pipes, and validators
- `e2e/` — Playwright end-to-end tests, page objects, fixtures, and snapshots
- `public/` — static assets and redirect/robots files
- `scripts/` — automation helpers for E2E and Lighthouse
- `.github/` — GitHub workflows and issue templates
- Root config files — Angular, TypeScript, linting, testing, release, and formatting setup

## Build & test
- `npm i` — install dependencies
- `npm start` — start the app locally
- `npm run build` — production build
- `npm run lint` — run ESLint and Stylelint checks
- `npm run stylelint:fix` — fix SCSS style issues
- `npm run prettier:write` — format source files
- `npm run knip` — detect unused files and dependencies
- `npm run test` — run unit tests with Vitest
- `npm run test:coverage` — run unit tests with coverage
- `npm run playwright` — run Playwright tests in Chromium
- `npm run test:e2e:local:serve` — start local server and run E2E smoke tests
- `npm run test:visual` — run visual regression tests
- `npm run test:accessibility` — run accessibility tests
- `npm run verify:all` — run lint, stylelint, tests, build, E2E, and Lighthouse

## Architecture notes
- Routing is feature-first and lazy-loaded; top-level routes load feature route arrays instead of large monolithic route tables.
- Authentication uses guards plus an HTTP interceptor; tokens are stored in local storage and auth state is derived with Angular signals.
- HTTP concerns are centralized through interceptors, including bearer token attachment, refresh-token retry logic, and request caching.
- The app uses zoneless change detection and signal-driven state updates, so new state should follow signal/effect patterns.
- SSR/SSG is used selectively; prerendering is configured for the home page and specific pokemon detail routes.
- Shared UI lives in `src/app/shared`, while cross-cutting services and constants live in `src/app/core`.
- i18n is built into the project with English and Spanish locales, so user-facing text and routes should respect localization conventions.

## Notes for future features
- Prefer adding new functionality as a feature folder under `src/app/features/<feature>` with its own routes, services, and types.
- Put reusable UI in `src/app/shared` and app-wide infrastructure in `src/app/core`; avoid duplicating cross-cutting logic inside features.
- If a request should be cached, opt in through the caching interceptor’s context token rather than building ad hoc caches.
- When touching auth flows, remember refresh-token retry behavior, logout cleanup, and cache invalidation.
- Keep route and locale changes aligned with the existing English/Spanish setup and public redirect rules.
- Follow the existing Angular/SCSS conventions and keep tests close to the behavior they cover, especially for E2E and visual checks.
