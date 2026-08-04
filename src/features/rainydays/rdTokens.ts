/**
 * RainyDays design tokens.
 *
 * Monochrome product system: ink on paper, one wash, hairline rules, mono numerals.
 * No hue anywhere — contrast and type weight carry all hierarchy.
 */
export const RD = {
    ink: '#0A0A0A',
    inkHover: '#1A1A1A',
    paper: '#FFFFFF',
    wash: '#F5F5F5',
    chip: '#F0F0F0',
    line: '#E5E5E5',
    mute: '#808080',
    onDark: '#E0E0E0',
    onDarkMute: '#B0B0B0',
} as const;

/** Page gutter + max width. Every section body uses this, nothing else. */
export const RD_SHELL = 'mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-20';

/** Vertical rhythm — mobile-first, grows with viewport. */
export const RD_SECTION = 'py-16 md:py-24 lg:py-32';
export const RD_SECTION_TIGHT = 'py-14 md:py-16 lg:py-20';

/** Card surface on paper. */
export const RD_CARD =
    'rounded-2xl border border-[#E5E5E5] bg-white shadow-[0_1px_2px_rgba(10,10,10,.04),0_10px_30px_-16px_rgba(10,10,10,.12)]';

/** Card surface on ink. */
export const RD_CARD_DARK = 'rounded-2xl border border-white/10 bg-white/[0.03]';

/** Type scale. */
export const RD_H2 = 'text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance';
export const RD_H3 = 'text-lg md:text-xl font-semibold tracking-[-0.01em]';
export const RD_LEAD = 'text-base md:text-lg leading-relaxed';
export const RD_BODY = 'text-[15px] leading-[1.6]';

/** Numerals: always mono + tabular so amounts align column-to-column. */
export const RD_NUM = 'font-mono tabular-nums tracking-[-0.02em]';

/** Dark gradient used by hero, how-it-works, callout, footer edge. */
export const RD_INK_GRADIENT = 'bg-[linear-gradient(135deg,#0A0A0A_0%,#111111_50%,#1A1A1A_100%)]';

export const RD_FOCUS =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-white';
export const RD_FOCUS_DARK =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-[#0A0A0A]';

/**
 * The site runs on HashRouter, so the route itself lives in the URL hash.
 * A bare `#rd-how` would overwrite it and drop the router on NotFound, so every
 * in-page link is written as `#/rainydays#rd-how`: the router keeps `/rainydays`
 * and the trailing fragment is ours to scroll to.
 */
export const RD_ROUTE = '#/rainydays';
export const sectionHref = (id: string) => `${RD_ROUTE}#${id}`;

/**
 * In-page section order. Drives the desktop nav, mobile sheet and footer nav.
 * `inNav: false` keeps a section out of the desktop bar, which only fits six items.
 */
type RDSection = { readonly id: string; readonly label: string; readonly inNav?: boolean };

export const RD_SECTIONS: readonly RDSection[] = [
    { id: 'rd-scenarios', label: 'Scenarios' },
    { id: 'rd-features', label: 'What it does' },
    { id: 'rd-how', label: 'How it works' },
    { id: 'rd-screens', label: 'Screens' },
    { id: 'rd-evidence', label: 'The evidence', inNav: false },
    { id: 'rd-why', label: 'Why this exists' },
    { id: 'rd-download', label: 'Download' },
];

/**
 * Numbered references for every sourced claim on the page. Rendered in the
 * footer as `rd-references`; footnote markers link down to it.
 */
export type RDCitation = {
    readonly key: string;
    readonly n: number;
    readonly label: string;
    readonly note: string;
    readonly href?: string;
};

export const RD_CITATIONS = [
    {
        key: 'fis2021',
        n: 1,
        label: 'Bangko Sentral ng Pilipinas, 2021 Financial Inclusion Survey',
        note: 'Topline report. 1,200 adults nationwide, interviewed 13 January to 9 February 2022, with 2021 as the reference year.',
        href: 'https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2021/2021FISToplineReport.pdf',
    },
    {
        key: 'cfis2025',
        n: 2,
        label: 'Bangko Sentral ng Pilipinas, 2025 Consumer Finance and Inclusion Survey',
        note: '8,784 completed interviews with adults aged 15 and above across all regions, conducted 16 February to 24 July 2025.',
        href: 'https://www.bsp.gov.ph/Inclusive%20Finance/Financial%20Inclusion%20Reports%20and%20Publications/2025/2025CFISreport.pdf',
    },
    {
        key: 'lending56',
        n: 3,
        label: '5-6 lending, annualized rate',
        note: 'BSP reports that informal sources, family and friends alongside 5-6 lending schemes, are the top providers of loans because they release funds fastest. The 240% figure is our own arithmetic on a 20% charge over a five-month term, not a BSP estimate.',
    },
] as const satisfies readonly RDCitation[];

export type RDCitationKey = (typeof RD_CITATIONS)[number]['key'];

export const citation = (key: RDCitationKey): RDCitation =>
    (RD_CITATIONS as readonly RDCitation[]).find(c => c.key === key)!;

export const RD_VERSION = 'v1.1.0';

/** TODO: swap in the real Play Store listing once published. */
export const RD_PLAY_URL = '';
