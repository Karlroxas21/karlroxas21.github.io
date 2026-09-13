import { useEffect, type RefObject } from 'react';

import {
    SPRING_CALM,
    SPRING_THROW,
    prefersReducedMotion,
    rubberband,
    springSettled,
    springStep,
    velocityFrom,
} from '../utils/spring';

/**
 * Makes a note grabbable. Tracks the pointer 1:1 (respecting the grab offset), rubber-bands past
 * `radius`, and on release hands the finger's velocity to a spring that carries it home. A note mid-flight
 * can be grabbed again — the spring is cancelled and the drag continues from the on-screen value.
 */
export function useDragSpring<T extends HTMLElement>(ref: RefObject<T | null>, radius = 240) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = prefersReducedMotion();
        let x = 0,
            y = 0,
            vx = 0,
            vy = 0;
        let grabbing = false;
        let startX = 0,
            startY = 0;
        let raf = 0;
        let lastT = 0;
        let history: { x: number; y: number; t: number }[] = [];

        const paint = () => {
            el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        };

        const tick = (t: number) => {
            const dt = Math.min((t - lastT) / 1000, 1 / 30);
            lastT = t;
            const cfg = reduced ? SPRING_CALM : SPRING_THROW;
            [x, vx] = springStep(x, vx, 0, cfg, dt);
            [y, vy] = springStep(y, vy, 0, cfg, dt);
            paint();
            if (springSettled(x, vx, 0) && springSettled(y, vy, 0)) {
                x = 0;
                y = 0;
                paint();
                raf = 0;
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const onDown = (e: PointerEvent) => {
            if (e.button !== 0) return;
            el.setPointerCapture(e.pointerId);
            if (raf) {
                cancelAnimationFrame(raf); // interrupt: continue from the presentation value
                raf = 0;
            }
            grabbing = true;
            startX = e.clientX - x;
            startY = e.clientY - y;
            history = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
            el.dataset.grab = '1';
        };

        const onMove = (e: PointerEvent) => {
            if (!grabbing) return;
            let nx = e.clientX - startX;
            let ny = e.clientY - startY;
            const dist = Math.hypot(nx, ny);
            if (dist > radius) {
                const k = (radius + rubberband(dist - radius, radius)) / dist;
                nx *= k;
                ny *= k;
            }
            x = nx;
            y = ny;
            paint();
            history.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
            while (history.length > 2 && e.timeStamp - history[0].t > 100) history.shift();
        };

        const onUp = () => {
            if (!grabbing) return;
            grabbing = false;
            el.dataset.grab = '0';
            const v = velocityFrom(history);
            vx = v.vx;
            vy = v.vy;
            lastT = performance.now();
            raf = requestAnimationFrame(tick);
        };

        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onUp);
        return () => {
            el.removeEventListener('pointerdown', onDown);
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onUp);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [ref, radius]);
}
