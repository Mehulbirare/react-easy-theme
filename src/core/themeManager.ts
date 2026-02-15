import { ThemeVariables } from '../types/theme.types';

export const applyTheme = (
    theme: string, // 'light' | 'dark' | 'custom'
    resolvedTheme: 'light' | 'dark', // Actual resolved visual theme based on system preference if 'system' is selected
    themes: Record<string, ThemeVariables>,
    enableTransition: boolean = false,
    syncWithTailwind: boolean = false
) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Apply CSS Variables
    const themeVars = themes[resolvedTheme] || {};
    Object.entries(themeVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    // Handle Transitions
    if (enableTransition) {
        root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
        // Remove transition after it completes to avoid performance hit on other changes? 
        // Usually keeping it is fine if scoped to specific properties.
    } else {
        root.style.removeProperty('transition');
    }

    // Tailwind Dark Mode Class Strategy
    if (syncWithTailwind) {
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }

    // Set color-scheme for native browser UI (scrollbars, etc.)
    root.style.colorScheme = resolvedTheme;
};
