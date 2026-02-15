export type SystemTheme = 'light' | 'dark';

export const getSystemTheme = (): SystemTheme => {
    if (typeof window === 'undefined') return 'light'; // Default for SSR
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
        // Fallback for older browsers (optional, but good for robust support)
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }
};
