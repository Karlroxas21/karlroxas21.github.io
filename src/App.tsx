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

gsap.registerPlugin(Draggable);

const App = () => {
    const location = useLocation();
    const isBlogs = location.pathname.startsWith('/blogs');

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
