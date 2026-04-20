import SectionHead from './SectionHead';
import { POSTS } from './data';

const Writing = () => {
    return (
        <section className="section" id="writing">
            <div className="shell g12">
                <SectionHead n="03" title={<>Writing.</>} meta="Occasional Articles" />
                <div className="writing">
                    {POSTS.map((p, i) => (
                        <a className="post" href={p.link} target="_blank" key={i}>
                            <div className="post__meta">
                                <span>
                                    {p.date} · {p.tag}
                                </span>
                                <span>{p.readtime}</span>
                            </div>
                            <h3 className="post__title">{p.title}</h3>
                            <p className="post__excerpt">{p.excerpt}</p>
                            <div className="post__more">Read →</div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Writing;
