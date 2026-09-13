import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router';
import { AppRoutes } from './routes';
import { ThemeProvider } from './providers/ThemeProvider';
import { LocaleProvider } from './providers/LocaleProvider';
import { ScrollToHash } from './utils/ScrollToHash';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <StrictMode>
            <ThemeProvider>
                <LocaleProvider>
                    <AppRoutes />
                    <ScrollToHash />
                </LocaleProvider>
            </ThemeProvider>
        </StrictMode>
    </HashRouter>
);
