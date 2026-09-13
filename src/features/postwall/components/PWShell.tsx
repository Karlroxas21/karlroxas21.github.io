import { useRef, type ReactNode } from 'react';

import '../postwall.css';
import { useReveal } from '../hooks/use-reveal';
import { skipTo } from '../utils/scroll-to';
import { PW } from '../pwTokens';

/**
 * Outer paper/ink shell. Owns the page's one reveal observer, and the skip link — a long
 * scroll-driven page must never trap a keyboard user in the story.
 */
export default function PWShell({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    useReveal(root);
    return (
        <div
            ref={root}
            className="pw-page relative"
            style={{
                background: PW.paper,
                color: PW.ink,
                fontFamily: PW.font,
                lineHeight: 1.5,
                overflowX: 'clip',
            }}>
            <button type="button" className="pw-skip" onClick={() => skipTo('pw-download')}>
                Skip the story — go to downloads
            </button>
            {children}
        </div>
    );
}
