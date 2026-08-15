import SectionHead from './SectionHead';
import { EXPERIENCE } from './data';

const Experience = () => {
    return (
        <section className="sec" id="exp">
            <SectionHead icon="💼" title="Experience" />
            <ul className="bare">
                {EXPERIENCE.map((r, i) => (
                    <li className="item" key={i}>
                        <div className="item__top">
                            <h3 className="item__title">
                                {r.role} <span className="co">— {r.company}</span>
                            </h3>
                            <span className="item__yr num">{r.years}</span>
                        </div>
                        <p className="item__desc">{r.note}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Experience;
