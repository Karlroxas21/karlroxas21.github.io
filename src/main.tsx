import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router';
import { AppRoutes } from './routes';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <StrictMode>
            <AppRoutes />
        </StrictMode>
    </HashRouter>
);
