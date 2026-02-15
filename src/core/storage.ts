export const STORAGE_KEY = 'theme-preference';

export const getStorageTheme = (key: string = STORAGE_KEY): string | null => {
    if (typeof window === 'undefined') return null;
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
        return null;
    }
};

export const setStorageTheme = (key: string = STORAGE_KEY, theme: string): void => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, theme);
    } catch (e) {
        console.warn('LocalStorage is not available:', e);
    }
};
