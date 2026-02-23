# Roadmap 🗺️

## Phase 1: Core Foundation (Done)
- [x] Theme system with React Context
- [x] LocalStorage persistence
- [x] System theme detection
- [x] Tailwind compatibility
- [x] CSS Variables injection
- [x] Zero external dependencies
- [x] Basic TypeScript support

## Phase 2: Advanced Features (Q2 2026)
- [ ] **Next.js Script Component**: A dedicated `<Script />` component for Next.js App Router to eliminate FOUC completely.
- [ ] **Custom Theme Definition**: Allow users to pass a function to generate themes dynamically (e.g. based on a base color).
- [ ] **Scoped Theming**: Ability to nest `ThemeProvider` and have component-level theme overrides.
- [x] **Reduced Motion**: Respect `prefers-reduced-motion` for transitions.
- [ ] **SSR Utilities**: `getServerSideTheme` helper for reading cookies if needed.

## Phase 3: Ecosystem (Q3 2026)
- [ ] **Storybook**: Add examples component library.
- [ ] **Playground**: Online playground to test theme switching live.
