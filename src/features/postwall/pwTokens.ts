/**
 * Mirrors the desktop app so the page and the product look the same. Neutrals are the app's light
 * theme (`--pw-*` in postwall-ui src/index.css); notes are postwall-ui src/constants/note-colors.ts
 * (bg / text / border). When either file changes, change this one with it.
 */
export const PW = {
    paper: '#faf9f5',
    sidebar: '#f5f4f0',
    ink: '#2c2b29',
    inkSoft: '#696863',
    inkFaint: 'rgba(44,43,41,0.45)',
    hairline: '#f0efea',
    hairlineStrong: '#e5e4de',
    selected: 'rgba(44,43,41,0.08)',
    /** The app's pinned-pin colour — the only saturated colour its chrome uses. */
    pinActive: '#F57C00',

    notes: {
        yellow: { bg: '#FDF1B8', ink: '#3B3A36', edge: '#EADFA7' },
        green: { bg: '#D2EAD4', ink: '#2D3F30', edge: '#C3DCC5' },
        blue: { bg: '#D2E3F8', ink: '#29364A', edge: '#C1D2E7' },
        purple: { bg: '#E3D5E4', ink: '#3F2B42', edge: '#D3C4D4' },
        grey: { bg: '#ECEAE3', ink: '#333230', edge: '#DBD9D1' },
        orange: { bg: '#F7D6BD', ink: '#4D311F', edge: '#E5C3AB' },
    },

    font: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

export type NoteColorKey = keyof typeof PW.notes;
export type NoteColor = (typeof PW.notes)[NoteColorKey];

export const noteColor = (key: NoteColorKey | string): NoteColor =>
    (PW.notes as Record<string, NoteColor>)[key] ?? PW.notes.yellow;

export const PW_GRAIN =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export const PW_MAXW = 1180;
