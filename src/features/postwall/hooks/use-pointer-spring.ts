import { useEffect, type RefObject } from 'react';

import { SPRING_CALM, hasFinePointer, prefersReducedMotion, springSettled, springStep } from '../utils/spring';

/**
 * Tracks the pointer over `ref` and springs `--mx` / `--my` (-1…1) toward it — critically damped, so
 * layers glide after the cursor without overshooting. Retargets every move, so it is always interruptible.
 */
export function usePointerSpring<T extends HTMLElement>(ref: RefObject<T | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion() || !hasFinePointer()) return;

        let x = 0,
            y = 0,
            vx = 0,
            vy = 0,
            tx = 0,
            ty = 0;
        let raf = 0;
        let lastT = 0;

        const paint = () => {
            el.style.setProperty('--mx', x.toFixed(4));
            el.style.setProperty('--my', y.toFixed(4));
        };

        const tick = (t: number) => {
            const dt = Math.min((t - lastT) / 1000, 1 / 30);
            lastT = t;
            [x, vx] = springStep(x, vx, tx, SPRING_CALM, dt);
            [y, vy] = springStep(y, vy, ty, SPRING_CALM, dt);
            paint();
            if (springSettled(x, vx, tx, 0.002) && springSettled(y, vy, ty, 0.002)) {
                x = tx;
                y = ty;
                paint();
                raf = 0;
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const kick = () => {
            if (!raf) {
                lastT = performance.now();
                raf = requestAnimationFrame(tick);
            }
        };

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
            ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
            kick();
        };
        const onLeave = () => {
            tx = 0;
            ty = 0;
            kick();
        };

        el.addEventListener('pointermove', onMove, { passive: true });
        el.addEventListener('pointerleave', onLeave);
        return () => {
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref]);
}
