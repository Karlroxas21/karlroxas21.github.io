import { useEffect, useState } from 'react';

import { onScrollFrame } from '../utils/scroll-bus';

/** True once the page has scrolled past `threshold` px. Drives the nav material's weight. */
export function useScrolled(threshold = 16) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => onScrollFrame(() => setScrolled(window.scrollY > threshold)), [threshold]);
    return scrolled;
}
