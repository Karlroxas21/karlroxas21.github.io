import { useContent } from '../hooks/use-content';
import SectionHead from './SectionHead';
import { richText } from '../utils/richText';

const About = () => {
    const { ABOUT } = useContent();
    return (
        <section className="sec" id="about">
            <SectionHead icon="📇" title="About" />
            <p>{richText(ABOUT.lede)}</p>
            {ABOUT.cols.map((c, i) => (
                <p key={i} className={i > 0 ? 'dim' : undefined}>
                    {c}
                </p>
            ))}
            <div className="kv" style={{ marginTop: 18 }}>
                {ABOUT.stats.map(s => (
                    <div key={s.k} className="contents">
                        <div className="k">{s.k}</div>
                        <div className="v">{s.v}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
