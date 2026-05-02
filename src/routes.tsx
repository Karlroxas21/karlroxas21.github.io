import { Routes, Route } from 'react-router';

import App from './App.tsx';
import Blog from './pages/Blog.tsx';
import { NotFound } from './pages/NotFound.tsx';
import RainyDays from './pages/RainyDays.tsx';
import PowerFlex from './pages/PowerFlex.tsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="blogs/:title" element={<Blog />} />
            <Route path="/rainydays" element={<RainyDays />} />
            <Route path="/powerflex" element={<PowerFlex />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
