import { NOW_ITEMS, REPOS } from './data';
import SectionHead from './SectionHead';
import { useAnalytics } from '../hooks/use-analytics';

const NowOss = () => {
    const { trackEvent } = useAnalytics();
    return (
        <section className="section" id="now">
            <div className="shell g12">
                <SectionHead n="05" title={<>Now &amp; open source.</>} meta="Updated Apr 18" />
                <div className="now-oss">
                    <div className="panel">
                        <div className="panel__head">
                            <h3>Now</h3>
                            <span className="label">What I'm up to</span>
                        </div>
                        <div className="now__list">
                            {NOW_ITEMS.map(n => (
                                <div className="now__item" key={n.k}>
                                    <span className="k">{n.k}</span>
                                    <span className="v">
                                        {n.v}
                                        <small>{n.note}</small>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel__head">
                            <h3>Open source</h3>
                            <span className="label">Selected repositories</span>
                        </div>
                        <div>
                            {REPOS.map(r => (
                                <a
                                    className="repo"
                                    href={r.link}
                                    target="_blank"
                                    key={r.name}
                                    onClick={() => trackEvent(`Open Repo ${r.name}`, 'OSS', r.link)}>
                                    <div className="repo__name">
                                        <span className="o">karlroxas21/</span>
                                        {r.name}
                                    </div>
                                    <div className="repo__lang">{r.lang}</div>
                                    <div className="repo__desc">{r.desc}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NowOss;
