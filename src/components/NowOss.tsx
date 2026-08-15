import { NOW_ITEMS, REPOS } from './data';
import SectionHead from './SectionHead';
import { useAnalytics } from '../hooks/use-analytics';

const NOW_ICON: Record<string, string> = {
    building: '🔨',
    learning: '📚',
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const NowOss = () => {
    const { trackEvent } = useAnalytics();
    return (
        <>
            <section className="sec" id="now">
                <SectionHead icon="🌱" title="Now" />
                {NOW_ITEMS.map((n, i) => (
                    <div className="callout" key={i}>
                        <span className="ico" aria-hidden="true">
                            {NOW_ICON[n.k] ?? '•'}
                        </span>
                        <p>
                            <strong>{cap(n.k)}</strong> {n.v}. <span className="dim">{n.note}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="sec" id="oss">
                <SectionHead icon="📦" title="Open Source" />
                <ul className="bare">
                    {REPOS.map(r => (
                        <li className="item" key={r.name}>
                            <div className="item__top">
                                <h3 className="item__title">
                                    {r.link ? (
                                        <a
                                            href={r.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackEvent(`Open Repo ${r.name}`, 'OSS', r.link)}>
                                            <span className="co">karlroxas21/</span>
                                            {r.name}
                                        </a>
                                    ) : (
                                        <>
                                            <span className="co">karlroxas21/</span>
                                            {r.name}
                                        </>
                                    )}
                                </h3>
                                <span className="item__yr">{r.lang}</span>
                            </div>
                            <p className="item__desc">{r.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default NowOss;
