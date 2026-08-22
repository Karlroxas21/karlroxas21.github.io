import SectionHead from './SectionHead';
import { SKILLS } from './data';

const Skills = () => {
    return (
        <section className="sec" id="skills">
            <SectionHead icon="🧰" title="Skills" />
            <div className="kv">
                {SKILLS.map(g => (
                    <div key={g.label} className="contents">
                        <div className="k">{g.label}</div>
                        <div className="v">
                            <div className="chips chips--flush">
                                {g.items.map(i => (
                                    <span className="chip" key={i}>
                                        {i}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
