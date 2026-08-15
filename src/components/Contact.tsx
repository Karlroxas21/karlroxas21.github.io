import { Link } from 'react-router';
import SectionHead from './SectionHead';
import { LINKS, PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

const LABELS: Record<string, string> = {
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Résumé',
};
const ORDER = ['email', 'github', 'linkedin', 'resume'];

const Contact = () => {
    const { trackEvent } = useAnalytics();
    const rows = ORDER.map(k => LINKS.find(l => l.k === k)).filter((l): l is (typeof LINKS)[number] => !!l);

    return (
        <section className="sec" id="contact">
            <SectionHead icon="✉️" title="Contact" />
            <p className="lede" style={{ marginBottom: 18 }}>
                Say{' '}
                <a href={`mailto:${PROFILE.email}`} onClick={() => trackEvent('Click Email', 'Contact', 'hello')}>
                    hello
                </a>
                .
            </p>
            <div className="kv">
                {rows.map(l => (
                    <div className="contents" key={l.k}>
                        <div className="k">{LABELS[l.k] ?? l.k}</div>
                        <div className="v">
                            {l.href.startsWith('#') ? (
                                <Link to={l.href} onClick={() => trackEvent(`Click ${l.k}`, 'Contact Links', l.href)}>
                                    {l.v}
                                </Link>
                            ) : l.k === 'resume' ? (
                                <a
                                    href={l.href}
                                    download
                                    onClick={() => trackEvent(`Click ${l.k}`, 'Contact Links', l.href)}>
                                    {l.v}
                                </a>
                            ) : (
                                <a
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent(`Click ${l.k}`, 'Contact Links', l.href)}>
                                    {l.v}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contact;
