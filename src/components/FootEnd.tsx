import { useContent } from '../hooks/use-content';

const FootEnd = () => {
    const { PROFILE } = useContent();
    return (
        <footer className="footend">
            <span>© 2026 {PROFILE.name}</span>
            <span>Built with React · Hosted on GitHub Pages</span>
        </footer>
    );
};

export default FootEnd;
