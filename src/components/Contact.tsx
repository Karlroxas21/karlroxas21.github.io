import SectionHead from './SectionHead';
import { LINKS, PROFILE } from './data';

const Contact = () => {
    return (
        <section className="section" id="contact">
            <div className="shell g12">
                <SectionHead n="06" title={<>Contact.</>} meta="Let's talk" />
                <div className="contact">
                    <h3 className="contact__big">
                        Say <a href={`mailto:${PROFILE.email}`}>hello</a>,
                        <br />
                        or <a href="#">send a letter</a>.
                    </h3>
                    <div className="contact__rows">
                        {LINKS.filter(k => k.k != 'resume').map(l => (
                            <a className="contact__row" key={l.k} href={l.href}>
                                <span className="k">{l.k}</span>
                                <span className="v">{l.v}</span>
                                <span className="arrow">↗</span>
                            </a>
                        ))}
                        {LINKS.filter(k => k.k === 'resume').map(l => (
                            <a className="contact__row" key={l.k} href={l.href} download>
                                <span className="k">{l.k}</span>
                                <span className="v">{l.v}</span>
                                <span className="arrow">↗</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
