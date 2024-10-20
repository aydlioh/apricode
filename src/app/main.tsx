import { ThemeProvider } from '@/entities/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './router.tsx';
import '@fontsource-variable/jetbrains-mono';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
