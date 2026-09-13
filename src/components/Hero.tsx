import { useContent } from '../hooks/use-content';
import { richText } from '../utils/richText';

const Hero = () => {
    const { PROFILE } = useContent();
    return (
        <>
            <header className="pagehead">
                <div className="pageicon" aria-hidden="true">
                    👋
                </div>
                <h1 className="name">{PROFILE.name}</h1>
                <p className="role">
                    {PROFILE.role} · {PROFILE.location} · {PROFILE.timezone}
                </p>
            </header>

            <section className="intro">
                <p className="lede">{richText(PROFILE.tagline)}</p>
                <p className="dim">{PROFILE.sub}</p>

                <div className="callout">
                    <span className="ico" aria-hidden="true">
                        ✦
                    </span>
                    <p>
                        <strong>{PROFILE.status}.</strong>{' '}
                        <span className="dim">
                            TypeScript · Java · React · React Native.{' '}
                            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Hero;
