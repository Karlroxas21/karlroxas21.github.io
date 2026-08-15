import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { useAnalytics } from '../hooks/use-analytics';
import { useTheme } from '../providers/theme-context';
import Chrome from '../components/Chrome';

const Blog = () => {
    const { title } = useParams();
    const [content, setContent] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();
    const { trackEvent } = useAnalytics();

    useEffect(() => {
        if (!title) return;
        fetch(`/files/articles/${title}.md`)
            .then(res => (res.ok ? res.text() : Promise.reject()))
            .then(text => setContent(text))
            .catch(() => setContent(''));
    }, [title]);

    useEffect(() => {
        if (!title) return;
        trackEvent(`Read Blog ${title}`, 'Blog', title);
    }, [title, trackEvent]);

    if (!title) return null;

    return (
        <>
            <Chrome theme={theme} onToggleTheme={toggleTheme} />
            <main style={{ background: 'var(--color-bg)', color: 'var(--color-fg)', minHeight: '100vh' }}>
                <section className="blog-section">
                    <div className="shell">
                        <Link
                            to="/#writing"
                            className="blog-back label label--ink"
                            onClick={() => trackEvent('Back from Blog', 'Blog', title ?? '')}>
                            ← Writing
                        </Link>

                        {content === null ? (
                            <p className="label">Loading…</p>
                        ) : content === '' ? (
                            <div className="blog-not-found">
                                <p className="label">Post not found</p>
                                <Link to="/#writing" className="blog-back label label--ink">
                                    ← Back to writing
                                </Link>
                            </div>
                        ) : (
                            <article className="blog-article">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                    {content}
                                </ReactMarkdown>
                            </article>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Blog;
