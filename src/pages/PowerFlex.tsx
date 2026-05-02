import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ─── Data ─────────────────────────────────────────────────────── */

const BRANCHES = [
    {
        name: 'San Miguel',
        city: 'Taguig',
        address: 'San Miguel Avenue, San Miguel, Taguig City',
        hours: '5:00 AM – 11:00 PM',
        phone: '+63 945 843 9259',
        badge: 'Newest Branch',
    },
    {
        name: 'Pinagsama',
        city: 'Taguig',
        address: 'Pinagsama Village, Taguig City',
        hours: '24 Hours • Open Daily',
        phone: '+63 917 555 0188',
        badge: 'Mother Branch',
    },
    {
        name: 'Pembo',
        city: 'Taguig',
        address: '#6 Sampaguita St, Theori Bldg, Pembo, Taguig',
        hours: '24 Hours • Open Daily',
        phone: '+63 945 843 9259',
        badge: '24/7',
    },
    {
        name: 'Pateros',
        city: 'Metro Manila',
        address: 'M. Almeda St, Pateros, Metro Manila',
        hours: '5:00 AM – 11:00 PM',
        phone: '+63 920 884 2210',
        badge: '24/7',
    },
];

const SERVICES = [
    {
        num: '01',
        title: 'Open Gym Floor',
        blurb: 'Free weights, racks, and machines for every level. Ample space, no waiting around.',
        cta: 'View equipment',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M6 8v8" />
                <path d="M18 8v8" />
                <path d="M9 6v12" />
                <path d="M15 6v12" />
                <path d="M9 12h6" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Personal Training',
        blurb: '1-on-1 coaching with certified trainers. Built for first-timers who want it done right.',
        cta: 'Meet the trainers',
        feature: true,
        photo: './images/pffg-pt.png',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="7" r="3" />
                <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Group Classes',
        blurb: 'HIIT, Zumba, Boxing, and more — schedules built around real working hours.',
        cta: 'See schedule',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="9" cy="7" r="3" />
                <circle cx="17" cy="9" r="2.5" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <path d="M14 21v-1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Nutrition Coaching',
        blurb: 'Custom meal frameworks that fit your budget and Filipino kitchen — no "chicken & broccoli only".',
        cta: 'Book a consult',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M11 3a8 8 0 0 0-8 8c0 5 4 10 8 10s8-5 8-10a8 8 0 0 0-8-8z" />
                <path d="M11 8v6" />
                <path d="M8 11h6" />
            </svg>
        ),
    },
    {
        num: '05',
        title: 'Body Composition',
        blurb: 'Skinfold + bioimpedance assessments every 4 weeks. Track real progress, not just the scale.',
        cta: 'Get assessed',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 3 3 5-6" />
            </svg>
        ),
    },
    {
        num: '06',
        title: 'Lockers & Showers',
        blurb: 'Clean, secure facilities so you can train before work and head straight to the office.',
        cta: 'Tour the gym',
        icon: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M4 12h16" />
                <circle cx="9" cy="8" r=".8" fill="currentColor" />
                <circle cx="9" cy="16" r=".8" fill="currentColor" />
            </svg>
        ),
    },
];

const PLANS = [
    {
        name: 'Walk-In',
        blurb: 'No commitment. Pay per session and try us out.',
        list: ['Single-day open gym access', 'Locker & shower use', 'Free orientation'],
    },
    {
        name: 'Member',
        blurb: 'Best for beginners building a steady routine.',
        list: [
            'Unlimited gym access',
            'All group classes included',
            'Free body comp assessment',
            'Nutrition starter guide',
        ],
        popular: true,
    },
    {
        name: 'Member + PT',
        blurb: 'Everything in Member plus personal training.',
        list: ['Everything in Member', '8 PT sessions / month', 'Custom training program', 'Monthly progress review'],
    },
];

const VALUES = [
    {
        num: '01',
        title: 'Real Results, No Shortcuts',
        body: 'We build sustainable habits, not 30-day promises. Our coaches teach you why every rep matters.',
    },
    {
        num: '02',
        title: 'Beginners Welcome, Always',
        body: "Most of our community started with zero gym experience. You'll fit right in from day one.",
    },
    {
        num: '03',
        title: 'Built For The Local Hustle',
        body: 'Schedules, pricing, and coaching designed for Filipinos with real jobs and real budgets.',
    },
    {
        num: '04',
        title: 'Prevention Over Cure',
        body: "Our motto. Train smart now so you don't pay later — in money, mobility, or time.",
    },
];

const MARQUEE_ITEMS = ['Strength', 'Conditioning', 'Community', 'Mobility', 'Boxing', 'Recovery', 'Nutrition'];

