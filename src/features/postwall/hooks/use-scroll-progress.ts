import { useEffect, useRef, type RefObject } from 'react';

import { onScrollFrame } from '../utils/scroll-bus';
import { prefersReducedMotion } from '../utils/spring';

/**
 * How progress is measured for the element:
 * - `view`  0 when its top enters the viewport bottom → 1 when its bottom leaves the top (parallax).
 * - `exit`  0 while its top is at/above the viewport top → 1 when it has scrolled fully out (hero).
 * - `pin`   for tall wrappers with a sticky child: 0 when the wrapper pins → 1 when it unpins (scrub).
 */
export type ProgressMode = 'view' | 'exit' | 'pin';

interface Options {
    mode?: ProgressMode;
    /** Remap the raw 0–1 progress so only part of the travel drives the animation. */
    range?: [number, number];
    ease?: (t: number) => number;
    /** Fixed value written when the user prefers reduced motion (the resting/final state). */
    reduced?: number;
    /**
     * Keep tracking scroll even under reduced motion. For progress that selects *content*
     * (which chapter is showing) rather than moving it — the swap then reads as a cross-fade,
     * which is the reduced-motion equivalent, instead of freezing on the first state.
     */
    trackWhenReduced?: boolean;
    varName?: string;
    onChange?: (p: number) => void;
}

/**
 * Writes scroll progress (0–1) into a CSS custom property on the element — no React re-render per frame.
 * Children animate with `calc(var(--p) * …)` on transform/opacity only.
 */
export function useScrollProgress<T extends HTMLElement>(
    ref: RefObject<T | null>,
    { mode = 'view', range, ease, reduced = 1, trackWhenReduced = false, varName = '--p', onChange }: Options = {}
) {
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const r0 = range?.[0] ?? 0;
    const r1 = range?.[1] ?? 1;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion() && !trackWhenReduced) {
            el.style.setProperty(varName, String(reduced));
            onChangeRef.current?.(reduced);
            return;
        }

        let last = -1;
        return onScrollFrame(() => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            let raw: number;
            if (mode === 'view') raw = (vh - rect.top) / (vh + rect.height);
            else if (mode === 'exit') raw = -rect.top / rect.height;
            else {
                const travel = rect.height - vh;
                raw = travel <= 0 ? 1 : -rect.top / travel;
            }
            let p = (raw - r0) / (r1 - r0);
            p = p < 0 ? 0 : p > 1 ? 1 : p;
            if (ease) p = ease(p);
            if (Math.abs(p - last) < 0.0005) return;
            last = p;
            el.style.setProperty(varName, p.toFixed(4));
            onChangeRef.current?.(p);
        });
    }, [ref, mode, r0, r1, ease, reduced, trackWhenReduced, varName]);
}
