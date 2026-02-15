export type ThemeVariables = Record<string, string>;

export type ThemeName = 'light' | 'dark' | 'system' | string;

export interface ThemeContextProps {
    theme: ThemeName;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: ThemeName) => void;
    toggleTheme: () => void;
    themes: Record<string, ThemeVariables>;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: ThemeName;
    themes?: Record<string, ThemeVariables>;
    storageKey?: string;
    enableTransition?: boolean;
    syncWithTailwind?: boolean;
    /**
     * Optional initial theme for SSR to avoid hydration mismatch if known.
     * Usually not needed if script injection is used.
     */
    forcedTheme?: ThemeName;
}
