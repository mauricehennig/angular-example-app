## Project overview
Angular Example App is a real-world starter application that demonstrates how to build a production-style Angular product with routing, authentication, i18n, Pokémon browsing, and quality tooling. It is designed as both a learning resource and a scalable base for new features. The app ships with a live demo, a real backend integration, and a strong focus on maintainable frontend architecture.

## Tech stack
- TypeScript 5.9
- Angular 21 with standalone components, signals, routing, and SSR support
- SCSS styling with Shoelace web components
- Vitest for unit tests and Playwright for end-to-end tests
- ESLint, Stylelint, Prettier, Husky, lint-staged, Knip, and commitlint
- Angular CLI build system and Angular localize for i18n
- Backend integration with a NestJS API, PostgreSQL, and Prisma

## Directory layout
- `src/` — main Angular application source code
- `src/app/` — app shell, core services, shared UI, and feature areas
- `src/app/core/` — cross-cutting services, interceptors, tokens, and providers
- `src/app/features/` — route-level feature areas such as auth, home, pokemon, user, and error pages
- `src/app/shared/` — reusable components, directives, and UI helpers
- `src/environments/` — environment-specific configuration values
- `src/locale/` — translation catalogs and locale wiring
- `src/styles/` — global SCSS, design tokens, and component style partials
- `public/` — static assets served as-is
- `e2e/` — Playwright page objects, fixtures, and specs
- `scripts/` — helper scripts for E2E and Lighthouse workflows
- `.github/` — repository automation and templates

## Build & test
- `npm i` — install dependencies
- `npm start` — run the app locally with the default English localhost configuration
- `npm run start:es` — run the app locally with the Spanish localhost configuration
- `npm run lint` — run ESLint and Stylelint checks
- `npm run stylelint:fix` — auto-fix SCSS/CSS style issues
- `npm run test` — run unit tests with Vitest
- `npm run test:coverage` — run unit tests with coverage
- `npm run build` — build the Angular application
- `npm run build:serve` — build and serve the production output locally
- `npm run test:e2e:local:serve` — run Playwright against a locally served build
- `npm run test:visual` — run visual regression tests
- `npm run test:accessibility` — run accessibility tests
- `npm run verify:all` — run lint, tests, build, E2E, and Lighthouse checks

## Architecture notes
The app uses standalone Angular components with `OnPush` change detection and route-level lazy loading. Cross-cutting concerns are centralized in `src/app/core/` through services, interceptors, and injection tokens, while reusable UI lives in `src/app/shared/`. Signals are used heavily for local state, and HTTP behavior is often controlled through functional interceptors and `HttpContextToken` opt-ins.

Authentication is handled with guards plus an interceptor-based token/refresh flow, so components stay thin. Internationalization is built around Angular localize and locale-aware navigation, and theme/cookie/alert concerns are managed by dedicated services that persist state in browser storage when available. Testing follows the same modular structure: unit tests live beside implementation files, and Playwright uses page objects and focused specs for browser coverage.

