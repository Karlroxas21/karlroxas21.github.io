import { useEffect, useState, type RefObject } from 'react';

import { easeOutCubic, prefersReducedMotion } from '../utils/spring';

/** Counts from 0 to `to` the first time `ref` is on screen. Returns the current value. */
export function useCountUp(ref: RefObject<HTMLElement | null>, to: number, duration = 1400) {
    // Reduced motion: no counting, so start (and stay) at the final value.
    const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));
    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;
        let raf = 0;
        const io = new IntersectionObserver(
            entries => {
                if (!entries.some(e => e.isIntersecting)) return;
                io.disconnect();
                const t0 = performance.now();
                const step = (t: number) => {
                    const p = Math.min(1, (t - t0) / duration);
                    setValue(to * easeOutCubic(p));
                    if (p < 1) raf = requestAnimationFrame(step);
                };
                raf = requestAnimationFrame(step);
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref, to, duration]);
    return value;
}
