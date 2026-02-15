import React from 'react';
import { useTheme } from '../hooks/useTheme';

export const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid currentColor',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
            }}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
};
