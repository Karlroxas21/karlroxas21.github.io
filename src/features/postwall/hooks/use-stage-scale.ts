import { useEffect, type RefObject } from 'react';

/**
 * Fixed-pixel compositions (the wall, the hero cluster) are authored at `baseWidth` and scaled to fit
 * their container. Writes `--s` (scale factor) on the element; the stage uses `transform: scale(var(--s))`.
 */
export function useStageScale<T extends HTMLElement>(ref: RefObject<T | null>, baseWidth: number, max = 1) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const apply = (w: number) => el.style.setProperty('--s', Math.min(max, w / baseWidth).toFixed(4));
        apply(el.clientWidth);
        const ro = new ResizeObserver(entries => {
            for (const e of entries) apply(e.contentRect.width);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, [ref, baseWidth, max]);
}
