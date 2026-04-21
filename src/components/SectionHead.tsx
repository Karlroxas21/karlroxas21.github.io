import type { ReactNode } from 'react';

interface SectionHead {
    n: string;
    title: ReactNode;
    meta: string;
}

const SectionHead = ({ n, title, meta }: SectionHead) => {
    return (
        <div className="shead">
            <div className="shead__num label num">{n}</div>
            <h2 className="shead__title">{title}</h2>
            <div className="shead__meta">{meta}</div>
        </div>
    );
};

export default SectionHead;
