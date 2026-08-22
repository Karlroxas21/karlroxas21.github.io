import type { ReactNode } from 'react';
import SectionHead from './SectionHead';
import { PROJECTS } from './data';
import { useAnalytics } from '../hooks/use-analytics';
import { Link } from 'react-router';

const ExtIcon = () => (
    <svg
        className="ext"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');

const ProjectTitle = ({ href, label, onOpen }: { href: string; label: string; onOpen: () => void }) => {
    if (!href) return <>{label}</>;

    const body: ReactNode = (
        <>
            {label}
            <ExtIcon />
        </>
    );
    const shared = {
        target: '_blank',
        rel: 'noopener noreferrer',
        onClick: onOpen,
        'aria-label': `${label} (opens in a new tab)`,
    };

    return isExternal(href) ? (
        <a href={href} {...shared}>
            {body}
        </a>
    ) : (
        <Link to={href} {...shared}>
            {body}
        </Link>
    );
};

const Work = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="sec" id="work">
            <SectionHead icon="🛠️" title="Selected Work" />
            <ul className="bare">
                {PROJECTS.map(p => (
                    <li className="item" key={p.n}>
                        <div className="item__top">
                            <h3 className="item__title">
                                <ProjectTitle
                                    href={p.link}
                                    label={p.title}
                                    onOpen={() => trackEvent(`Click Project ${p.title}`, 'Work', p.n)}
                                />
                            </h3>
                            <span className="item__yr num">{p.year}</span>
                        </div>
                        <p className="item__desc">{p.desc}</p>
                        <div className="chips">
                            {p.tags.map(t => (
                                <span className="chip" key={t}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Work;
