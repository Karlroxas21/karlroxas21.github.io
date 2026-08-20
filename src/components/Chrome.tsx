import { PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

interface Chrome {
    theme: string;
    onToggleTheme: () => void;
}

const Chrome = ({ theme, onToggleTheme }: Chrome) => {
    const { trackEvent } = useAnalytics();

    return (
        <header className="topbar">
            <div className="topbar__inner">
                <span className="brand">
                    <span className="brand__dot" />
                    {PROFILE.initials}
                </span>

                <button
                    className="theme-toggle"
                    onClick={() => {
                        trackEvent('Toggle Theme', 'Chrome', theme === 'dark' ? 'dark→light' : 'light→dark');
                        onToggleTheme();
                    }}
                    aria-label="Toggle theme"
                    data-theme={theme}>
                    <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    <span className="pill" />
                </button>
            </div>
        </header>
    );
};

export default Chrome;
