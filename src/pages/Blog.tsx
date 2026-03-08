import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/atom-one-dark.css';
import ReactGA from 'react-ga4';

const Blog = () => {
    const { title } = useParams();
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (!title) return;

        fetch(`/files/articles/${title}.md`)
            .then(res => res.text())
            .then(text => setContent(text))
            .catch(() => setContent(''));
    }, [title]);

    useEffect(() => {
        ReactGA.event({
            category: 'Blog',
            action: `Click ${title} blog`,
            label: 'Checked my blog',
        });
    }, [title]);

    if (!title) return null;

    if (!content) return <div>Post not found!</div>;

    return (
        <section className="flex justify-center py-20 selection:bg-[#fde68a] selection:text-[#1c1917] bg-[#fafaf9]">
            <article className="prose prose-neutral lg:prose-lg selection:#fde68a ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
        </section>
    );
};

export default Blog;
