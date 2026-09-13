import SectionHead from './SectionHead';
import { PUBLICATIONS, PROFILE } from './data';
import { useAnalytics } from '../hooks/use-analytics';

const Publications = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="sec" id="publications">
            <SectionHead icon="📄" title="Publications" />
            <ul className="bare">
                {PUBLICATIONS.map(p => (
                    <li className="item" key={p.doi}>
                        <div className="item__top">
                            <h3 className="item__title">
                                <a
                                    href={`https://doi.org/${p.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent(`Open Publication ${p.venue}`, 'Publications', p.doi)}>
                                    {p.title}
                                </a>
                            </h3>
                            <span className="item__yr num">
                                {p.venue} {p.year}
                            </span>
                        </div>
                        <p className="item__desc">
                            {p.authors.map((a, i) => (
                                <span key={a}>
                                    {a === PROFILE.name ? <em>{a}</em> : a}
                                    {i < p.authors.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>
                        <p className="item__desc dim">{p.summary}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Publications;
