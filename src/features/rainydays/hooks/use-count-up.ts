import { useEffect } from 'react';

const fmt = (n: number) => '₱' + Math.round(n).toLocaleString('en-PH');

/** Counts `[data-countup="₱115,000"]` up from zero when it scrolls into view. */
export function useCountUp() {
    useEffect(() => {
        const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-countup]'));
        if (!targets.length) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            targets.forEach(el => {
                el.textContent = el.dataset.countup ?? el.textContent;
            });
            return;
        }

        const animate = (el: HTMLElement) => {
            const finalStr = el.dataset.countup ?? '';
            const finalNum = Number.parseInt(finalStr.replace(/[^\d]/g, ''), 10);
            if (!Number.isFinite(finalNum)) {
                el.textContent = finalStr;
                return;
            }
            const dur = 900;
            const start = performance.now();
            const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = fmt(finalNum * eased);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = finalStr;
            };
            requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        animate(e.target as HTMLElement);
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        targets.forEach(el => {
            el.textContent = '₱0';
            io.observe(el);
        });

        return () => io.disconnect();
    }, []);
}
