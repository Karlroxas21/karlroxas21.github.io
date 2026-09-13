import { useContent } from '../hooks/use-content';
import { useLocale } from '../providers/locale-context';
import { LOCALES, LOCALE_LABELS, type Locale } from '../locales';
import { useAnalytics } from '../hooks/use-analytics';

interface Chrome {
    theme: string;
    onToggleTheme: () => void;
}

const Chrome = ({ theme, onToggleTheme }: Chrome) => {
    const { PROFILE } = useContent();
    const { locale, setLocale } = useLocale();
    const { trackEvent } = useAnalytics();

    return (
        <header className="topbar">
            <div className="topbar__inner">
                <span className="brand">
                    <span className="brand__dot" />
                    {PROFILE.initials}
                </span>

                <div className="topbar__actions">
                    <select
                        className="lang-toggle"
                        value={locale}
                        onChange={e => {
                            const next = e.target.value as Locale;
                            trackEvent('Change Language', 'Chrome', `${locale}→${next}`);
                            setLocale(next);
                        }}
                        aria-label="Language">
                        {(Object.keys(LOCALES) as Locale[]).map(l => (
                            <option key={l} value={l}>
                                {LOCALE_LABELS[l]}
                            </option>
                        ))}
                    </select>

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
            </div>
        </header>
    );
};

export default Chrome;
