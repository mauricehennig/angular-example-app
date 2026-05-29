## Projekt-Überblick
Dieses Repository ist eine realitätsnahe Angular-Referenzanwendung mit Fokus auf Lernbarkeit, Produktivität und Skalierbarkeit. Die App demonstriert moderne Angular-Patterns wie Standalone Components, Signals, Routing, i18n, Authentifizierung und SSR-nahe Konfigurationen. Zusätzlich sind Qualitätswerkzeuge, E2E-Tests und Performance-Checks integriert, sodass Features in einer produktionsnahen Struktur entwickelt werden können.

## Tech-Stack
- Sprache: TypeScript, HTML, SCSS, etwas JavaScript für Tooling
- Framework: Angular 21 mit Standalone API, Routing, Hydration/i18n-Support
- Tests: Vitest für Unit/Component-Tests, Playwright für E2E/Visual/A11y
- Linting/Formatierung: ESLint, Stylelint, Prettier
- Build/Tooling: Angular CLI, Knip, Husky, standard-version
- Hosting/Runtime-Hinweise: statische Redirects in `public/`, SSR-Dateien vorhanden, Build aber clientseitig konfiguriert

## Verzeichnisstruktur
- `src/` — eigentliche Angular-App mit `app/`, `core/`, `features/`, `shared/`, `locale/`, `styles/`
- `e2e/` — Playwright-Tests mit Page Objects, Fixtures, Visual- und Accessibility-Spezifikationen
- `public/` — statische Dateien wie `_redirects` und `robots.txt`
- `scripts/` — Automatisierung für E2E- und Lighthouse-Workflows
- `.github/` — Issue-Templates und Community-Dateien
- `.husky/` — Git-Hooks für Qualitätschecks

## Build & Test
- `npm i`
- `npm start`
- `npm run build`
- `npm run build:serve`
- `npm run lint`
- `npm run stylelint:check`
- `npm run prettier:write`
- `npm run test`
- `npm run test:coverage`
- `npm run playwright`
- `npm run test:e2e:local:serve`
- `npm run test:visual`
- `npm run test:accessibility`
- `npm run verify:test`
- `npm run verify:all`
- `npm run lighthouse`

## Architektur-Notizen
- Die App ist feature-orientiert aufgebaut: fachliche Bereiche liegen unter `src/app/features/`, Infrastruktur unter `src/app/core/`, wiederverwendbare Bausteine unter `src/app/shared/`.
- Routing ist lazy-loaded organisiert; Feature-Routen werden als eigene `*.routes.ts`-Dateien exportiert und in `app.routes.ts` eingebunden.
- Guards sind funktional implementiert und nutzen `inject(...)`; geschützte Bereiche verwenden `canMatch`, Login-/Register-Seiten oft `canActivate`.
- Authentifizierung basiert auf Tokens, Interceptor-Logik und einem Signal-basierten Auth-State; Refresh-Handling ist zentralisiert.
- Komponenten sind Standalone und werden direkt über `imports` eingebunden, nicht über NgModules.
- i18n-Texte werden zentral über `src/locale/translations.ts` gepflegt und per `$localize` bereitgestellt.
- Tests folgen dem Standalone-TestBed-Pattern; E2E nutzt Page Objects und Fixtures.

## Hinweise für künftige Features
- Neue Features immer als eigenen Ordner unter `src/app/features/<feature>/` anlegen und eine eigene `*.routes.ts`-Datei mitbringen.
- Wiederverwendbare UI, Pipes, Direktiven und Validatoren gehören nach `src/app/shared/`; Infrastruktur wie Interceptors, Tokens und Services nach `src/app/core/`.
- Für Auth- oder Routing-Erweiterungen bestehende Constants, Guards und Interceptor-Flows erweitern statt Logik zu duplizieren.
- Neue Texte nicht hardcoden, sondern in `src/locale/translations.ts` ergänzen.
- Bei Tests Standalone-Komponenten direkt importieren und vorhandene Test-Patterns übernehmen.
- Vor größeren Änderungen die vorhandenen Qualitäts-Commands laufen lassen, da Lint, Tests, E2E und Lighthouse getrennt abgesichert sind.