## Existing features (auto-detected)
- **Lazy-load app routes** — The app splits major areas into separate route bundles and redirects unknown paths to a not-found page. Server routing also prerenders Pokémon detail pages for better first load performance. (anchors: src/app/app.routes.ts, src/app/app.routes.server.ts)
- **Show a dynamic home page** — The home screen presents the landing experience and refreshes live user analytics on an interval. It demonstrates the app's signal-driven data flow and periodic reloading pattern. (anchors: src/app/features/home/home.routes.ts, src/app/features/home/home.component.ts)
- **Register and log in users** — Visitors can create accounts and sign in through dedicated authentication pages. The flow is split into separate route entries for login, registration, and account access. (anchors: src/app/features/authentication/authentication.routes.ts, src/app/features/authentication/pages/log-in/log-in.component.ts, src/app/features/authentication/pages/register/register.component.ts)
- **Protect authenticated areas** — Route guards keep logged-in users out of auth pages and block unauthenticated access to protected content. This keeps the account and user areas aligned with session state. (anchors: src/app/features/authentication/guards/authentication.guard.ts, src/app/features/authentication/guards/no-authentication.guard.ts)
- **Refresh sessions with interceptors** — An HTTP interceptor attaches access tokens, handles refresh-token flow, and reacts to expired sessions. This centralizes auth transport concerns away from components. (anchors: src/app/features/authentication/authentication.interceptor.ts)
- **Browse your caught Pokémon** — Signed-in users get a personal Pokémon list page that shows their captured creatures. The page composes reusable Pokémon card UI for the collection view. (anchors: src/app/features/user/user.routes.ts, src/app/features/user/my-pokemon/pages/my-pokemon/my-pokemon.component.ts, src/app/features/user/my-pokemon/components/pokemon-card/pokemon-card.component.ts)
- **Explore Pokémon details** — The Pokémon detail experience combines a battlefield, Pokédex, image display, and catch animation. It gives the app its main interactive gameplay-style feature. (anchors: src/app/features/pokemon/pokemon.routes.ts, src/app/features/pokemon/pages/pokemon-detail/pokemon-detail.component.ts, src/app/features/pokemon/components/pokemon-battlefield/pokemon-battlefield.component.ts)
- **Search Pokémon from header** — A shared search input lets users look up Pokémon directly from the global header. It trims input, loads results, and surfaces errors through the alert system. (anchors: src/app/shared/components/pokemon-search-input/pokemon-search-input.component.ts, src/app/shared/directives/trim.directive.ts, src/app/core/services/ui/alert.service.ts)
- **Switch app language** — The app supports English and Spanish and can redirect users based on locale-aware navigation. Language selection is exposed through shared header controls. (anchors: src/app/core/services/language.service.ts, src/app/shared/components/language-selector/language-selector.component.ts)
- **Toggle light and dark themes** — Users can switch themes from the shared header, and the selection persists in browser storage. Theme changes update document classes so the whole app responds consistently. (anchors: src/app/core/services/ui/theme-manager.service.ts, src/app/shared/components/theme-button/theme-button.component.ts)
- **Show toast alerts** — The app uses a signal-backed alert service and a toast stack component to display transient notifications. Alerts are created centrally and rendered once per message. (anchors: src/app/core/services/ui/alert.service.ts, src/app/shared/components/toast-stack/toast-stack.component.ts)
- **Handle cookie consent** — A cookie popup stores consent state locally and updates analytics consent when accepted. The component is designed to be safe in browser-only storage environments. (anchors: src/app/core/services/storage/cookie-consent.service.ts, src/app/shared/components/cookie-popup/cookie-popup.component.ts)
- **Manage canonical URLs** — The app sets canonical links from a shared header service to keep SEO metadata consistent across routes. Canonical URLs are built from the configured application domain. (anchors: src/app/core/services/ui/header.service.ts, src/app/core/tokens/environment.token.ts)
- **Cache HTTP responses** — A functional caching interceptor stores selected GET responses in memory and exposes cache clearing for tests. Requests opt in through an HttpContextToken. (anchors: src/app/core/interceptors/caching.interceptor.ts, src/app/core/interceptors/caching.interceptor.spec.ts)
- **Run unit tests with Vitest** — The project uses Vitest for fast unit and component tests with jsdom and shared setup files. Coverage is configured in the Angular workspace and exercised through npm scripts. (anchors: vitest.config.ts, vitest-setup.config.ts, angular.json)
- **Run browser tests with Playwright** — End-to-end coverage includes smoke, accessibility, and visual regression tests in Playwright. The suite uses page objects, snapshots, and a local serve script for repeatable runs. (anchors: playwright.config.ts, e2e/tests, e2e/pages)

## Notes for future features
Prefer standalone Angular components, signals, and route-level lazy loading when adding new UI. Put cross-cutting logic in `src/app/core/`, reusable UI in `src/app/shared/`, and feature-specific code under `src/app/features/`.

When adding HTTP behavior, check whether an existing interceptor or `HttpContextToken` pattern already fits before introducing new service state. For browser-only concerns such as storage, theme, or consent, keep the code resilient when `window` or `localStorage` is unavailable. For new routes, remember to update both client and server route files when prerendering or SSR behavior matters.

Keep translations, tests, and styles close to the feature they support, and follow the existing Playwright page-object pattern for browser coverage. Use the existing npm scripts for verification so new work stays aligned with the repo's quality gates.
