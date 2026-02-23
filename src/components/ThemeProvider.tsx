import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ThemeName, ThemeVariables, ThemeProviderProps } from '../types/theme.types';
import { getStorageTheme, setStorageTheme } from '../core/storage';
import { getSystemTheme, subscribeToSystemTheme, getReducedMotion, subscribeToReducedMotion } from '../core/systemDetector';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = 'system',
    themes = {},
    storageKey = 'theme-preference',
    enableTransition = true,
    syncWithTailwind = true,
}) => {
    // Initialize state from storage or default
    const [theme, setThemeState] = useState<ThemeName>(() => {
        if (typeof window !== 'undefined') {
            const stored = getStorageTheme(storageKey);
            if (stored && (stored === 'system' || themes[stored] || stored === 'light' || stored === 'dark')) {
                return stored;
            }
        }
        return defaultTheme;
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
        if (theme === 'system') return getSystemTheme();
        return (theme === 'light' || theme === 'dark') ? theme : 'light';
    });

    const [shouldReduceMotion, setShouldReduceMotion] = useState(() => getReducedMotion());

    const [mounted, setMounted] = useState(false);

    // Hydration mismatch handling
    useEffect(() => {
        setMounted(true);
    }, []);

    // System theme listener
    useEffect(() => {
        if (theme === 'system') {
            const updateSystemTheme = () => {
                setResolvedTheme(getSystemTheme());
            };

            const unsubscribe = subscribeToSystemTheme(() => {
                updateSystemTheme(); // Update state on system change
            });

            return () => unsubscribe();
        }
    }, [theme]);

    // Reduced motion listener
    useEffect(() => {
        const unsubscribe = subscribeToReducedMotion((reduce) => {
            setShouldReduceMotion(reduce);
        });

        return () => unsubscribe();
    }, []);

    // Update resolved theme when `theme` state changes
    useEffect(() => {
        if (theme === 'system') {
            setResolvedTheme(getSystemTheme());
        } else {
            // If it's a custom theme name, we might default to 'light' or 'dark' base if not specified
            // For simplicity, let's assume custom themes map to either light or dark base via configuration?
            // Or just default to 'light' for base resolved structure if unknown.
            // However, usually custom themes are just sets of variables.
            // Let's assume for resolvedTheme (which is used for conditional rendering logic often), 
            // we check if the custom theme *name* implies dark/light or just default.
            // A common pattern is to have a `type` property in theme config, but here we just have variables.
            // Let's stick to: if it's not 'dark', it's 'light' unless we add more metadata.
            setResolvedTheme(theme === 'dark' ? 'dark' : 'light');
        }
        setStorageTheme(storageKey, theme);
    }, [theme, storageKey]);

    // Apply theme to DOM
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // 1. Tailwind Class
        if (syncWithTailwind) {
            if (resolvedTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }

        // 2. CSS Variables
        const variables = themes[theme === 'system' ? resolvedTheme : theme] || themes[resolvedTheme] || {};

        // Clear old vars? 
        // Ideally we should but for performance let's just overwrite.
        // If a previous theme had a var that the new one doesn't, it might persist.
        // To fix this propery, we'd need to track injected keys. 
        // For "lightweight", overwriting standard sets is usually enough.
        Object.entries(variables).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // 3. Color Scheme
        root.style.colorScheme = resolvedTheme;

        // 4. Transitions
        if (enableTransition && !shouldReduceMotion) {
            root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        } else {
            root.style.transition = 'none';
        }

    }, [theme, resolvedTheme, themes, mounted, syncWithTailwind, enableTransition, shouldReduceMotion]);

    const setTheme = useCallback((newTheme: ThemeName) => {
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    const value = useMemo(() => ({
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        themes
    }), [theme, resolvedTheme, setTheme, toggleTheme, themes]);

    // Render nothing or loading state until mounted to avoid mismatch? 
    // Renders children immediately but with default/SSR state.
    // The script injection strategy is better for avoiding flash.
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
