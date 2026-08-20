import SectionHead from './SectionHead';
import { PROJECTS } from './data';
import { useAnalytics } from '../hooks/use-analytics';
import { Link } from 'react-router';

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
                                {p.link ? (
                                    <Link
                                        to={p.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackEvent(`Click Project ${p.title}`, 'Work', p.n)}>
                                        {p.title}
                                    </Link>
                                ) : (
                                    p.title
                                )}
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
