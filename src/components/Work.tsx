import SectionHead from './SectionHead';
import { PROJECTS } from './data';

const Work = () => {
    return (
        <section className="section" id="work">
            <div className="shell g12">
                <SectionHead n="02" title={<>Selected work.</>} meta={`${PROJECTS.length} projects · 2025—26`} />
                <div className="work__list">
                    {PROJECTS.map(p => (
                        <a className="proj" href="#" key={p.n} onClick={e => e.preventDefault()}>
                            <div className="proj__num">{p.n}</div>
                            <h3 className="proj__title">{p.title}</h3>
                            <div className="proj__desc">{p.desc}</div>
                            <div className="proj__meta">
                                {p.tags.map(t => (
                                    <span key={t} className="proj__tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="proj__year num">{p.year}</div>
                            <div className="proj__arrow" aria-hidden>
                                ↗
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
