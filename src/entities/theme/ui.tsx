import { themeStore } from '@/entities/theme';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = observer(({ children }: ThemeProviderProps) => {
  const { theme } = themeStore;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return children;
});
