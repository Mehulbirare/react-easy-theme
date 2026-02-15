# @react-easy-theme/core

A zero-configuration, lightweight, fully typed React theme management system. Built for modern web development, designed to "just work" with Next.js, Vite, Create React App, and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@react-easy-theme/core.svg?style=flat-square)](https://www.npmjs.com/package/@react-easy-theme/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

## Features ✨

*   **Zero Dependencies**: Extremely lightweight (< 2kb minified + gzipped).
*   **System Theme Detection**: Automatically respects user's OS preference (`prefers-color-scheme`).
*   **Theme Persistence**: Remembers user choice via `localStorage`.
*   **No Flash (FOUC)**: Optimized to prevent theme flashing on load (script injection supported).
*   **Tailwind Compatible**: Works seamlessly with Tailwind's `dark` class strategy.
*   **CSS Variables**: Fully customizable using native CSS variables for high performance.
*   **Animated Transitions**: Smooth transitions between themes built-in.
*   **Fully Typed**: Written in TypeScript with complete type definitions.

---

## Installation 📦

```bash
npm install @react-easy-theme/core
# or
yarn add @react-easy-theme/core
# or
pnpm add @react-easy-theme/core
```

---

## Quick Start 🚀

### 1. Wrap your application

Wrap your root component with `ThemeProvider`.

```tsx
// src/App.tsx or src/main.tsx
import React from 'react';
import { ThemeProvider } from '@react-easy-theme/core';
import { Layout } from './Layout';

const App = () => {
  return (
    <ThemeProvider
      defaultTheme="system"
      themes={{
        light: {
          '--bg-primary': '#ffffff',
          '--text-primary': '#1a202c',
        },
        dark: {
          '--bg-primary': '#1a202c',
          '--text-primary': '#ffffff',
        },
      }}
    >
      <Layout />
    </ThemeProvider>
  );
};

export default App;
```

### 2. Use the hook

Access the current theme and toggle it anywhere in your app using `useTheme`.

```tsx
// src/components/Header.tsx
import React from 'react';
import { useTheme } from '@react-easy-theme/core';

const Header = () => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  return (
    <header style={{ 
      backgroundColor: 'var(--bg-primary)', 
      color: 'var(--text-primary)' 
    }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  );
};
```

---

## Tailwind CSS Integration 🌊

Reference: [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

1.  Enable "class" strategy in `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Important!
  // ...
}
```

2.  Use standard Tailwind classes:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  This component automatically updates based on the theme!
</div>
```

`react-easy-theme` automatically adds/removes the `dark` class to the `<html>` element when the resolved theme is dark.

---

## Next.js Integration (SSR)

To prevent hydration mismatch warning in Next.js, follow this pattern (especially for App Router):

```tsx
// app/layout.tsx
import { ThemeProvider } from '@react-easy-theme/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

For "no flash of unstyled content" (FOUC) script injection support in older Pages Router, you can use our upcoming helper (roadmap item), or simply rely on `ThemeProvider`'s fast execution at the top of the tree. `react-easy-theme` handles `window` checks gracefully for SSR.

---

## API Documentation 📚

### `<ThemeProvider />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme if no storage found. |
| `themes` | `Record<string, ThemeVariables>` | `{}` | Object mapping theme names to CSS variables. |
| `storageKey` | `string` | `'theme-preference'` | Key used for `localStorage`. |
| `enableTransition` | `boolean` | `true` | Enables smooth CSS transition on change. |
| `syncWithTailwind` | `boolean` | `true` | Toggles `dark` class on `<html>`. |

### `useTheme()` Return Values

| Value | Type | Description |
| :--- | :--- | :--- |
| `theme` | `'light' \| 'dark' \| 'system'` | The user's selected preference. |
| `resolvedTheme` | `'light' \| 'dark'` | The active theme (resolves 'system'). |
| `setTheme` | `(t: string) => void` | Updates standard theme preference. |
| `toggleTheme` | `() => void` | Toggles between light/dark. |
| `themes` | `Record` | The themes object passed to Provider. |

---

## Comparison 🆚

| Feature | React Easy Theme | Styled Components | Chakra UI |
| :--- | :--- | :--- | :--- |
| **Size** | **< 2kb** | ~12kb | ~100kb+ |
| **Approach** | CSS Variables + Native | CSS-in-JS Runtime | Component Library |
| **Build Setup** | Zero Config | Requires Babel plugin | Requires Setup |
| **SSR Support** | ✅ Built-in | ✅ Needs setup | ✅ Needs setup |
| **Tailwind** | ✅ First-class | ❌ Separate | ❌ Separate |

**Why choose React Easy Theme?**
If you want lightweight performance and prefer standard CSS/Tailwind over heavy JS runtime styling solutions, this is for you. It separates *theme logic* from *styling implementation*, giving you maximum flexibility.

---

## Roadmap 🗺️

1.  Add support for `custom` themes beyond just variable injection.
2.  Create a dedicated Next.js `<Script />` component for perfectly reliable anti-flicker.
3.  Add `useMedia` hook for responsive designs within JS.

---

## License

MIT © [Mehul](https://github.com/mehul)
