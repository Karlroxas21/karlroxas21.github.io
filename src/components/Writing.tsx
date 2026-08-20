import SectionHead from './SectionHead';
import { POSTS } from './data';
import { useAnalytics } from '../hooks/use-analytics';
import { Link } from 'react-router';

const Writing = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="sec" id="writing">
            <SectionHead icon="✍️" title="Writing" />
            <ul className="bare">
                {POSTS.map((p, i) => (
                    <li className="item" key={i}>
                        <div className="item__top">
                            <h3 className="item__title">
                                <Link
                                    to={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent(`Open Post ${p.title}`, 'Writing', p.link)}>
                                    {p.title}
                                </Link>
                            </h3>
                            <span className="item__yr num">{p.date}</span>
                        </div>
                        <p className="item__desc">
                            {p.tag} · {p.readtime} read
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Writing;
