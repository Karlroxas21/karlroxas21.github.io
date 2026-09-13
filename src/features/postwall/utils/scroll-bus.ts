/**
 * One passive scroll/resize listener + one requestAnimationFrame for the whole page.
 * Every parallax layer subscribes here instead of adding its own listener.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let frame = 0;
let bound = false;

function flush() {
    frame = 0;
    listeners.forEach(fn => fn());
}

function schedule() {
    if (!frame) frame = requestAnimationFrame(flush);
}

export function onScrollFrame(fn: Listener): () => void {
    listeners.add(fn);
    if (!bound) {
        bound = true;
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
    }
    schedule();
    return () => {
        listeners.delete(fn);
        if (listeners.size === 0 && bound) {
            bound = false;
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (frame) {
                cancelAnimationFrame(frame);
                frame = 0;
            }
        }
    };
}
