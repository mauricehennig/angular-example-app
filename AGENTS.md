## Projekt-Überblick
Angular Example App ist ein realitätsnahes Angular-Starterprojekt für Lernen, Produktivität und Skalierung. Es demonstriert Best Practices wie Standalone Components, Signals, Routing, i18n, Authentifizierung, responsive UI und eine saubere, modulare Struktur. Das Projekt ist auf Produktionsnähe ausgelegt und enthält E2E-, Visual-, Accessibility- und Lighthouse-Prüfungen.

## Tech-Stack
- Sprache: TypeScript, HTML, SCSS
- Framework: Angular 21
- UI: Shoelace Components, Angular Animations, NgOptimizedImage
- Tests: Vitest für Unit-Tests, Playwright für E2E
- Lint/Format: ESLint, Stylelint, Prettier
- Weitere Tools: Angular CLI/Build, Knip, Husky, standard-version
- Laufzeit: Node >=22.19 <24, npm >=9
- i18n: Englisch und Spanisch

## Verzeichnisstruktur
- `src/app/` – Anwendungscode mit Root-Komponenten, App-Konfiguration und Routing; enthält `core`, `features` und `shared`.
- `src/environments/` – Umgebungs-Konfigurationen für verschiedene Builds.
- `src/locale/` – Übersetzungsdateien und i18n-Artefakte.
- `src/styles/` – Globale Styles, Basis- und Komponenten-Styles.
- `public/` – Statische Assets.
- `e2e/` – Playwright-End-to-End-Tests mit `fixtures`, `pages` und `tests`.
- `scripts/` – Hilfsskripte für Build-/E2E-/Lighthouse-Abläufe.

## Build & Test
- Abhängigkeiten installieren: `npm i`
- Dev-Server starten: `npm start`
- Spanische Lokalisierung starten: `npm run start:es`
- Build: `npm run build`
- Lint: `npm run lint`
- Stylelint prüfen: `npm run stylelint:check`
- Stylelint fixen: `npm run stylelint:fix`
- Unit-Tests: `npm run test`
- Unit-Tests mit Coverage: `npm run test:coverage`
- E2E lokal mit Server: `npm run test:e2e:local:serve`
- Playwright direkt: `npm run playwright`
- Visual Tests: `npm run test:visual`
- Accessibility Tests: `npm run test:accessibility`
- Smoke Tests lokal: `npm run test:smoke:local`
- Vollständige Verifikation: `npm run verify:all`
- Lighthouse-Check: `npm run lighthouse`

## Architektur-Notizen
- Die App trennt Client- und Server-Einstiegspunkte über `main.ts` und `main.server.ts` sowie `app.config.ts` und `app.config.server.ts`.
- Routing ist separat in `app.routes.ts` und `app.routes.server.ts` organisiert.
- Die Struktur folgt einem `core`/`shared`/`features`-Ansatz; neue Funktionalität gehört in der Regel in `features`, wiederverwendbare Bausteine in `shared`, Infrastruktur in `core`.
- Das Projekt ist streng typisiert (`strict`, `strictTemplates`, `strictStandalone`) und nutzt moderne Angular-Konventionen wie Standalone-Komponenten und OnPush.
- Lokalisierung ist Teil des Build-Setups; Änderungen an Texten müssen immer mit den i18n-Artefakten abgeglichen werden.

## Hinweise für künftige Features
- Neue UI-Logik möglichst als Standalone-Komponenten und mit klarer Trennung zwischen Feature-, Shared- und Core-Code umsetzen.
- Bei Änderungen an Texten, Routen oder Seiten immer die i18n-Ausgabe und die lokalen Sprachvarianten mitdenken.
- E2E-Tests sind Teil der Qualitätskette; neue User-Flows sollten mit Playwright-Tests abgesichert werden.
- Styles folgen globalen SCSS-Strukturen; neue Styles möglichst in die vorhandenen Basis-/Komponentenbereiche einordnen und nicht ungeordnet in Komponenten verteilen.
- Vor größeren Änderungen die Verifikationskette beachten: Lint, Tests, Build und bei relevanten UI-Änderungen auch Visual-/Accessibility-/Lighthouse-Prüfungen.
- Build-Varianten für lokale Sprache, Produktion und Lighthouse sind bereits definiert; neue Features sollten diese Konfigurationen nicht unbeabsichtigt brechen.
