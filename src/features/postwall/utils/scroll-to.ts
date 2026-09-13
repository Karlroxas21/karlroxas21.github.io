import { prefersReducedMotion } from './spring';

/** HashRouter owns the URL hash, so in-page anchors scroll programmatically instead of via `href="#…"`. */
export function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
    });
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * Skip-link target handler: scrolls to the section and moves focus into it, so a keyboard user's
 * next Tab continues from there rather than from the top of the story.
 */
export function skipTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    scrollToSection(id);
}
