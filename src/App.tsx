import Dock from '@components/Dock';
import Navbar from '@components/Navbar';
import Firefox from '@windows/Firefox';
import Welcome from '@components/Welcome';
import Terminal from '@windows/Terminal';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Resume from '@windows/Resume';
import Files from '@windows/Files';
import TextEditorWindow from '@windows/Text';
import ImageViewerWindow from '@windows/Image';
import ContactWindow from '@windows/Contact';
import ScreenGuard from '@components/ScreenGuard';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

gsap.registerPlugin(Draggable);

const App = () => {
    const gTagId = import.meta.env.VITE_G_ID;
    const location = useLocation();
    // We use HashRouter
    const fullPath = location.pathname + location.hash;
    const isBlogs = fullPath.startsWith('/blogs');

    const MEASUREMENT_ID = gTagId;
    ReactGA.initialize(MEASUREMENT_ID);

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: fullPath, title: fullPath });
    }, [fullPath]);

    return (
        <ScreenGuard>
            <main className={isBlogs ? 'bg-none' : ''}>
                <Navbar />
                <Welcome />
                <Dock />

                <Terminal />
                <Firefox />
                <Resume />
                <Files />
                <TextEditorWindow />
                <ImageViewerWindow />
                <ContactWindow />
            </main>
        </ScreenGuard>
    );
};

export default App;
