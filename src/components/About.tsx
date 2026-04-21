import { ABOUT } from './data';
import SectionHead from './SectionHead';

const About = () => {
    return (
        <section className="section" id="about">
            <div className="shell g12">
                <SectionHead n="01" title={<>About.</>} meta="The short version" />
                <div className="about__stats">
                    <div className="label">Facts</div>
                    {ABOUT.stats.map(s => (
                        <div className="stat" key={s.k}>
                            <span className="k">{s.k}</span>
                            <span className="v">{s.v}</span>
                        </div>
                    ))}
                </div>
                <p className="about__lede">{ABOUT.lede}</p>
                <div className="about__cols">
                    {ABOUT.cols.map((c, i) => (
                        <p key={i}>{c}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
