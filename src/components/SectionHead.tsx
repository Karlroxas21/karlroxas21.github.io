import type { ReactNode } from 'react';

interface SectionHead {
    icon: string;
    title: ReactNode;
}

const SectionHead = ({ icon, title }: SectionHead) => {
    return (
        <h2 className="sec__h">
            <span className="he" aria-hidden="true">
                {icon}
            </span>
            {title}
        </h2>
    );
};

export default SectionHead;
