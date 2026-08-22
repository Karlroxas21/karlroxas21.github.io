import SectionHead from './SectionHead';
import { CERTIFICATIONS } from './data';

const Certifications = () => {
    return (
        <section className="sec" id="certifications">
            <SectionHead icon="🏅" title="Certifications" />
            <ul className="bare">
                {CERTIFICATIONS.map(c => (
                    <li className="item" key={c.name}>
                        <div className="item__top">
                            <h3 className="item__title">{c.name}</h3>
                            <span className="item__yr num">{c.date}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Certifications;
