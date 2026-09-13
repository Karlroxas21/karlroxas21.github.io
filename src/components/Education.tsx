import SectionHead from './SectionHead';
import { EDUCATION } from './data';

const Education = () => {
    return (
        <section className="sec" id="education">
            <SectionHead icon="🎓" title="Education" />
            <ul className="bare">
                {EDUCATION.map(e => (
                    <li className="item" key={e.institution}>
                        <div className="item__top">
                            <h3 className="item__title">
                                {e.institution} <span className="co">— {e.area}</span>
                            </h3>
                            <span className="item__yr num">{e.years}</span>
                        </div>
                        {e.highlights.map(h => (
                            <p className="item__desc" key={h}>
                                {h}
                            </p>
                        ))}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Education;
