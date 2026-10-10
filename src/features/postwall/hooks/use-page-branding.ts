import { useEffect } from 'react';

const TITLE = 'PostWall | Sticky notes that stay on top';
const ICON = '/postwall/postwall-mark.svg';

/**
 * While the PostWall page is mounted, the tab shows PostWall's own name and icon. The site has one
 * index.html, so both are swapped at runtime and put back on the way out to the rest of the site.
 */
export function usePageBranding() {
    useEffect(() => {
        const previousTitle = document.title;
        const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        const previousIcon = icon ? { href: icon.getAttribute('href'), type: icon.getAttribute('type') } : null;

        document.title = TITLE;
        icon?.setAttribute('href', ICON);
        icon?.setAttribute('type', 'image/svg+xml');

        return () => {
            document.title = previousTitle;
            if (!icon || !previousIcon) return;
            if (previousIcon.href === null) icon.removeAttribute('href');
            else icon.setAttribute('href', previousIcon.href);
            if (previousIcon.type === null) icon.removeAttribute('type');
            else icon.setAttribute('type', previousIcon.type);
        };
    }, []);
}