/* ─── Tokens ───────────────────────────────────────────────────── */
const C = {
    bg: '#F4F2EE',
    ink: '#0A0A0A',
    ink2: '#1A1A1A',
    muted: '#6B6760',
    line: 'rgba(10,10,10,0.12)',
    card: '#FFFFFF',
    accent: '#1A5FB4',
    hi: '#D4FF3A',
} as const;

/* ─── Shared icons ─────────────────────────────────────────────── */
const ArrowRight = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);
const Chevron = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 6l6 6-6 6" />
    </svg>
);
const Check = () => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
    </svg>
);

/* ─── Sub-components ───────────────────────────────────────────── */

function Dot() {
    return <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-[2px]" style={{ background: C.accent }} />;
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
    return (
        <p
            className="text-[11px] font-bold tracking-[0.18em] uppercase font-['Archivo']"
            style={{ color: light ? 'rgba(244,242,238,0.6)' : C.muted }}>
            <Dot />
            {children}
        </p>
    );
}

function Btn({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    href,
    target,
    rel,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'ink' | 'ghost';
    size?: 'md' | 'sm';
    href?: string;
    target?: string;
    rel?: string;
}) {
    const base = `inline-flex items-center gap-2.5 rounded-full border-0 cursor-pointer font-['Archivo'] font-bold tracking-[0.04em] uppercase transition-all duration-150 active:translate-y-px`;
    const sz = size === 'sm' ? 'h-[38px] px-4 text-xs' : 'h-12 px-[22px] text-sm';
    const styles: Record<string, React.CSSProperties> = {
        primary: { background: C.accent, color: '#fff' },
        ink: { background: C.ink, color: C.bg },
        ghost: { background: 'transparent', color: C.ink, border: `1.5px solid ${C.ink}` },
    };
    const arrBg = variant === 'ghost' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.18)';
    const content = (
        <>
            {children}
            <span
                className="w-[18px] h-[18px] inline-grid place-items-center rounded-full"
                style={{ background: arrBg }}>
                <ArrowRight />
            </span>
        </>
    );
    if (href) {
        return (
            <a className={`${base} ${sz}`} style={styles[variant]} href={href} target={target} rel={rel}>
                {content}
            </a>
        );
    }
    return (
        <button className={`${base} ${sz}`} style={styles[variant]} onClick={onClick}>
            {content}
        </button>
    );
}

