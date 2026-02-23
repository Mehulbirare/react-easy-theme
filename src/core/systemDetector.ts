export type SystemTheme = 'light' | 'dark';

export const getSystemTheme = (): SystemTheme => {
    if (typeof window === 'undefined') return 'light'; // Default for SSR
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const subscribeToSystemTheme = (callback: (theme: SystemTheme) => void): () => void => {
    if (typeof window === 'undefined') return () => { };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
        callback(e.matches ? 'dark' : 'light');
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }
};

export const subscribeToReducedMotion = (callback: (reduce: boolean) => void): () => void => {
    if (typeof window === 'undefined') return () => { };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
        callback(e.matches);
    };

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }
};
