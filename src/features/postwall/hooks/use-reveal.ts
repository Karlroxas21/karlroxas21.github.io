import { useEffect, type RefObject } from 'react';

/** Adds `is-in` to every `.pw-reveal` inside `root` the first time it scrolls into view. */
export function useReveal(root: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const scope = root.current ?? document;
        const targets = scope.querySelectorAll<HTMLElement>('.pw-reveal');
        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
        );
        targets.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, [root]);
}