/* ─── Nav ──────────────────────────────────────────────────────── */
function Nav({ onMembership }: { onMembership: () => void }) {
    return (
        <nav
            className="sticky top-0 z-50 border-b"
            style={{
                background: 'color-mix(in srgb, #F4F2EE 88%, transparent)',
                backdropFilter: 'saturate(160%) blur(14px)',
                WebkitBackdropFilter: 'saturate(160%) blur(14px)',
                borderColor: C.line,
            }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5 flex items-center justify-between h-[72px] gap-8">
                {/* Brand */}
                <a href="#top" className="flex items-center gap-3 no-underline">
                    <div
                        className="w-11 h-11 rounded-[10px] grid place-items-center overflow-hidden shrink-0"
                        style={{ background: C.ink }}>
                        <img
                            src="/images/powerflex-logo.png"
                            alt="Power Flex Fitness Gym"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div
                            className="font-['Archivo'] font-black text-sm leading-none tracking-[0.02em] uppercase"
                            style={{ color: C.ink }}>
                            Power Flex
                        </div>
                        <div className="text-[10px] tracking-[0.16em] uppercase mt-1" style={{ color: C.muted }}>
                            Fitness Gym
                        </div>
                    </div>
                </a>

                {/* Links (hidden on mobile) */}
                <div className="hidden md:flex gap-7 items-center">
                    {['Services', 'Branches', 'Why Us', 'Membership', 'Contact'].map(l => (
                        <Link
                            key={l}
                            to={`#${l.toLowerCase().replace(' us', '').replace('membership', 'pricing')}`}
                            className="text-[13px] font-semibold tracking-[0.02em] opacity-[0.78] hover:opacity-100 transition-opacity no-underline"
                            style={{ color: C.ink }}>
                            {l}
                        </Link>
                    ))}
                </div>

                <Btn variant="ink" size="sm" onClick={onMembership}>
                    Become a Member
                </Btn>
            </div>
        </nav>
    );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
function Hero({ onMembership }: { onMembership: () => void }) {
    const photo = './images/pffg-sanmiguel.png';
    return (
        <section className="py-[72px] pb-[60px] relative overflow-hidden" id="top" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-[56px] items-center">
                    {/* Text */}
                    <div>
                        <Eyebrow>Where the real fitness battle begins</Eyebrow>
                        <h1
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.92] my-[18px] mb-[22px]"
                            style={{ fontSize: 'clamp(56px,9vw,132px)', color: C.ink }}>
                            Train
                            <br />
                            <span style={{ color: C.accent }}>Hard.</span>
                            <br />
                            <span style={{ WebkitTextStroke: `2px ${C.ink}`, color: 'transparent' }}>Live</span> Strong.
                        </h1>
                        <p
                            className="font-['Archivo'] font-black text-[11px] tracking-[0.2em] uppercase mb-[22px]"
                            style={{ color: C.accent }}>
                            Prevention is better than cure
                        </p>
                        <p className="text-[17px] leading-[1.55] max-w-[460px] mb-7" style={{ color: C.muted }}>
                            Power Flex Fitness Gym is a community of beginners, lifters, and coaches across Taguig and
                            Pateros. Walk in nervous. Walk out a regular.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <Btn variant="primary" onClick={onMembership}>
                                Become a Member
                            </Btn>
                            <Btn variant="ghost" href="#branches">
                                Find a branch
                            </Btn>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-11 pt-7 border-t" style={{ borderColor: C.line }}>
                            {[
                                { num: '4', lbl: 'Branches in Metro' },
                                { num: '6K+', lbl: 'Active members' },
                                { num: '24/7', lbl: 'At Any branch' },
                            ].map(s => (
                                <div key={s.num}>
                                    <div
                                        className="font-['Archivo'] font-black text-[36px] leading-none tracking-[-0.02em]"
                                        style={{ color: C.ink }}>
                                        {s.num}
                                    </div>
                                    <div
                                        className="text-[11px] font-semibold tracking-[0.14em] uppercase mt-2"
                                        style={{ color: C.muted }}>
                                        {s.lbl}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual */}
                    <div
                        className="relative rounded-[20px] overflow-hidden"
                        style={{ aspectRatio: '4/5', background: C.ink }}>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${photo})`, filter: 'contrast(1.05) saturate(1.05)' }}
                        />
                        {/* gradient overlay */}
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.55) 100%)' }}
                        />

                        {/* Est. tag */}
                        {/* <div
                            className="absolute right-[18px] top-[18px] z-10 font-['Archivo'] font-black text-[11px] tracking-[0.16em] px-[14px] py-2 rounded-full"
                            style={{ background: C.accent, color: '#fff' }}
                        >
                            San Miguel Branch
                        </div> */}

                        {/* Live badge */}
                        <div
                            className="absolute left-5 bottom-5 z-10 rounded-[14px] p-[14px_18px] flex items-center gap-[14px]"
                            style={{ background: C.bg, color: C.ink, boxShadow: '0 12px 30px rgba(0,0,0,0.18)' }}>
                            <div
                                className="w-9 h-9 rounded-full grid place-items-center relative pf-pulse"
                                style={{ background: C.hi }}>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={C.ink}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M3 12h4l2-7 4 14 2-7h6" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-['Archivo'] font-black text-xl leading-none">Open now</div>
                                {/* <div className="text-[10px] font-bold tracking-[0.14em] uppercase mt-1" style={{ color: C.muted }}>128 training</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Marquee ───────────────────────────────────────────────────── */
function Marquee() {
    const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div className="overflow-hidden py-[22px] border-t border-b" style={{ background: C.ink, borderColor: C.line }}>
            <div className="flex gap-14 pf-marquee-track" style={{ width: 'max-content', whiteSpace: 'nowrap' }}>
                {loop.map((s, i) => (
                    <span
                        key={i}
                        className="font-['Archivo'] font-black text-[30px] tracking-[0.02em] uppercase inline-flex items-center gap-14"
                        style={{ color: C.bg }}>
                        {s}
                        <span style={{ color: C.accent, fontSize: 20 }}>✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Services ──────────────────────────────────────────────────── */
function Services() {
    return (
        <section className="py-24 sm:py-16" id="services" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                {/* Section head */}
                <div className="flex flex-wrap items-end justify-between gap-10 mb-12">
                    <div>
                        <Eyebrow>What we offer</Eyebrow>
                        <h2
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.95] mt-3 mb-0"
                            style={{ fontSize: 'clamp(38px,5.5vw,76px)', color: C.ink }}>
                            Built to make you stronger —<br className="hidden sm:block" /> every visit.
                        </h2>
                    </div>
                    <p className="max-w-[360px] text-[15px] leading-[1.55]" style={{ color: C.muted }}>
                        Whether it's your first time touching a barbell or your hundredth, every service at Power Flex
                        is designed around showing up and improving. No gimmicks.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
                    {SERVICES.map((s, i) =>
                        s.feature ? (
                            <article
                                key={i}
                                className="rounded-[18px] overflow-hidden flex flex-col sm:flex-row col-span-1 sm:col-span-2 min-h-[320px] transition-transform duration-200 hover:-translate-y-1"
                                style={{ background: C.ink, color: C.bg }}>
                                <div
                                    className="flex-1 bg-cover bg-center min-h-[200px]"
                                    style={{ backgroundImage: `url(${s.photo})` }}
                                />
                                <div className="p-7 flex-1 flex flex-col gap-4">
                                    <div
                                        className="font-['Archivo'] font-black text-[12px] tracking-[0.18em]"
                                        style={{ color: 'rgba(244,242,238,0.55)' }}>
                                        {s.num} / Featured
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-[12px] grid place-items-center"
                                        style={{ background: C.accent, color: '#fff' }}>
                                        {s.icon}
                                    </div>
                                    <h3 className="font-['Archivo'] font-black text-[32px] uppercase tracking-[-0.01em] leading-[0.98] m-0">
                                        {s.title}
                                    </h3>
                                    <p
                                        className="text-sm leading-[1.55] m-0"
                                        style={{ color: 'rgba(244,242,238,0.7)' }}>
                                        {s.blurb}
                                    </p>
                                    <div
                                        className="mt-auto flex items-center justify-between pt-3 border-t text-[12px] font-bold tracking-[0.1em] uppercase"
                                        style={{ borderColor: 'rgba(244,242,238,0.16)', borderStyle: 'dashed' }}>
                                        <span>{s.cta}</span>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        ) : (
                            <article
                                key={i}
                                className="rounded-[18px] p-7 flex flex-col gap-4 min-h-[280px] border transition-all duration-200 hover:-translate-y-[3px] hover:border-[#0A0A0A]"
                                style={{ background: C.card, borderColor: C.line, color: C.ink }}>
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-12 h-12 rounded-[12px] border grid place-items-center"
                                        style={{ background: C.bg, borderColor: C.line, color: C.accent }}>
                                        {s.icon}
                                    </div>
                                    <div
                                        className="font-['Archivo'] font-black text-[12px] tracking-[0.18em]"
                                        style={{ color: C.muted }}>
                                        {s.num}
                                    </div>
                                </div>
                                <h3 className="font-['Archivo'] font-black text-[26px] uppercase tracking-[-0.01em] leading-[0.98] m-0">
                                    {s.title}
                                </h3>
                                <p className="text-sm leading-[1.55] m-0" style={{ color: C.muted }}>
                                    {s.blurb}
                                </p>
                                <div
                                    className="mt-auto flex items-center justify-between pt-3 border-t text-[12px] font-bold tracking-[0.1em] uppercase"
                                    style={{ borderColor: C.line, borderStyle: 'dashed' }}>
                                    <span>{s.cta}</span>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </div>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

/* ─── Branches ──────────────────────────────────────────────────── */
function Branches() {
    const [active, setActive] = useState(0);
    const [mapLoaded, setMapLoaded] = useState(false);
    const b = BRANCHES[active];
    return (
        <section className="py-24 sm:py-16" id="branches" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div
                    className="rounded-[28px] sm:rounded-[20px] p-12 sm:p-6"
                    style={{ background: C.ink, color: C.bg }}>
                    {/* Head */}
                    <div className="flex flex-wrap items-end justify-between gap-10 mb-12">
                        <div>
                            <Eyebrow light>Find your gym</Eyebrow>
                            <h2
                                className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.95] mt-3 mb-0"
                                style={{ fontSize: 'clamp(26px,5.5vw,76px)', color: C.bg }}>
                                Four branches.
                                <br />
                                One community.
                            </h2>
                        </div>
                        <p
                            className="max-w-[360px] text-[15px] leading-[1.55]"
                            style={{ color: 'rgba(244,242,238,0.65)' }}>
                            From the mother branch in Pinagsama to the newest opening in San Miguel, every Power Flex
                            location is run by people who actually train there.
                        </p>
                    </div>

                    {/* Branch grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
                        {/* List */}
                        <div className="flex flex-col gap-2">
                            {BRANCHES.map((br, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setActive(i);
                                        setMapLoaded(false);
                                    }}
                                    className="rounded-[14px] px-[18px] py-4 cursor-pointer text-left flex items-center gap-[14px] border transition-all duration-150"
                                    style={{
                                        background: i === active ? C.accent : 'transparent',
                                        borderColor: i === active ? C.accent : 'rgba(244,242,238,0.12)',
                                        color: C.bg,
                                    }}>
                                    <span className="font-['Archivo'] font-black text-[12px] tracking-[0.06em] w-7 shrink-0">
                                        0{i + 1}
                                    </span>
                                    <div className="flex-1">
                                        <div className="font-['Archivo'] font-black text-base uppercase leading-[1.05]">
                                            {br.name}
                                        </div>
                                        <div
                                            className="text-[11px] tracking-[0.12em] uppercase mt-1"
                                            style={{
                                                color:
                                                    i === active ? 'rgba(255,255,255,0.85)' : 'rgba(244,242,238,0.5)',
                                            }}>
                                            {br.city}
                                        </div>
                                    </div>
                                    <span
                                        className={`ml-auto opacity-50 transition-all duration-150 ${i === active ? '!opacity-100 translate-x-[2px]' : ''}`}>
                                        <Chevron />
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Card */}
                        <div
                            className="rounded-[18px] overflow-hidden grid border"
                            style={{
                                background: '#141414',
                                borderColor: 'rgba(244,242,238,0.1)',
                                gridTemplateRows: '1fr auto',
                                minHeight: 460,
                            }}>
                            <div className="relative" style={{ height: 280 }}>
                                {!mapLoaded && (
                                    <div
                                        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
                                        style={{ background: '#1a1a1a' }}>
                                        <div
                                            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                                            style={{ borderColor: `${C.accent} transparent transparent transparent` }}
                                        />
                                        <span
                                            className="text-[11px] font-bold tracking-[0.14em] uppercase"
                                            style={{ color: 'rgba(244,242,238,0.4)' }}>
                                            Loading map
                                        </span>
                                    </div>
                                )}
                                <iframe
                                    key={b.name}
                                    title={`Map – Power Flex ${b.name}`}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`Power Flex ${b.name} ${b.address}`)}&output=embed`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    onLoad={() => setMapLoaded(true)}
                                />
                                <div
                                    className="absolute top-[18px] left-[18px] font-['Archivo'] font-black text-[10px] tracking-[0.16em] px-3 py-1.5 rounded-full z-10"
                                    style={{ background: C.bg, color: C.ink }}>
                                    {b.badge}
                                </div>
                            </div>
                            <div>
                                <div className="p-6 px-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-[18px] items-end">
                                    <div>
                                        <h3
                                            className="font-['Archivo'] font-black text-[28px] uppercase tracking-[-0.01em] leading-none m-0 mb-1.5"
                                            style={{ color: C.bg }}>
                                            {b.name} Branch
                                        </h3>
                                        <p
                                            className="text-[13px] leading-[1.5] m-0"
                                            style={{ color: 'rgba(244,242,238,0.65)' }}>
                                            {b.address}
                                        </p>
                                    </div>
                                    <Btn
                                        href={`https://www.google.com/maps/search/Power+Flex+${encodeURIComponent(b.name)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        size="sm"
                                        variant="primary">
                                        Get directions
                                    </Btn>
                                </div>
                                <div className="px-7 pb-6">
                                    <div
                                        className="flex gap-[18px] flex-wrap pt-3.5 mt-3.5 border-t text-xs"
                                        style={{ borderColor: 'rgba(244,242,238,0.1)' }}>
                                        {[
                                            { lbl: 'Hours', val: b.hours },
                                            { lbl: 'Phone', val: b.phone },
                                        ].map(m => (
                                            <div key={m.lbl}>
                                                <div
                                                    className="text-[10px] font-bold tracking-[0.14em] uppercase mb-0.5"
                                                    style={{ color: 'rgba(244,242,238,0.5)' }}>
                                                    {m.lbl}
                                                </div>
                                                <div
                                                    className="font-['Archivo'] font-black text-sm"
                                                    style={{ color: C.bg }}>
                                                    {m.val}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Why ───────────────────────────────────────────────────────── */
function Why() {
    return (
        <section className="py-24 sm:py-16" id="why" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[64px] items-center">
                    {/* Photo */}
                    <div
                        className="rounded-[24px] bg-cover bg-center relative overflow-hidden"
                        style={{
                            aspectRatio: '1',
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&q=80&auto=format&fit=crop)',
                        }}>
                        <div
                            className="absolute bottom-6 left-6 rounded-[16px] p-[18px_22px] max-w-[240px]"
                            style={{ background: C.accent, color: '#fff' }}>
                            <em
                                className="not-italic block text-[11px] tracking-[0.16em] mb-1.5"
                                style={{ opacity: 0.85 }}>
                                Our motto
                            </em>
                            <span className="font-['Archivo'] font-black text-sm tracking-[0.04em] uppercase leading-[1.2]">
                                Prevention is
                                <br />
                                better than cure
                            </span>
                        </div>
                    </div>

                    {/* Values */}
                    <div>
                        <Eyebrow>Why train with us</Eyebrow>
                        <h2
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.98] mt-3 mb-7"
                            style={{ fontSize: 'clamp(38px,5vw,64px)', color: C.ink }}>
                            We're not a chain.
                            <br />
                            We're your neighbors.
                        </h2>
                        <div className="flex flex-col gap-1">
                            {VALUES.map((v, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-[56px_1fr] gap-6 py-6 border-t last:border-b"
                                    style={{ borderColor: C.line }}>
                                    <div
                                        className="font-['Archivo'] font-black text-sm tracking-[0.06em]"
                                        style={{ color: C.accent }}>
                                        {v.num}
                                    </div>
                                    <div>
                                        <h4 className="font-['Archivo'] text-black text-[22px] uppercase tracking-[-0.01em] leading-[1.05] m-0 mb-2">
                                            {v.title}
                                        </h4>
                                        <p className="text-sm leading-[1.55] m-0" style={{ color: C.muted }}>
                                            {v.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Pricing ───────────────────────────────────────────────────── */
function Pricing() {
    return (
        <section className="py-24 sm:py-16" id="pricing" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div className="flex flex-wrap items-end justify-between gap-10 mb-12">
                    <div>
                        <Eyebrow>Membership</Eyebrow>
                        <h2
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.95] mt-3 mb-0"
                            style={{ fontSize: 'clamp(38px,5.5vw,76px)', color: C.ink }}>
                            Pick your plan.
                            <br />
                            No fine print.
                        </h2>
                    </div>
                    <p className="max-w-[360px] text-[15px] leading-[1.55]" style={{ color: C.muted }}>
                        Every plan includes a free orientation, locker access, and our beginner-friendly intro program.
                        Inquire at any branch for current promo rates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] items-start">
                    {PLANS.map((p, i) => (
                        <div
                            key={i}
                            className="rounded-[22px] p-8 flex flex-col gap-[18px] relative border transition-all duration-200"
                            style={{
                                background: p.popular ? C.ink : C.card,
                                color: p.popular ? C.bg : C.ink,
                                borderColor: p.popular ? C.ink : C.line,
                                transform: p.popular ? 'scale(1.02)' : undefined,
                            }}>
                            {p.popular && (
                                <div
                                    className="absolute top-[-12px] left-8 font-['Archivo'] font-black text-[10px] tracking-[0.16em] px-3 py-1.5 rounded-full"
                                    style={{ background: C.accent, color: '#fff' }}>
                                    Most Popular
                                </div>
                            )}
                            <h3 className="font-['Archivo'] font-black text-[22px] uppercase tracking-[-0.01em] m-0">
                                {p.name}
                            </h3>
                            <p
                                className="text-[13px] leading-[1.5] -mt-3 m-0"
                                style={{ color: p.popular ? 'rgba(244,242,238,0.7)' : C.muted }}>
                                {p.blurb}
                            </p>
                            <div
                                className="flex items-baseline gap-1.5 py-3 border-b"
                                style={{
                                    borderColor: p.popular ? 'rgba(244,242,238,0.2)' : C.line,
                                    borderStyle: 'dashed',
                                }}>
                                <span className="font-['Archivo'] font-black text-[44px] leading-none tracking-[-0.03em]">
                                    Inquire
                                </span>
                                <span
                                    className="text-[13px]"
                                    style={{ color: p.popular ? 'rgba(244,242,238,0.65)' : C.muted }}>
                                    at branch
                                </span>
                            </div>
                            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 flex-1">
                                {p.list.map((l, j) => (
                                    <li key={j} className="flex gap-2.5 items-start text-sm leading-[1.4]">
                                        <span
                                            className="shrink-0 w-[18px] h-[18px] rounded-full grid place-items-center mt-[1px]"
                                            style={{
                                                background: p.popular ? C.hi : C.accent,
                                                color: p.popular ? C.ink : '#fff',
                                            }}>
                                            <Check />
                                        </span>
                                        {l}
                                    </li>
                                ))}
                            </ul>
                            <Btn
                                variant={p.popular ? 'primary' : 'ink'}
                                onClick={() =>
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }>
                                Inquire
                            </Btn>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── CTA Banner ────────────────────────────────────────────────── */
function CtaBanner({ onMembership }: { onMembership: () => void }) {
    return (
        <section className="pb-24 sm:pb-16" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div
                    className="rounded-[28px] p-[80px_64px] sm:p-[56px_32px] grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center relative overflow-hidden"
                    style={{ background: C.accent, color: '#fff' }}>
                    {/* Decorative circles */}
                    <div
                        className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                    />
                    <div
                        className="absolute right-[60px] top-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    />

                    <div className="relative z-10">
                        <Eyebrow light>Join today</Eyebrow>
                        <h2
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.95] mt-3 mb-0"
                            style={{ fontSize: 'clamp(40px,6vw,92px)', color: '#fff' }}>
                            Your
                            <br />
                            battle starts
                            <br />
                            here.
                        </h2>
                    </div>
                    <div className="relative z-10 flex flex-col gap-5 items-start">
                        <p className="text-base leading-[1.5] m-0 opacity-90">
                            Walk into any branch for a free orientation. We'll show you around, explain how things work,
                            and zero pressure to sign up.
                        </p>
                        <Btn variant="ink" onClick={onMembership}>
                            Become a Member
                        </Btn>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Contact ───────────────────────────────────────────────────── */
function Contact() {
    const [form, setForm] = useState({ name: '', email: '', branch: 'San Miguel', goal: 'Lose weight', msg: '' });
    const [sent, setSent] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    const inputCls = `w-full h-[46px] px-3.5 border rounded-[10px] font-['Archivo'] text-[15px] outline-none transition-colors duration-150 focus:border-[#0A0A0A]`;

    return (
        <section className="py-24 sm:py-16" id="contact" style={{ background: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div className="flex flex-wrap items-end justify-between gap-10 mb-12">
                    <div>
                        <Eyebrow>Get in touch</Eyebrow>
                        <h2
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.95] mt-3 mb-0"
                            style={{ fontSize: 'clamp(38px,5.5vw,76px)', color: C.ink }}>
                            Drop in.
                            <br />
                            Or drop us a line.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Info */}
                    <div className="flex flex-col gap-[18px]">
                        {[
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                ),
                                lbl: 'Mother Branch',
                                val: 'Pinagsama Village, Taguig City — Open 24 hours',
                            },
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                ),
                                lbl: 'Phone',
                                val: '+63 923 970 3709',
                            },
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 7l-10 6L2 7" />
                                    </svg>
                                ),
                                lbl: 'Email',
                                val: 'karlm.roxas@gmail.com',
                            },
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                ),
                                lbl: 'Hours',
                                val: '24/7 at Any Branches',
                            },
                        ].map(r => (
                            <div
                                key={r.lbl}
                                className="grid grid-cols-[28px_1fr] gap-4 items-start py-[18px] border-t last:border-b"
                                style={{ borderColor: C.line }}>
                                <span style={{ color: C.muted }}>{r.icon}</span>
                                <div>
                                    <div
                                        className="text-[11px] font-bold tracking-[0.14em] uppercase mb-1"
                                        style={{ color: C.muted }}>
                                        {r.lbl}
                                    </div>
                                    <div className="text-base leading-[1.4] text-black whitespace-pre-line">
                                        {r.val}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="rounded-[22px] p-8 flex flex-col gap-3.5 border"
                        style={{ background: C.card, borderColor: C.line }}>
                        <h3 className="font-['Archivo'] text-black text-[22px] uppercase m-0 mb-2">
                            Book a free orientation
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                            <div>
                                <label
                                    className="text-[11px] font-bold tracking-[0.14em] uppercase block mb-1"
                                    style={{ color: C.muted }}>
                                    Full name
                                </label>
                                <input
                                    required
                                    className={inputCls}
                                    style={{ borderColor: C.line, background: C.bg, color: C.ink }}
                                    placeholder="Juan dela Cruz"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-[11px] font-bold tracking-[0.14em] uppercase block mb-1"
                                    style={{ color: C.muted }}>
                                    Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    className={inputCls}
                                    style={{ borderColor: C.line, background: C.bg, color: C.ink }}
                                    placeholder="you@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                            <div>
                                <label
                                    className="text-[11px] font-bold tracking-[0.14em] uppercase block mb-1"
                                    style={{ color: C.muted }}>
                                    Preferred branch
                                </label>
                                <select
                                    className={inputCls}
                                    style={{ borderColor: C.line, background: C.bg, color: C.ink }}
                                    value={form.branch}
                                    onChange={e => setForm({ ...form, branch: e.target.value })}>
                                    {BRANCHES.map(b => (
                                        <option key={b.name}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    className="text-[11px] font-bold tracking-[0.14em] uppercase block mb-1"
                                    style={{ color: C.muted }}>
                                    Main goal
                                </label>
                                <select
                                    className={inputCls}
                                    style={{ borderColor: C.line, background: C.bg, color: C.ink }}
                                    value={form.goal}
                                    onChange={e => setForm({ ...form, goal: e.target.value })}>
                                    {['Lose weight', 'Build muscle', 'Get stronger', 'Stay active', 'Just curious'].map(
                                        g => (
                                            <option key={g}>{g}</option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                className="text-[11px] font-bold tracking-[0.14em] uppercase block mb-1"
                                style={{ color: C.muted }}>
                                Message (optional)
                            </label>
                            <textarea
                                className={`${inputCls} !h-[100px] py-3 resize-y`}
                                style={{ borderColor: C.line, background: C.bg, color: C.ink }}
                                placeholder="Anything we should know?"
                                value={form.msg}
                                onChange={e => setForm({ ...form, msg: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-3 mt-2">
                            <span className="text-xs" style={{ color: C.muted }}>
                                {sent ? "✓ Got it — we'll reach out within 24h." : 'We reply within one business day.'}
                            </span>
                            <Btn variant="ink" size="sm">
                                Send request
                            </Btn>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

/* ─── Footer ────────────────────────────────────────────────────── */
function Footer() {
    return (
        <footer className="pt-16 pb-8" style={{ background: C.ink, color: C.bg }}>
            <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 mb-14">
                    <div>
                        <div
                            className="font-['Archivo'] font-black uppercase tracking-[-0.02em] leading-[0.92] mb-4"
                            style={{ fontSize: 'clamp(40px,5vw,64px)', color: C.bg }}>
                            Power
                            <br />
                            Flex.
                        </div>
                        <p className="text-sm leading-[1.55] max-w-[320px]" style={{ color: 'rgba(244,242,238,0.65)' }}>
                            Where the real fitness battle begins. A Filipino-grown gym community across Taguig and
                            Pateros.
                        </p>
                    </div>
                    {[
                        {
                            title: 'Explore',
                            links: [
                                { label: 'Services', href: '#services' },
                                { label: 'Branches', href: '#branches' },
                                { label: 'Membership', href: '#pricing' },
                                { label: 'Why us', href: '#why' },
                            ],
                        },
                        {
                            title: 'Branches',
                            links: BRANCHES.map(b => ({ label: `${b.name}, ${b.city}`, href: '#branches' })),
                        },
                        {
                            title: 'Get started',
                            links: [
                                { label: 'Free orientation', href: '#contact' },
                                { label: 'Plans & pricing', href: '#pricing' },
                                { label: 'Contact us', href: '#contact' },
                                {
                                    label: 'Facebook page',
                                    href: 'https://www.facebook.com/pffgTAGUIGSanMiguel',
                                    target: '_blank',
                                },
                            ],
                        },
                    ].map(col => (
                        <div key={col.title}>
                            <h5
                                className="font-['Archivo'] font-black text-[12px] tracking-[0.16em] uppercase m-0 mb-[18px]"
                                style={{ color: 'rgba(244,242,238,0.55)' }}>
                                {col.title}
                            </h5>
                            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                                {col.links.map(l => (
                                    <li key={l.label}>
                                        <Link
                                            to={l.href}
                                            target={(l as { target?: string }).target}
                                            rel={(l as { target?: string }).target ? 'noreferrer' : undefined}
                                            className="text-sm no-underline transition-colors duration-150 hover:text-[#FF5A1F]"
                                            style={{ color: 'rgba(244,242,238,0.85)' }}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div
                    className="flex justify-between flex-wrap gap-4 pt-6 text-xs border-t"
                    style={{ borderColor: 'rgba(244,242,238,0.14)', color: 'rgba(244,242,238,0.5)' }}>
                    <div>© 2026 Power Flex Fitness Gym. All rights reserved.</div>
                    <div className="flex gap-3.5">
                        {[
                            {
                                href: 'https://www.facebook.com/pffgTAGUIGSanMiguel',
                                label: 'Facebook',
                                icon: (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6h3v-6H16l1-3h-3.5V9.5c0-.3.2-.5.5-.5z" />
                                    </svg>
                                ),
                            },
                            {
                                href: 'https://www.facebook.com/pffgTAGUIGSanMiguel',
                                label: 'Instagram',
                                icon: (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                                    </svg>
                                ),
                            },
                            {
                                href: 'https://www.facebook.com/pffgTAGUIGSanMiguel',
                                label: 'TikTok',
                                icon: (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4v3a4 4 0 0 0 4 4v3a7 7 0 0 1-4-1.3V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V4z" />
                                    </svg>
                                ),
                            },
                        ].map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="w-8 h-8 rounded-full border grid place-items-center transition-all duration-150 hover:bg-[#FF5A1F] hover:border-[#FF5A1F] hover:text-white"
                                style={{
                                    borderColor: 'rgba(244,242,238,0.2)',
                                    color: 'rgba(244,242,238,0.85)',
                                }}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─── Keyframe styles injected once ────────────────────────────── */
const STYLES = `
@keyframes pf-pulse {
    0% { transform: scale(1); opacity: .6; }
    100% { transform: scale(1.7); opacity: 0; }
}
.pf-pulse::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: inherit;
    animation: pf-pulse 2s ease-out infinite;
}
@keyframes pf-marquee {
    to { transform: translateX(-50%); }
}
.pf-marquee-track {
    animation: pf-marquee 30s linear infinite;
}
`;

/* ─── Page ──────────────────────────────────────────────────────── */
export default function PowerFlex() {
    useEffect(() => {
        const el = document.createElement('style');
        el.textContent = STYLES;
        el.id = 'pf-styles';
        if (!document.getElementById('pf-styles')) document.head.appendChild(el);
        return () => {
            document.getElementById('pf-styles')?.remove();
        };
    }, []);

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ background: C.bg, fontFamily: "'Archivo', system-ui, -apple-system, sans-serif" }}>
            <Nav onMembership={scrollToPricing} />
            <Hero onMembership={scrollToPricing} />
            <Marquee />
            <Services />
            <Branches />
            <Why />
            <Pricing />
            <CtaBanner onMembership={scrollToPricing} />
            <Contact />
            <Footer />
        </div>
    );
}
