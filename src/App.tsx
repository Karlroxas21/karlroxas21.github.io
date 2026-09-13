import { useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';
import { useTheme } from './providers/theme-context';
import { useAnalytics } from './hooks/use-analytics';
import Chrome from './components/Chrome';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Services from './components/Services';
import Writing from './components/Writing';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import FootEnd from './components/FootEnd';
import NowOss from './components/NowOss';

const GA_ID = import.meta.env.VITE_G_ID as string | undefined;
if (GA_ID) ReactGA.initialize(GA_ID);

const App = () => {
    const { theme, toggleTheme } = useTheme();
    const { trackPageview } = useAnalytics();
    const location = useLocation();
    const fullPath = location.pathname + location.hash;

    useEffect(() => {
        if (GA_ID) trackPageview(fullPath);
    }, [fullPath, trackPageview]);

    return (
        <>
            <ChatBot />
            <Chrome theme={theme} onToggleTheme={toggleTheme} />
            <div className="page">
                <main>
                    <Hero />
                    <About />
                    <Work />
                    <Services />
                    <Writing />
                    <Experience />
                    <Skills />
                    <Education />
                    <Publications />
                    <Certifications />
                    <NowOss />
                    <Contact />
                    <FootEnd />
                </main>
            </div>
        </>
    );
};

export default App;
