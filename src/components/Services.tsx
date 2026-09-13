import SectionHead from './SectionHead';
import { SERVICES, PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

const Services = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="sec" id="services">
            <SectionHead icon="🤝" title="Services" />
            <p className="dim">
                Available for contract and freelance work, remote or hybrid from Taguig. Below is what I take on.
            </p>
            <ul className="bare">
                {SERVICES.map(s => (
                    <li className="item" key={s.n}>
                        <div className="item__top">
                            <h3 className="item__title">{s.title}</h3>
                            <span className="item__yr num">{s.n}</span>
                        </div>
                        <p className="item__desc">{s.desc}</p>
                        <ul className="item__list">
                            {s.includes.map(i => (
                                <li key={i}>{i}</li>
                            ))}
                        </ul>
                        <div className="chips">
                            {s.stack.map(t => (
                                <span className="chip" key={t}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="callout">
                <span className="ico" aria-hidden="true">
                    ✦
                </span>
                <p>
                    <strong>Got something that fits?</strong>{' '}
                    <span className="dim">
                        Tell me the scope and the deadline at{' '}
                        <a
                            href={`mailto:${PROFILE.email}`}
                            onClick={() => trackEvent('Click Services Email', 'Services', 'inquiry')}>
                            {PROFILE.email}
                        </a>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Services;
