import { useEffect } from 'react';

/**
 * Scrolls to the section named in the URL, for deep links like
 * `/#/rainydays#rd-download`. HashRouter owns the first fragment, so the section
 * id is whatever follows the second `#`.
 */
export function useHashScroll() {
    useEffect(() => {
        const jump = () => {
            const parts = window.location.hash.split('#');
            const id = parts[2];
            if (!id) return;
            // Wait a frame so the section has laid out before measuring.
            requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
            });
        };
        jump();
        window.addEventListener('hashchange', jump);
        return () => window.removeEventListener('hashchange', jump);
    }, []);
}
