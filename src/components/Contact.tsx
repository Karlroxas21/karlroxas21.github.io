import { Link } from 'react-router';
import SectionHead from './SectionHead';
import { LINKS, PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

const Contact = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="section" id="contact">
            <div className="shell g12">
                <SectionHead n="06" title={<>Contact.</>} meta="Let's talk" />
                <div className="contact">
                    <h3 className="contact__big">
                        Say{' '}
                        <a
                            href={`mailto:${PROFILE.email}`}
                            onClick={() => trackEvent('Click Email', 'Contact', 'hello')}>
                            hello
                        </a>
                        ,
                        <br />
                        or{' '}
                        <a
                            href={`mailto:${PROFILE.email}`}
                            onClick={() => trackEvent('Click Email', 'Contact', 'send a letter')}>
                            send a letter
                        </a>
                        .
                    </h3>
                    <div className="contact__rows">
                        {LINKS.filter(k => k.k != 'resume').map(l => (
                            <>
                                {l.k !== 'writing' ? (
                                    <a
                                        className="contact__row"
                                        target="_blank"
                                        key={l.k}
                                        href={l.href}
                                        onClick={() => trackEvent(`Click ${l.k}`, 'Contact Links', l.href)}>
                                        <span className="k">{l.k}</span>
                                        <span className="v">{l.v}</span>
                                        <span className="arrow">↗</span>
                                    </a>
                                ) : (
                                    <Link
                                        className="contact__row"
                                        key={l.k}
                                        to={`${l.href}`}
                                        onClick={() => trackEvent(`Click ${l.k}`, 'Contact Links', l.href)}>
                                        <span className="k">{l.k}</span>
                                        <span className="v">{l.v}</span>
                                        <span className="arrow">↗</span>
                                    </Link>
                                )}
                            </>
                        ))}
                        {LINKS.filter(k => k.k === 'resume').map(l => (
                            <a
                                className="contact__row"
                                key={l.k}
                                href={l.href}
                                download
                                onClick={() => trackEvent('Download Resume', 'Contact Links', 'Contact Row')}>
                                <span className="k">{l.k}</span>
                                <span className="v">{l.v}</span>
                                <span className="arrow">↗</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
