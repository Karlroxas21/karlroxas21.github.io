import { Routes, Route } from 'react-router';

import App from './App.tsx';
import Blog from './pages/Blog.tsx';
import { NotFound } from './pages/NotFound.tsx';
import RainyDays from './pages/RainyDays.tsx';
import PowerFlex from './pages/PowerFlex.tsx';
import Mmg from './pages/Mmg.tsx';
import MmgAdmin from './pages/MmgAdmin.tsx';
import MmgCourts from './pages/MmgCourts.tsx';
import MmgTrainers from './pages/MmgTrainers.tsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="blogs/:title" element={<Blog />} />
            <Route path="/rainydays" element={<RainyDays />} />
            <Route path="/powerflex" element={<PowerFlex />} />
            <Route path="/mmg" element={<Mmg />} />
            <Route path="/mmg/admin" element={<MmgAdmin />} />
            <Route path="/mmg/courts" element={<MmgCourts />} />
            <Route path="/mmg/trainers" element={<MmgTrainers />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
