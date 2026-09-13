/**
 * Spring math, Apple-style: designer-facing `response` (seconds to settle) and
 * `damping` ratio (1 = critically damped, <1 overshoots). See WWDC18 "Designing Fluid Interfaces".
 */
export interface SpringConfig {
    /** Seconds it takes to approach the target. Lower = snappier. */
    response: number;
    /** 1.0 = no overshoot. ~0.8 = a little bounce (only after a flick/throw). */
    damping: number;
}

export const SPRING_CALM: SpringConfig = { response: 0.4, damping: 1 };
export const SPRING_THROW: SpringConfig = { response: 0.45, damping: 0.8 };

/** One semi-implicit Euler step. Returns the new [position, velocity]. */
export function springStep(
    x: number,
    v: number,
    target: number,
    { response, damping }: SpringConfig,
    dt: number
): [number, number] {
    const k = (2 * Math.PI) / response;
    const stiffness = k * k;
    const friction = 2 * damping * k;
    const a = -stiffness * (x - target) - friction * v;
    const nv = v + a * dt;
    return [x + nv * dt, nv];
}

/** True when the spring is close enough to its target to snap and stop animating. */
export function springSettled(x: number, v: number, target: number, eps = 0.05) {
    return Math.abs(x - target) < eps && Math.abs(v) < eps * 20;
}

/** Where a flick would come to rest on its own (exponential decay, like UIScrollView). */
export function project(velocity: number, decelerationRate = 0.998) {
    return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary — the further you pull, the less it follows. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
    return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/** Release velocity (px/s) from a short pointer history. */
export function velocityFrom(history: { x: number; y: number; t: number }[]): { vx: number; vy: number } {
    if (history.length < 2) return { vx: 0, vy: 0 };
    const a = history[0];
    const b = history[history.length - 1];
    const dt = Math.max(b.t - a.t, 1) / 1000;
    return { vx: (b.x - a.x) / dt, vy: (b.y - a.y) / dt };
}

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
