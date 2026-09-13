import { type ReactNode } from 'react';

/**
 * Renders a limited subset of inline HTML (`<em>`, `<br>`) from a plain string.
 * Content is author-controlled site copy / i18n strings — not arbitrary HTML —
 * so this parses only those two tags and never uses dangerouslySetInnerHTML.
 */
export function richText(input: string): ReactNode {
    const parts: ReactNode[] = [];
    const regex = /<em>(.*?)<\/em>|<br\s*\/?>/gi;
    let last = 0;
    let i = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(input)) !== null) {
        if (m.index > last) parts.push(input.slice(last, m.index));
        parts.push(m[1] !== undefined ? <em key={i++}>{m[1]}</em> : <br key={i++} />);
        last = regex.lastIndex;
    }
    if (last < input.length) parts.push(input.slice(last));

    return parts;
}
