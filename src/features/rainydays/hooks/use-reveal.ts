import { useEffect } from 'react';

/** Fades `.rd-reveal` elements in once, on first intersection. */
export function useReveal() {
    useEffect(() => {
        const targets = document.querySelectorAll<HTMLElement>('.rd-reveal');
        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        targets.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
}
