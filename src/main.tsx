import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes';

// Handle GitHub Pages 404 redirects
const redirect = sessionStorage.redirect;
if (redirect) {
    delete sessionStorage.redirect;
    window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <AppRoutes />
        </StrictMode>
    </BrowserRouter>
);
