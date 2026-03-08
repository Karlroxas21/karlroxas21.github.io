import { Routes, Route } from 'react-router';

import App from './App.tsx';
import Blog from './pages/Blog.tsx';
import { NotFound } from './pages/NotFound.tsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="blogs/:title" element={<Blog />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
