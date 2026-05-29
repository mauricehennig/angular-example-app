## Project overview
Angular Example App is a real-world Angular starter focused on learning, productivity, and scaling. It showcases production-style frontend patterns such as standalone components, routing, i18n, authentication, caching, and end-to-end quality checks. The app is a frontend-only repository that integrates with an external backend API rather than defining its own server or database.

## Tech stack
- Language: TypeScript
- Framework: Angular 21
- UI/styling: SCSS, Shoelace, Angular animations
- Testing: Vitest, Playwright, axe-core
- Tooling: Angular CLI/build system, ESLint, Stylelint, Prettier, Knip
- Cloud/deploy: Netlify-style static hosting; backend API is external (NestJS/PostgreSQL/Prisma per README)

## Directory layout
- `src/` — Angular application source, including app code, environments, locale files, and global styles
- `e2e/` — Playwright end-to-end tests, page objects, fixtures, and specs
- `public/` — Static assets served directly by the build
- `scripts/` — Local automation for e2e and Lighthouse workflows
- `.github/` — GitHub workflows and repository templates
- `.husky/` — Git hooks for commit/quality automation
- Root config files — Angular, TypeScript, linting, formatting, release, and test configuration

## Build & test
- `npm i` — install dependencies
- `npm start` — start the dev server
- `npm run build` — production build
- `npm run test` — run unit tests with Vitest via Angular test runner
- `npm run test:coverage` — run unit tests with coverage
- `npm run lint` — run ESLint and Stylelint checks
- `npm run stylelint:fix` — auto-fix styles
- `npm run prettier:write` — format source files
- `npm run playwright` — run Playwright against the default base URL
- `npm run test:e2e:local:serve` — run local e2e flow with a served app
- `npm run verify:all` — full verification pipeline including lint, tests, build, e2e, and Lighthouse

## Architecture notes
- Routing is composed from route arrays and feature route files, with lazy loading for major areas.
- Auth uses functional guards and a functional HTTP interceptor for bearer tokens, refresh handling, and logout redirects.
- State is signal-first; components and services use signals, linked signals, effects, and toSignal bridges instead of NgRx.
- Data access is centralized in injectable services that wrap HttpClient and map API envelopes to domain models.
- Client caching is opt-in per request through HttpContext tokens and a caching interceptor.
- Components are standalone and declare dependencies in `imports` rather than NgModules.
- Tests commonly use Vitest + Angular TestBed for DI-heavy units and Playwright for browser coverage.
- SSR/prerendering exists for selected routes, but the main app build is configured with SSR disabled.

## Notes for future features
- Prefer standalone components, feature route files, and lazy-loaded route boundaries for new areas.
- Keep API calls inside services; do not scatter HttpClient usage across components.
- Reuse the existing auth interceptor/guards pattern for protected routes and token refresh flows.
- If a request should be cached, opt in explicitly with the existing HttpContext-based caching convention.
- Preserve i18n support for both English and Spanish when adding user-facing text.
- Add or update Vitest specs for logic-heavy code and Playwright specs for user flows or visual regressions.
- Follow the existing formatting/linting stack before committing changes.