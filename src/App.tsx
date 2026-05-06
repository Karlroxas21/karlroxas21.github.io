import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';
import { useTheme } from './providers/theme-context';
import { useAnalytics } from './hooks/use-analytics';
import Chrome from './components/Chrome';
import Cursor from './components/Cursor';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Writing from './components/Writing';
import Experience from './components/Experience';
import Contact from './components/Contact';
import FootEnd from './components/FootEnd';
import NowOss from './components/NowOss';

const GA_ID = import.meta.env.VITE_G_ID as string | undefined;
if (GA_ID) ReactGA.initialize(GA_ID);

const App = () => {
    const [timeStr, setTimeStr] = useState('');
    const { theme, toggleTheme } = useTheme();
    const { trackPageview } = useAnalytics();
    const location = useLocation();
    const fullPath = location.pathname + location.hash;

    useEffect(() => {
        function tick() {
            const d = new Date();
            const hh = String(d.getHours()).padStart(2, '0');
            const mm = String(d.getMinutes()).padStart(2, '0');
            const ss = String(d.getSeconds()).padStart(2, '0');
            setTimeStr(`${hh}:${mm}:${ss}`);
        }
        tick();
        const t = setInterval(tick, 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        if (GA_ID) trackPageview(fullPath);
    }, [fullPath, trackPageview]);

    return (
        <>
            <Cursor />
            <ChatBot />
            <Chrome theme={theme} onToggleTheme={toggleTheme} timeStr={timeStr} />
            <main>
                <Hero />
                <About />
                <Work />
                <Writing />
                <Experience />
                <NowOss />
                <Contact />
                <FootEnd />
            </main>
        </>
    );
};

export default App;
