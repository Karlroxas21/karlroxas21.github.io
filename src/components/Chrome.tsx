import { Download } from 'lucide-react';
import { PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';
import { Link } from 'react-router';

interface Chrome {
    theme: string;
    onToggleTheme: () => void;
    timeStr: string;
}

const barBase =
    'fixed inset-x-0 z-50 flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.14em] uppercase backdrop-blur-[6px] font-[family-name:var(--font-label)] text-[var(--color-fg-3)] px-4 pr-24 py-[10px] md:px-[var(--pad-x)] md:py-[14px]';

const Chrome = ({ theme, onToggleTheme, timeStr }: Chrome) => {
    const { trackEvent } = useAnalytics();

    return (
        <>
            <header
                className={`${barBase} top-0 border-b border-[var(--color-hairline)]`}
                style={{
                    background:
                        'linear-gradient(var(--color-bg), color-mix(in oklab, var(--color-bg) 85%, transparent))',
                }}>
                <div className="flex items-center gap-3 md:gap-[22px] min-w-0 overflow-hidden">
                    <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-fg)] shrink-0" />
                    <span className="truncate">
                        {PROFILE.initials}
                        <span className="hidden md:inline"> / {PROFILE.role}</span>
                    </span>
                    <a
                        href="files/resume.pdf"
                        download
                        className="shrink-0 border-b border-dotted border-transparent hover:border-[var(--color-fg)]"
                        onClick={() => trackEvent('Resume', 'Downloaded my Resume', 'Download Button')}>
                        <Download size={16} />
                    </a>
                </div>

                <div className="hidden md:flex items-center gap-[22px] absolute left-1/2 -translate-x-1/2">
                    <span>{PROFILE.location}</span>
                    <span className="num">{timeStr}</span>
                    <span>{PROFILE.status}</span>
                </div>

                <button
                    className="theme-toggle shrink-0"
                    onClick={() => {
                        trackEvent('Toggle Theme', 'Chrome', theme === 'dark' ? 'dark→light' : 'light→dark');
                        onToggleTheme();
                    }}
                    aria-label="Toggle theme"
                    data-theme={theme}>
                    <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
                    <span className="pill" />
                </button>
            </header>

            <footer
                className={`${barBase} bottom-0 border-t border-[var(--color-hairline)]`}
                style={{
                    background:
                        'linear-gradient(color-mix(in oklab, var(--color-bg) 85%, transparent), var(--color-bg))',
                }}>
                <div className="flex items-center gap-3 md:gap-[22px] min-w-0 overflow-hidden">
                    <span className="truncate">© 2026 {PROFILE.name}</span>
                </div>

                <div className="hidden md:flex items-center gap-[22px] absolute left-1/2 -translate-x-1/2">
                    <span>v 01.00</span>
                    <span>Set in Archivo / IBM Plex</span>
                </div>

                <Link
                    to="#contact"
                    className="shrink-0 border-b border-dotted border-transparent hover:border-[var(--color-fg)]"
                    onClick={() => trackEvent('Click Get In Touch', 'Chrome', 'Footer CTA')}>
                    Get in touch →
                </Link>
            </footer>
        </>
    );
};

export default Chrome;
