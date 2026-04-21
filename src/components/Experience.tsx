import SectionHead from './SectionHead';
import { EXPERIENCE } from './data';

const Experience = () => {
    return (
        <section className="section" id="exp">
            <div className="shell g12">
                <SectionHead n="04" title={<>Experience.</>} meta="2015 — now" />
                <div className="exp">
                    {EXPERIENCE.map((r, i) => (
                        <div className="exp__row" key={i}>
                            <div className="exp__year num">{r.years}</div>
                            <div className="exp__role">
                                {r.role}
                                <span className="exp__company">, {r.company}</span>
                            </div>
                            <div className="exp__note">{r.note}</div>
                            <div className="exp__loc">{r.loc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
