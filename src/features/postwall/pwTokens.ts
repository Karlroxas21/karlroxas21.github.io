export const PW = {
    canvas: '#1a1a1c',
    paper: '#faf8f3',
    ink: '#2a2722',
    inkSoft: 'rgba(42,39,34,0.62)',
    inkFaint: 'rgba(42,39,34,0.38)',
    hairline: 'rgba(42,39,34,0.08)',
    hairlineStrong: 'rgba(42,39,34,0.14)',
    hover: 'rgba(42,39,34,0.05)',
    selected: 'rgba(42,39,34,0.08)',

    notes: {
        butter: { bg: '#f5e6a8', ink: '#5a4a1a', edge: 'rgba(120,98,40,0.18)', dot: '#d9c270' },
        peach: { bg: '#f0c8a0', ink: '#6a4628', edge: 'rgba(140,82,42,0.18)', dot: '#d99e6e' },
        sage: { bg: '#c8d8b8', ink: '#3e5230', edge: 'rgba(70,98,52,0.18)', dot: '#9eb588' },
        sky: { bg: '#b8c8d8', ink: '#2e4258', edge: 'rgba(54,82,114,0.18)', dot: '#8ba6c2' },
        blush: { bg: '#d8c0c8', ink: '#5a3848', edge: 'rgba(112,68,86,0.18)', dot: '#bf99a6' },
        sand: { bg: '#e8e0d0', ink: '#5a4e38', edge: 'rgba(108,92,62,0.18)', dot: '#c8baa0' },
    },

    tagColors: ['#d99e6e', '#9eb588', '#8ba6c2', '#bf99a6', '#c8baa0', '#d9c270'],

    accent: '#c96442',
    accentSoft: 'rgba(201, 100, 66, 0.12)',
    due: '#a85a3c',
    ok: '#6b8e5a',

    font: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    serif: "'Newsreader', Georgia, serif",
    mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

export type NoteColorKey = keyof typeof PW.notes;
export type NoteColor = (typeof PW.notes)[NoteColorKey];

export const noteColor = (key: NoteColorKey | string): NoteColor =>
    (PW.notes as Record<string, NoteColor>)[key] ?? PW.notes.butter;

export const PW_GRAIN =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export const PW_MAXW = 1180;
