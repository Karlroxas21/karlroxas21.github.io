import { useEffect, useState } from 'react';
import { useTheme } from './providers/theme-context';
import Chrome from './components/Chrome';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Writing from './components/Writing';
import Experience from './components/Experience';
import Contact from './components/Contact';
import FootEnd from './components/FootEnd';
import NowOss from './components/NowOss';

const App = () => {
    const [timeStr, setTimeStr] = useState('');

    const { theme, toggleTheme } = useTheme();

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

    return (
        <>
            <Cursor />
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
