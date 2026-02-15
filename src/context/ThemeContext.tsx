import { createContext } from 'react';
import { ThemeContextProps } from '../types/theme.types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
