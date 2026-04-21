import { Download } from 'lucide-react';
import { PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

interface Chrome {
    theme: string;
    onToggleTheme: () => void;
    timeStr: string;
}

const Chrome = ({ theme, onToggleTheme, timeStr }: Chrome) => {
    const { trackEvent } = useAnalytics();

    return (
        <div className="chrome">
            <div className="topbar">
                <div className="group">
                    <span className="dot" />
                    <span>
                        {PROFILE.initials} / {PROFILE.role}
                    </span>
                    <a
                        href="files/resume.pdf"
                        download
                        onClick={() => trackEvent('Resume', 'Downloaded my Resume', 'Download Button')}>
                        <Download size={16} />
                    </a>
                </div>
                <div className="group">
                    <span>{PROFILE.location}</span>
                    <span className="num">{timeStr}</span>
                    <span>{PROFILE.status}</span>
                </div>
                <div className="group">
                    <button
                        className="theme-toggle"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        data-theme={theme}>
                        <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
                        <span className="pill" />
                    </button>
                </div>
            </div>
            <div className="botbar">
                <div className="group">
                    <span>© 2026 {PROFILE.name}</span>
                </div>
                <div className="group">
                    <span>v 01.00</span>
                    <span>Set in Archivo / IBM Plex</span>
                </div>
                <div className="group">
                    <a href="#contact">Get in touch →</a>
                </div>
            </div>
        </div>
    );
};

export default Chrome;
