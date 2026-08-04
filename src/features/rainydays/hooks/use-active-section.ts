import { useEffect, useState } from 'react';

/**
 * Id of the section currently nearest the top of the viewport.
 * Used to mark the active nav link.
 */
export function useActiveSection(ids: readonly string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const nodes = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
        if (!nodes.length) return;

        const io = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
        );

        nodes.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, [ids]);

    return active;
}
