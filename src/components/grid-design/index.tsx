import { useEffect, useState } from 'react';
import { useTheme } from '../../providers/theme-context';
import Chrome from './Chrome';
import Cursor from './Cursor';
import Hero from './Hero';
import About from './About';
import Work from './Work';
import Writing from './Writing';
import Experience from './Experience';
import Contact from './Contact';
import FootEnd from './FootEnd';
import NowOss from './NowOss';

const Index = () => {
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

export default Index;
