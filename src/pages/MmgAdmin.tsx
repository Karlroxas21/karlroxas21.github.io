import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'dash' | 'analytics' | 'bookings' | 'classes' | 'members' | 'trainers' | 'subs' | 'shop' | 'cms' | 'staff';
type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
type ClassView = 'calendar' | 'list' | 'config';
type ClassItem = {
    id: number;
    day: string;
    start: number;
    dur: number;
    name: string;
    coach: string;
    cap: number;
    booked: number;
    color: string;
};
type Trainer = {
    i: string;
    n: string;
    spec: string;
    certs: string;
    sessions: number;
    rating: number;
    members: number;
    status: 'active' | 'on-leave';
    rate: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
    {
        section: 'Overview',
        items: [
            { id: 'dash' as Tab, label: 'Dashboard', icon: 'dash' },
            { id: 'analytics' as Tab, label: 'Analytics', icon: 'chart' },
        ],
    },
    {
        section: 'Operations',
        items: [
            { id: 'bookings' as Tab, label: 'Court bookings', icon: 'calendar', count: 18 },
            { id: 'classes' as Tab, label: 'Class schedule', icon: 'classes' },
            { id: 'members' as Tab, label: 'Members', icon: 'users', count: 847 },
            { id: 'trainers' as Tab, label: 'Trainers', icon: 'user' },
        ],
    },
    {
        section: 'Commerce',
        items: [
            { id: 'subs' as Tab, label: 'Subscriptions', icon: 'card' },
            { id: 'shop' as Tab, label: 'Shop orders', icon: 'package', count: 6 },
        ],
    },
    {
        section: 'System',
        items: [
            { id: 'cms' as Tab, label: 'Content', icon: 'file' },
            { id: 'staff' as Tab, label: 'Staff', icon: 'settings' },
        ],
    },
];

const PAGE_META: Record<Tab, { title: string; sub: string }> = {
    dash: { title: 'Dashboard', sub: "Today is Friday, May 9 — here's what's happening." },
    analytics: { title: 'Analytics', sub: 'Revenue, retention, and utilization.' },
    bookings: { title: 'Court bookings', sub: 'All reservations across pickleball, badminton, and basketball.' },
    classes: { title: 'Class schedule', sub: 'Weekly classes and instructors.' },
    members: { title: 'Members', sub: '847 active members. Manage profiles and plans.' },
    trainers: { title: 'Trainers', sub: '12 certified coaches.' },
    subs: { title: 'Subscriptions', sub: 'Plan distribution and recurring revenue.' },
    shop: { title: 'Shop orders', sub: 'Apparel orders, inventory, and fulfillment.' },
    cms: { title: 'Content', sub: 'Site copy, banners, and announcements.' },
    staff: { title: 'Staff', sub: 'Admin users and permissions.' },
};

const BOOKING_ROWS = [
    {
        id: 'BK-2841',
        member: 'Marga Cruz',
        init: 'MC',
        sport: 'Pickleball · Court 1',
        date: 'Today · 8–10am',
        amt: '₱400',
        status: 'confirmed',
    },
    {
        id: 'BK-2840',
        member: 'David Lim',
        init: 'DL',
        sport: 'Pickleball · Court 2',
        date: 'Today · 9–11am',
        amt: '₱400',
        status: 'confirmed',
    },
    {
        id: 'BK-2839',
        member: 'Pia Reyes',
        init: 'PR',
        sport: 'Badminton · Court 1',
        date: 'Today · 10–11am',
        amt: '₱200',
        status: 'confirmed',
    },
    {
        id: 'BK-2838',
        member: 'Kai Tan',
        init: 'KT',
        sport: 'Pickleball · Court 1',
        date: 'Today · 11–12pm',
        amt: '₱200',
        status: 'pending',
    },
    {
        id: 'BK-2837',
        member: 'Gabby Sy (walk-in)',
        init: 'GS',
        sport: 'Pickleball · Court 2',
        date: 'Today · 2–4pm',
        amt: '₱500',
        status: 'confirmed',
    },
    {
        id: 'BK-2836',
        member: 'Bea Yap',
        init: 'BY',
        sport: 'Pickleball · Court 1+2',
        date: 'Today · 6–8pm',
        amt: '₱800',
        status: 'confirmed',
    },
    {
        id: 'BK-2835',
        member: 'Mike Co',
        init: 'MC',
        sport: 'Badminton · Court 1',
        date: 'Today · 6–8pm',
        amt: '₱400',
        status: 'confirmed',
    },
    {
        id: 'BK-2834',
        member: 'Pia Reyes',
        init: 'PR',
        sport: 'Badminton · Court 2',
        date: 'Yesterday',
        amt: '₱200',
        status: 'cancelled',
    },
    {
        id: 'BK-2833',
        member: 'Marga Cruz',
        init: 'MC',
        sport: 'Pickleball · Court 1',
        date: 'Yesterday',
        amt: '₱400',
        status: 'confirmed',
    },
] as const;

const MEMBER_ROWS = [
    {
        init: 'MC',
        name: 'Marga Cruz',
        email: 'marga@email.com',
        plan: '12 mo',
        joined: '2022-03',
        spend: '₱32,400',
        status: 'active',
    },
    {
        init: 'DL',
        name: 'David Lim',
        email: 'd.lim@email.com',
        plan: '6 mo',
        joined: '2024-08',
        spend: '₱14,200',
        status: 'active',
    },
    {
        init: 'TS',
        name: 'Tina Solis',
        email: 'tina@email.com',
        plan: '24 mo',
        joined: '2023-01',
        spend: '₱40,200',
        status: 'active',
    },
    {
        init: 'IT',
        name: 'Iggy Tan',
        email: 'iggy@email.com',
        plan: '1 mo',
        joined: '2026-04',
        spend: '₱2,200',
        status: 'active',
    },
    {
        init: 'KT',
        name: 'Kai Tan',
        email: 'kai.t@email.com',
        plan: '12 mo',
        joined: '2024-11',
        spend: '₱11,400',
        status: 'active',
    },
    {
        init: 'BY',
        name: 'Bea Yap',
        email: 'bea@email.com',
        plan: '24 mo',
        joined: '2022-06',
        spend: '₱53,800',
        status: 'active',
    },
    {
        init: 'PR',
        name: 'Pia Reyes',
        email: 'pia@email.com',
        plan: '6 mo',
        joined: '2025-09',
        spend: '₱8,000',
        status: 'expiring',
    },
    {
        init: 'JS',
        name: 'Jana Santos',
        email: 'jana.s@email.com',
        plan: '12 mo',
        joined: '2023-11',
        spend: '₱24,300',
        status: 'active',
    },
    {
        init: 'RC',
        name: 'Rico Cruz',
        email: 'rico@email.com',
        plan: '24 mo',
        joined: '2021-08',
        spend: '₱62,400',
        status: 'active',
    },
    {
        init: 'AL',
        name: 'Anna Lim',
        email: 'anna.l@email.com',
        plan: '1 mo',
        joined: '2026-03',
        spend: '₱2,200',
        status: 'expiring',
    },
    {
        init: 'JC',
        name: 'Jomari Chua',
        email: 'jomari@email.com',
        plan: '6 mo',
        joined: '2025-04',
        spend: '₱12,000',
        status: 'active',
    },
];

const PLAN_COUNTS: Record<string, number> = { '1 mo': 184, '6 mo': 302, '12 mo': 241, '24 mo': 120 };

const TRAINER_ROWS: Trainer[] = [
    {
        i: 'RT',
        n: 'Rey Torres',
        spec: 'MMA / Muay Thai',
        certs: 'WBC, ISKA',
        sessions: 184,
        rating: 4.9,
        members: 38,
        status: 'active',
        rate: '₱1,200/hr',
    },
    {
        i: 'LM',
        n: 'Liz Mendez',
        spec: 'HIIT / Strength',
        certs: 'NASM-CPT',
        sessions: 142,
        rating: 4.8,
        members: 29,
        status: 'active',
        rate: '₱1,000/hr',
    },
    {
        i: 'MD',
        n: 'Mark Dela Cruz',
        spec: 'BJJ',
        certs: 'IBJJF Black Belt',
        sessions: 96,
        rating: 5.0,
        members: 21,
        status: 'active',
        rate: '₱1,500/hr',
    },
    {
        i: 'TS',
        n: 'Tina Soriano',
        spec: 'Yoga / Mobility',
        certs: 'RYT-500',
        sessions: 124,
        rating: 4.7,
        members: 34,
        status: 'active',
        rate: '₱900/hr',
    },
    {
        i: 'JR',
        n: 'Jomar Reyes',
        spec: 'Boxing',
        certs: 'AIBA Coach',
        sessions: 78,
        rating: 4.8,
        members: 18,
        status: 'active',
        rate: '₱1,000/hr',
    },
    {
        i: 'AC',
        n: 'Anna Co',
        spec: 'Pickleball',
        certs: 'PPR Pro',
        sessions: 64,
        rating: 4.9,
        members: 22,
        status: 'active',
        rate: '₱1,200/hr',
    },
    {
        i: 'BS',
        n: 'Ben Santos',
        spec: 'Strength',
        certs: 'CSCS',
        sessions: 56,
        rating: 4.6,
        members: 15,
        status: 'active',
        rate: '₱950/hr',
    },
    {
        i: 'MC',
        n: 'Mika Cruz',
        spec: 'Pickleball / Badminton',
        certs: 'PPR / BWF L1',
        sessions: 38,
        rating: 4.7,
        members: 12,
        status: 'on-leave',
        rate: '₱1,100/hr',
    },
];

const CLASS_DATA: ClassItem[] = [
    {
        id: 1,
        day: 'Mon',
        start: 6,
        dur: 1.5,
        name: 'MMA Foundations',
        coach: 'Coach Rey',
        cap: 18,
        booked: 16,
        color: '#1e293b',
    },
    {
        id: 2,
        day: 'Mon',
        start: 18,
        dur: 1,
        name: 'Muay Thai',
        coach: 'Coach Rey',
        cap: 20,
        booked: 19,
        color: '#1e293b',
    },
    { id: 3, day: 'Tue', start: 7, dur: 1, name: 'HIIT', coach: 'Coach Liz', cap: 24, booked: 22, color: '#ef4444' },
    {
        id: 4,
        day: 'Tue',
        start: 17,
        dur: 1.5,
        name: 'BJJ Fundamentals',
        coach: 'Coach Mark',
        cap: 16,
        booked: 14,
        color: '#1e293b',
    },
    {
        id: 5,
        day: 'Wed',
        start: 6,
        dur: 1,
        name: 'Yoga Flow',
        coach: 'Coach Tina',
        cap: 20,
        booked: 12,
        color: '#3b82f6',
    },
    {
        id: 6,
        day: 'Wed',
        start: 19,
        dur: 1,
        name: 'Boxing 101',
        coach: 'Coach Rey',
        cap: 16,
        booked: 16,
        color: '#1e293b',
    },
    { id: 7, day: 'Thu', start: 7, dur: 1, name: 'HIIT', coach: 'Coach Liz', cap: 24, booked: 21, color: '#ef4444' },
    {
        id: 8,
        day: 'Thu',
        start: 18,
        dur: 1.5,
        name: 'BJJ Open Mat',
        coach: 'Coach Mark',
        cap: 20,
        booked: 11,
        color: '#1e293b',
    },
    {
        id: 9,
        day: 'Fri',
        start: 6,
        dur: 1.5,
        name: 'MMA Foundations',
        coach: 'Coach Rey',
        cap: 18,
        booked: 17,
        color: '#1e293b',
    },
    {
        id: 10,
        day: 'Fri',
        start: 19,
        dur: 1,
        name: 'Strength',
        coach: 'Coach Liz',
        cap: 16,
        booked: 13,
        color: '#ef4444',
    },
    {
        id: 11,
        day: 'Sat',
        start: 9,
        dur: 1.5,
        name: 'Open Sparring',
        coach: 'Coach Rey',
        cap: 24,
        booked: 22,
        color: '#1e293b',
    },
    {
        id: 12,
        day: 'Sat',
        start: 11,
        dur: 1,
        name: 'Pickleball Clinic',
        coach: 'Coach Tina',
        cap: 12,
        booked: 10,
        color: '#16a34a',
    },
    {
        id: 13,
        day: 'Sun',
        start: 10,
        dur: 1,
        name: 'Yoga Flow',
        coach: 'Coach Tina',
        cap: 20,
        booked: 8,
        color: '#3b82f6',
    },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function Icon({ d, size = 16 }: { d: React.ReactNode; size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0, width: size, height: size }}>
            {d}
        </svg>
    );
}

const ICONS = {
    dash: (
        <Icon
            d={
                <>
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </>
            }
        />
    ),
    chart: (
        <Icon
            d={
                <>
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                </>
            }
        />
    ),
    calendar: (
        <Icon
            d={
                <>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </>
            }
        />
    ),
    classes: (
        <Icon
            d={
                <>
                    <path d="M2 12h20" />
                    <path d="M6 8v8" />
                    <path d="M10 5v14" />
                    <path d="M14 8v8" />
                    <path d="M18 5v14" />
                </>
            }
        />
    ),
    users: (
        <Icon
            d={
                <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </>
            }
        />
    ),
    user: (
        <Icon
            d={
                <>
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </>
            }
        />
    ),
    card: (
        <Icon
            d={
                <>
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                </>
            }
        />
    ),
    package: (
        <Icon
            d={
                <>
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                </>
            }
        />
    ),
    file: (
        <Icon
            d={
                <>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                </>
            }
        />
    ),
    settings: (
        <Icon
            d={
                <>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            }
        />
    ),
    search: (
        <Icon
            d={
                <>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </>
            }
        />
    ),
    download: (
        <Icon
            d={
                <>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                </>
            }
        />
    ),
    plus: (
        <Icon
            d={
                <>
                    <path d="M5 12h14M12 5v14" />
                </>
            }
        />
    ),
    more: (
        <Icon
            d={
                <>
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                </>
            }
        />
    ),
    external: (
        <Icon
            d={
                <>
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </>
            }
        />
    ),
    arrowUp: (
        <Icon
            d={
                <>
                    <path d="m18 15-6-6-6 6" />
                </>
            }
            size={12}
        />
    ),
    arrowDown: (
        <Icon
            d={
                <>
                    <path d="m6 9 6 6 6-6" />
                </>
            }
            size={12}
        />
    ),
    close: (
        <Icon
            d={
                <>
                    <path d="M18 6 6 18M6 6l12 12" />
                </>
            }
            size={14}
        />
    ),
};

// ─── Primitives ───────────────────────────────────────────────────────────────

function Avatar({ init, sm }: { init: string; sm?: boolean }) {
    return (
        <span
            className={`inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-700 font-semibold flex-shrink-0 ${sm ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-[11px]'}`}>
            {init}
        </span>
    );
}

const BADGE_CLASSES: Record<BadgeVariant, string> = {
    default: 'bg-slate-900 text-white',
    secondary: 'bg-slate-100 text-slate-700',
    outline: 'border border-slate-200 text-slate-700',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    destructive: 'bg-red-50 text-red-600 border border-red-200',
};

function Badge({ variant = 'default', children }: { variant?: BadgeVariant; children: React.ReactNode }) {
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${BADGE_CLASSES[variant]}`}>
            {children}
        </span>
    );
}

function Btn({
    variant = 'default',
    sm,
    icon,
    children,
    onClick,
    className = '',
    type = 'button',
}: {
    variant?: 'default' | 'outline' | 'ghost';
    sm?: boolean;
    icon?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
}) {
    const base = `inline-flex items-center justify-center gap-2 text-black font-medium transition-colors whitespace-nowrap border ${sm ? 'h-8 text-xs rounded' : 'h-9 text-[13px] rounded-md'} ${icon ? (sm ? 'w-8 px-0' : 'w-9 px-0') : sm ? 'px-3' : 'px-4'}`;
    const variants = {
        default: 'bg-slate-900 text-white border-transparent hover:bg-slate-800',
        outline: 'bg-white border-slate-200 hover:bg-slate-50',
        ghost: 'bg-transparent border-transparent hover:bg-slate-100',
    };
    return (
        <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}

function Tabs({ options, active, onChange }: { options: string[]; active: string; onChange: (v: string) => void }) {
    return (
        <div className="inline-flex bg-slate-100 p-0.5 rounded gap-0.5">
            {options.map(o => (
                <button
                    key={o}
                    onClick={() => onChange(o)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${active === o ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {o}
                </button>
            ))}
        </div>
    );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white border border-slate-200 rounded-lg ${className}`}>{children}</div>;
}

function CardHeader({ children, row }: { children: React.ReactNode; row?: boolean }) {
    return (
        <div className={`p-6 flex gap-1.5 ${row ? 'flex-row items-center justify-between' : 'flex-col'}`}>
            {children}
        </div>
    );
}

function CardContent({ children, flush }: { children: React.ReactNode; flush?: boolean }) {
    return <div className={flush ? '' : 'px-6 pb-6'}>{children}</div>;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Spark({ data }: { data: number[] }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data
        .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 90 - 5}`)
        .join(' ');
    const area = `0,100 ${points} 100,100`;
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points={area} fill="rgba(15,23,42,0.06)" />
            <polyline
                points={points}
                fill="none"
                stroke="rgb(15,23,42)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
    label,
    num,
    delta,
    dir,
    spark,
}: {
    label: string;
    num: string;
    delta: string;
    dir: 'up' | 'down';
    spark: number[];
}) {
    return (
        <Card>
            <div className="p-6">
                <p className="text-[13px] font-medium text-slate-500">{label}</p>
                <p className="text-[28px] text-black font-bold tracking-tight mt-1">{num}</p>
                <p className="text-xs text-slate-500 mt-1">
                    <span className={dir === 'up' ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                        {dir === 'up' ? '↗' : '↘'} {delta}
                    </span>
                </p>
                <div className="h-9 mt-3">
                    <Spark data={spark} />
                </div>
            </div>
        </Card>
    );
}

// ─── Table ────────────────────────────────────────────────────────────────────

function Th({ children, right, center }: { children?: React.ReactNode; right?: boolean; center?: boolean }) {
    return (
        <th
            className={`h-11 px-4 text-xs font-medium text-slate-500 ${right ? 'text-right' : center ? 'text-center' : 'text-left'}`}>
            {children}
        </th>
    );
}

function Td({
    children,
    mono,
    muted,
    right,
    center,
    className = '',
}: {
    children: React.ReactNode;
    mono?: boolean;
    muted?: boolean;
    right?: boolean;
    center?: boolean;
    className?: string;
}) {
    return (
        <td
            className={`py-3.5 px-4 border-b border-slate-100 align-middle ${mono ? 'font-mono text-xs' : ''} ${muted ? 'text-slate-500' : ''} ${right ? 'text-right' : center ? 'text-center' : ''} ${className}`}>
            {children}
        </td>
    );
}

function Tr({ children }: { children: React.ReactNode }) {
    return <tr className="transition-colors hover:bg-slate-50 last:[&>td]:border-0">{children}</tr>;
}

// ─── Court Grid ───────────────────────────────────────────────────────────────

const COURT_GRID_DATA = [
    {
        time: '8:00',
        p1: { label: 'M. Cruz', type: 'solid' },
        p2: null,
        bd: { label: 'T. Solis · clinic', type: 'green' },
        bb: null,
    },
    {
        time: '9:00',
        p1: { label: 'M. Cruz', type: 'solid' },
        p2: { label: 'D. Lim', type: 'solid' },
        bd: { label: 'T. Solis · clinic', type: 'green' },
        bb: null,
    },
    {
        time: '10:00',
        p1: null,
        p2: { label: 'D. Lim', type: 'solid' },
        bd: { label: 'P. Reyes', type: 'solid' },
        bb: { label: 'A. Ramos · 1-on-1', type: 'amber' },
    },
    { time: '11:00', p1: { label: 'K. Tan', type: 'solid' }, p2: null, bd: null, bb: null },
    { time: '14:00', p1: null, p2: { label: 'G. Sy', type: 'solid' }, bd: { label: 'G. Sy', type: 'solid' }, bb: null },
    {
        time: '18:00',
        p1: { label: 'B. Yap', type: 'solid' },
        p2: { label: 'B. Yap', type: 'solid' },
        bd: { label: 'M. Co', type: 'solid' },
        bb: { label: 'Pickup league', type: 'green' },
    },
    {
        time: '19:00',
        p1: { label: 'B. Yap', type: 'solid' },
        p2: { label: 'B. Yap', type: 'solid' },
        bd: { label: 'M. Co', type: 'solid' },
        bb: { label: 'Pickup league', type: 'green' },
    },
] as const;

type CellType = 'solid' | 'green' | 'amber';
const CELL_CLS: Record<CellType, string> = {
    solid: 'bg-slate-900 text-white',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
};

function CourtCell({ data }: { data: { label: string; type: CellType } | null }) {
    if (!data) return <div className="p-2 min-h-[38px] border-r border-b border-slate-100 last:border-r-0" />;
    return (
        <div
            className={`p-2 min-h-[38px] border-r border-b border-slate-100 last:border-r-0 flex items-center text-[11px] font-medium ${CELL_CLS[data.type]}`}>
            {data.label}
        </div>
    );
}

function CourtGrid() {
    return (
        <div
            className="border border-slate-200 rounded overflow-hidden text-xs"
            style={{ display: 'grid', gridTemplateColumns: '60px repeat(4, 1fr)' }}>
            {['Time', 'Pickleball 1', 'Pickleball 2', 'Badminton 1', 'Basketball'].map(h => (
                <div
                    key={h}
                    className="px-2.5 py-2 bg-slate-50 font-medium text-[11px] text-slate-500 border-r border-b border-slate-100 last:border-r-0">
                    {h}
                </div>
            ))}
            {COURT_GRID_DATA.map(row => (
                <>
                    <div
                        key={row.time}
                        className="px-2.5 py-2 bg-slate-50/60 text-[11px] text-slate-400 font-mono border-r border-b border-slate-100 flex items-center">
                        {row.time}
                    </div>
                    <CourtCell data={row.p1} />
                    <CourtCell data={row.p2} />
                    <CourtCell data={row.bd} />
                    <CourtCell data={row.bb} />
                </>
            ))}
        </div>
    );
}

// ─── Revenue Chart ────────────────────────────────────────────────────────────

function RevenueChart() {
    const bars = [58, 62, 60, 68, 72, 76, 74, 80, 88, 92, 98, 104];
    const max = Math.max(...bars);
    return (
        <>
            <div className="flex items-end gap-1.5 h-[200px] pt-4">
                {bars.map((v, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-slate-200 rounded-t relative transition-colors hover:bg-slate-900"
                        style={{ height: `${(v / max) * 100}%`, minHeight: 8 }}>
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono">
                            W{i + 1}
                        </span>
                    </div>
                ))}
            </div>
            <div className="h-6" />
        </>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function SidebarItem({
    label,
    icon,
    count,
    active,
    onClick,
}: {
    label: string;
    icon: React.ReactNode;
    count?: number;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium rounded text-left mb-px transition-colors ${active ? 'text-black bg-slate-300' : 'text-slate-700 hover:bg-slate-50'}`}>
            <span className="text-slate-500">{icon}</span>
            <span className="flex-1">{label}</span>
            {count != null && (
                <span className="ml-auto bg-white border border-slate-200 text-[10px] font-semibold px-1.5 py-px rounded-full text-slate-500">
                    {count}
                </span>
            )}
        </button>
    );
}

function Sidebar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
    return (
        <aside className="bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
            <div className="flex items-center gap-2.5 px-5 py-[18px] border-b border-slate-200">
                <img src={'/images/mmg/mmg-logo.jpg'} className="rounded-md" width={38} />
                <div className="flex flex-col leading-none">
                    <span
                        className="text-[13px] font-bold text-black"
                        style={{ fontFamily: "'Archivo Black', Helvetica, sans-serif", letterSpacing: '-0.5px' }}>
                        MMG Stellar
                    </span>
                    <span
                        className="text-[10px] text-slate-500 mt-0.5"
                        style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            fontStyle: 'italic',
                            fontWeight: 400,
                            letterSpacing: '-0.5px',
                        }}>
                        Admin
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-2 py-3 overflow-y-auto">
                {NAV_GROUPS.map(group => (
                    <div key={group.section}>
                        <p className="px-3 py-1.5 text-[11px] font-medium text-slate-400 tracking-wide">
                            {group.section}
                        </p>
                        {group.items.map(item => (
                            <SidebarItem
                                key={item.id}
                                label={item.label}
                                icon={ICONS[item.icon as keyof typeof ICONS]}
                                count={(item as { count?: number }).count}
                                active={tab === item.id}
                                onClick={() => onTab(item.id)}
                            />
                        ))}
                    </div>
                ))}
            </nav>

            <div className="flex items-center gap-2.5 px-4 py-3 border-t border-slate-200">
                <Avatar init="JM" />
                <div className="flex flex-col leading-tight flex-1 min-w-0">
                    <span className="text-[13px] text-black font-semibold">Joaquin M.</span>
                    <span className="text-[11px] text-slate-500">Owner</span>
                </div>
                <Btn variant="ghost" sm icon>
                    {ICONS.more}
                </Btn>
            </div>
        </aside>
    );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
    const [courtTab, setCourtTab] = useState('Today');
    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <StatCard
                    label="Active members"
                    num="847"
                    delta="+24 this month"
                    dir="up"
                    spark={[42, 48, 51, 50, 56, 60, 64, 68, 72, 78, 80, 84]}
                />
                <StatCard
                    label="MRR"
                    num="₱1.52M"
                    delta="+8.2% MoM"
                    dir="up"
                    spark={[82, 88, 85, 92, 96, 98, 102, 108, 110, 118, 124, 128]}
                />
                <StatCard
                    label="Court utilization"
                    num="74%"
                    delta="+3% WoW"
                    dir="up"
                    spark={[58, 62, 60, 65, 68, 64, 70, 72, 68, 74, 76, 74]}
                />
                <StatCard
                    label="Cancellations"
                    num="12"
                    delta="-5 vs last week"
                    dir="up"
                    spark={[22, 18, 20, 17, 15, 14, 16, 12]}
                />
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <Card>
                    <CardHeader row>
                        <div>
                            <h3 className="text-base text-black font-semibold tracking-tight">
                                Court bookings · today
                            </h3>
                            <p className="text-sm text-slate-500">Live reservations across all surfaces.</p>
                        </div>
                        <Tabs options={['Today', 'Tomorrow', 'Week']} active={courtTab} onChange={setCourtTab} />
                    </CardHeader>
                    <CardContent>
                        <CourtGrid />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 className="text-base text-black font-semibold tracking-tight">Recent activity</h3>
                        <p className="text-sm text-slate-500">Live feed across the site.</p>
                    </CardHeader>
                    <CardContent flush>
                        {[
                            { t: '2m', a: 'M. Cruz', e: 'Booked Pickleball 1, 8–10am' },
                            { t: '14m', a: 'New member', e: 'D. Lim · 12-month plan' },
                            { t: '38m', a: 'B. Yap', e: 'Renewed 24-month subscription' },
                            { t: '1h', a: 'Coach Rey', e: 'Confirmed PT session w/ J. Sy' },
                            { t: '1h', a: 'Shop', e: '3× Stellar Tee · ₱2,670 paid' },
                            { t: '2h', a: 'Cancellation', e: 'P. Reyes · refunded ₱200' },
                        ].map((r, i) => (
                            <div key={i} className="flex gap-3 px-6 py-3.5 border-b border-slate-100 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] text-black font-semibold">{r.a}</p>
                                    <p className="text-[13px] text-slate-500">{r.e}</p>
                                </div>
                                <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">{r.t} ago</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <Card>
                    <CardHeader row>
                        <div>
                            <h3 className="text-base text-black font-semibold tracking-tight">
                                Revenue · last 12 weeks
                            </h3>
                            <p className="text-sm text-slate-500">
                                ₱1,520,400 total · <span className="text-green-600 font-medium">+8.2%</span> vs prior
                                period
                            </p>
                        </div>
                        <Btn variant="outline" sm>
                            {ICONS.download} Export
                        </Btn>
                    </CardHeader>
                    <CardContent>
                        <RevenueChart />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader row>
                        <div>
                            <h3 className="text-base text-black font-semibold tracking-tight">Expiring soon</h3>
                            <p className="text-sm text-slate-500">Memberships ending within 14 days.</p>
                        </div>
                    </CardHeader>
                    <CardContent flush>
                        <table className="w-full text-[13px]">
                            <thead className="border-b border-slate-100">
                                <tr>
                                    <Th>Member</Th>
                                    <Th>Plan</Th>
                                    <Th right>Expires</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { init: 'MC', n: 'Marga Cruz', plan: '12 mo', exp: '3 days' },
                                    { init: 'DL', n: 'David Lim', plan: '6 mo', exp: '6 days' },
                                    { init: 'TS', n: 'Tina Solis', plan: '24 mo', exp: '9 days' },
                                    { init: 'IT', n: 'Iggy Tan', plan: '1 mo', exp: '11 days' },
                                ].map((m, i) => (
                                    <Tr key={i}>
                                        <Td>
                                            <div className="flex items-center text-black gap-2.5">
                                                <Avatar init={m.init} sm />
                                                {m.n}
                                            </div>
                                        </Td>
                                        <Td>
                                            <Badge variant="secondary">{m.plan}</Badge>
                                        </Td>
                                        <Td mono muted right>
                                            {m.exp}
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

// ─── Booking Calendar ─────────────────────────────────────────────────────────

function BookingCalendar() {
    const days = ['MON 5', 'TUE 6', 'WED 7', 'THU 8', 'FRI 9', 'SAT 10', 'SUN 11'];
    const hours = Array.from({ length: 14 }, (_, i) => i + 7);
    const surfaces = ['Pickleball 1', 'Pickleball 2', 'Badminton 1', 'Basketball'];

    function load(d: number, s: number, h: number) {
        const seed = (d * 31 + s * 17 + h * 13) % 11;
        if (seed < 2) return 'pickle';
        if (seed < 4) return 'badminton';
        if (seed < 5) return 'basket';
        if (seed < 6) return 'class';
        return null;
    }

    const colors = {
        pickle: { cell: 'bg-slate-900 text-white', label: 'PB' },
        badminton: { cell: 'bg-green-500 text-white', label: 'BD' },
        basket: { cell: 'bg-amber-400 text-white', label: 'BB' },
        class: { cell: 'bg-slate-100 text-slate-700 border border-slate-200', label: 'CL' },
    };

    const [calTab, setCalTab] = useState('Week');

    return (
        <Card className="mb-4">
            <CardHeader row>
                <div>
                    <h3 className="text-base text-black font-semibold tracking-tight">This week</h3>
                    <p className="text-sm text-slate-500">May 5–11 · 287 bookings · 74% utilization</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-3 text-[11px] text-slate-400 items-center">
                        {(['pickle', 'badminton', 'basket', 'class'] as const).map(k => (
                            <span key={k} className="flex items-center gap-1.5">
                                <span className={`w-2.5 h-2.5 rounded-sm ${colors[k].cell.split(' ')[0]}`} />
                                {k === 'class' ? 'Class/clinic' : k.charAt(0).toUpperCase() + k.slice(1)}
                            </span>
                        ))}
                    </div>
                    <Tabs options={['Day', 'Week', 'Month']} active={calTab} onChange={setCalTab} />
                </div>
            </CardHeader>
            <CardContent>
                <div
                    className="border border-slate-200 rounded overflow-hidden text-[11px]"
                    style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                    <div className="bg-slate-50 border-r border-b border-slate-100" />
                    {days.map((d, i) => (
                        <div
                            key={i}
                            className="px-2 py-2.5 text-center bg-slate-50 border-r border-b border-slate-100 last:border-r-0 text-black font-semibold">
                            {d}
                        </div>
                    ))}
                    {hours.map(h => (
                        <>
                            <div
                                key={`t${h}`}
                                className="px-2 py-1.5 bg-slate-50/60 border-r border-b border-slate-100 font-mono text-slate-400 flex items-center">
                                {String(h).padStart(2, '0')}:00
                            </div>
                            {days.map((_, di) => (
                                <div
                                    key={di}
                                    className="border-r border-b border-slate-100 last:border-r-0 min-h-[26px]"
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                    {surfaces.map((_, si) => {
                                        const k = load(di, si, h);
                                        const c = k ? colors[k as keyof typeof colors] : null;
                                        return (
                                            <div
                                                key={si}
                                                title={k ? `${days[di]} ${h}:00 · ${surfaces[si]}` : ''}
                                                className={`flex items-center justify-center text-[9px] font-semibold transition-opacity hover:opacity-70 cursor-pointer ${c ? c.cell : ''}`}
                                                style={{ borderRight: si < 3 ? '1px solid white' : 'none' }}>
                                                {c ? c.label : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </>
                    ))}
                </div>
                <div className="flex gap-6 mt-4 text-xs text-slate-500">
                    <div>
                        <span className="font-semibold text-slate-700">Peak:</span> Mon–Fri 6–9pm
                    </div>
                    <div>
                        <span className="font-semibold text-slate-700">Quietest:</span> Wed 2–4pm — consider promo
                    </div>
                    <div>
                        <span className="font-semibold text-slate-700">Sub-blocks:</span> Pickleball 1 / Pickleball 2 /
                        Badminton / Basketball
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

const BOOKING_STATUS_BADGE: Record<string, BadgeVariant> = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'destructive',
};

function Bookings() {
    return (
        <>
            <BookingCalendar />
            <Card>
                <CardHeader row>
                    <div>
                        <h3 className="text-base text-black font-semibold tracking-tight">All bookings</h3>
                        <p className="text-sm text-slate-500">Showing latest 9 of 287 records.</p>
                    </div>
                    <div className="flex gap-2">
                        <Btn variant="outline" sm>
                            Filter
                        </Btn>
                        <Btn variant="outline" sm>
                            {ICONS.download} Export
                        </Btn>
                        <Btn sm>{ICONS.plus} New booking</Btn>
                    </div>
                </CardHeader>
                <CardContent flush>
                    <table className="w-full text-[13px]">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <Th>ID</Th>
                                <Th>Member</Th>
                                <Th>Court</Th>
                                <Th>When</Th>
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th />
                            </tr>
                        </thead>
                        <tbody>
                            {BOOKING_ROWS.map(r => (
                                <Tr key={r.id}>
                                    <Td mono muted>
                                        {r.id}
                                    </Td>
                                    <Td>
                                        <div className="flex items-center text-black gap-2.5">
                                            <Avatar init={r.init} sm />
                                            {r.member}
                                        </div>
                                    </Td>
                                    <Td className="text-black">{r.sport}</Td>
                                    <Td muted>{r.date}</Td>
                                    <Td>
                                        <span className="font-medium text-black">{r.amt}</span>
                                    </Td>
                                    <Td>
                                        <Badge variant={BOOKING_STATUS_BADGE[r.status]}>{r.status}</Badge>
                                    </Td>
                                    <Td right>
                                        <Btn variant="ghost" sm icon>
                                            {ICONS.more}
                                        </Btn>
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}

// ─── Members ──────────────────────────────────────────────────────────────────

function Members() {
    const [planFilter, setPlanFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('joined-desc');

    const filtered = MEMBER_ROWS.filter(r => {
        if (planFilter !== 'all' && r.plan !== planFilter) return false;
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;
        if (
            search &&
            !r.name.toLowerCase().includes(search.toLowerCase()) &&
            !r.email.toLowerCase().includes(search.toLowerCase())
        )
            return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sort === 'joined-desc') return b.joined.localeCompare(a.joined);
        if (sort === 'joined-asc') return a.joined.localeCompare(b.joined);
        if (sort === 'spend-desc') return parseInt(b.spend.replace(/\D/g, '')) - parseInt(a.spend.replace(/\D/g, ''));
        if (sort === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const hasFilters = planFilter !== 'all' || statusFilter !== 'all' || search;

    return (
        <Card>
            <CardHeader row>
                <div>
                    <h3 className="text-base text-black font-semibold tracking-tight">
                        {hasFilters ? filtered.length : 847} member{filtered.length === 1 ? '' : 's'}
                        {hasFilters && ' (filtered)'}
                    </h3>
                    <p className="text-sm text-slate-500">Sortable, filterable, exportable.</p>
                </div>
                <div className="flex gap-2">
                    <Btn variant="outline" sm>
                        {ICONS.download} Export CSV
                    </Btn>
                    <Btn sm>{ICONS.plus} Add member</Btn>
                </div>
            </CardHeader>

            <div className="flex gap-3 items-center flex-wrap px-6 pb-4 border-b border-slate-100">
                <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
                    <input
                        className="h-9 pl-8 pr-3 w-60 border border-slate-200 rounded-md text-[13px] outline-none focus:border-slate-400"
                        placeholder="Search name or email…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400">PLAN</span>
                    <Tabs
                        options={['all', '1 mo', '6 mo', '12 mo', '24 mo']}
                        active={planFilter}
                        onChange={setPlanFilter}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400">STATUS</span>
                    <Tabs options={['all', 'active', 'expiring']} active={statusFilter} onChange={setStatusFilter} />
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-[11px] text-black font-medium text-slate-400">SORT</span>
                    <select
                        className="h-8 px-2 text-black border border-slate-200 rounded text-xs outline-none"
                        value={sort}
                        onChange={e => setSort(e.target.value)}>
                        <option value="joined-desc">Newest first</option>
                        <option value="joined-asc">Oldest first</option>
                        <option value="spend-desc">Highest spend</option>
                        <option value="name">Name (A–Z)</option>
                    </select>
                    {hasFilters && (
                        <Btn
                            variant="ghost"
                            sm
                            onClick={() => {
                                setPlanFilter('all');
                                setStatusFilter('all');
                                setSearch('');
                            }}>
                            Clear
                        </Btn>
                    )}
                </div>
            </div>

            <CardContent flush>
                <table className="w-full text-[13px]">
                    <thead className="border-b border-slate-100">
                        <tr>
                            <Th>Member</Th>
                            <Th>Plan</Th>
                            <Th>Member since</Th>
                            <Th>Lifetime spend</Th>
                            <Th>Status</Th>
                            <Th />
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((r, i) => (
                            <Tr key={i}>
                                <Td>
                                    <div className="flex items-center gap-2.5">
                                        <Avatar init={r.init} sm />
                                        <div className="leading-tight">
                                            <div className="text-black font-medium">{r.name}</div>
                                            <div className="text-[11px] text-slate-400 font-mono">{r.email}</div>
                                        </div>
                                    </div>
                                </Td>
                                <Td>
                                    <Badge variant="outline">{r.plan}</Badge>
                                </Td>
                                <Td mono muted>
                                    {r.joined}
                                </Td>
                                <Td>
                                    <span className="text-black font-medium">{r.spend}</span>
                                </Td>
                                <Td>
                                    <Badge variant={r.status === 'active' ? 'success' : 'warning'}>{r.status}</Badge>
                                </Td>
                                <Td right>
                                    <Btn variant="ghost" sm icon>
                                        {ICONS.more}
                                    </Btn>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

function Subs() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <StatCard label="MRR" num="₱1.52M" delta="+8.2%" dir="up" spark={[82, 88, 85, 92, 96, 98, 102, 108]} />
                <StatCard label="Active subs" num="847" delta="+24" dir="up" spark={[42, 48, 51, 56, 60, 64, 68, 72]} />
                <StatCard
                    label="Churn rate"
                    num="2.1%"
                    delta="-0.4%"
                    dir="up"
                    spark={[3.5, 3.2, 2.8, 2.6, 2.5, 2.3, 2.1]}
                />
                <StatCard
                    label="LTV (avg)"
                    num="₱28k"
                    delta="+₱1.2k"
                    dir="up"
                    spark={[24, 24, 25, 25, 26, 26, 27, 28]}
                />
            </div>
            <Card>
                <CardHeader>
                    <h3 className="text-base text-black font-semibold tracking-tight">Plan breakdown</h3>
                    <p className="text-sm text-slate-500">Distribution across subscription tiers.</p>
                </CardHeader>
                <CardContent flush>
                    <table className="w-full text-[13px]">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <Th>Plan</Th>
                                <Th>Members</Th>
                                <Th>% of base</Th>
                                <Th>Rate</Th>
                                <Th right>Monthly contribution</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    plan: '1 month',
                                    count: PLAN_COUNTS['1 mo'],
                                    pct: '21.7%',
                                    rate: '₱2,200/mo',
                                    contrib: '₱404,800',
                                    badge: 'outline' as BadgeVariant,
                                },
                                {
                                    plan: '6 months',
                                    count: PLAN_COUNTS['6 mo'],
                                    pct: '35.7%',
                                    rate: '₱2,000/mo',
                                    contrib: '₱604,000',
                                    badge: 'outline' as BadgeVariant,
                                },
                                {
                                    plan: '12 months',
                                    count: PLAN_COUNTS['12 mo'],
                                    pct: '28.5%',
                                    rate: '₱1,800/mo',
                                    contrib: '₱433,800',
                                    badge: 'default' as BadgeVariant,
                                },
                                {
                                    plan: '24 months',
                                    count: PLAN_COUNTS['24 mo'],
                                    pct: '14.2%',
                                    rate: '₱1,400/mo',
                                    contrib: '₱168,000',
                                    badge: 'secondary' as BadgeVariant,
                                },
                            ].map((r, i) => (
                                <Tr key={i}>
                                    <Td>
                                        <Badge variant={r.badge}>{r.plan}</Badge>
                                    </Td>
                                    <Td className="text-black">{r.count}</Td>
                                    <Td muted>{r.pct}</Td>
                                    <Td className="text-black">{r.rate}</Td>
                                    <Td right>
                                        <span className="text-black font-medium">{r.contrib}</span>
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}

// ─── Analytics ────────────────────────────────────────────────────────────────

function Analytics() {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const revenue = [820, 880, 920, 980, 1050, 1120, 1180, 1240, 1320, 1380, 1450, 1520];
    const newSignups = [38, 42, 51, 47, 56, 62, 58, 71, 68, 74, 82, 89];

    const maxVal = Math.max(...revenue, ...newSignups.map(v => v * 18));

    function pts(data: number[], scale: number): string {
        return data
            .map((v, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = (100 - ((v * scale) / maxVal) * 90 - 5) * 0.6;
                return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(' ');
    }

    const revPts = pts(revenue, 0.6);
    const sigPts = pts(newSignups, 18 * 0.6);

    const utilSlices = [
        { label: 'Pickleball', val: 38, color: '#1e293b' },
        { label: 'Badminton', val: 24, color: '#16a34a' },
        { label: 'Basketball', val: 18, color: '#f59e0b' },
        { label: 'Classes', val: 14, color: '#3b82f6' },
        { label: 'Idle', val: 6, color: '#e2e8f0' },
    ];
    let acc = 0;
    const C = 2 * Math.PI * 40;
    const donut = utilSlices.map(s => {
        const start = acc;
        acc += s.val;
        return { ...s, start };
    });

    const cohorts = [
        { m: 'Dec 2025', vals: [100, 92, 88, 84, 81, 78] },
        { m: 'Jan 2026', vals: [100, 94, 89, 86, 83, null] },
        { m: 'Feb 2026', vals: [100, 91, 87, 84, null, null] },
        { m: 'Mar 2026', vals: [100, 95, 90, null, null, null] },
        { m: 'Apr 2026', vals: [100, 93, null, null, null, null] },
        { m: 'May 2026', vals: [100, null, null, null, null, null] },
    ];

    const heatHours = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'];
    const heatDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heat = heatDays.map((_, di) =>
        heatHours.map((_, hi) => {
            const peak =
                hi === 6 && di < 5
                    ? 95
                    : hi >= 5 && di < 5
                      ? 78
                      : di >= 5 && hi >= 2
                        ? 72
                        : hi <= 1
                          ? 28
                          : 45 + ((di * 7 + hi * 3) % 30);
            return Math.min(99, peak);
        })
    );

    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <StatCard label="Revenue (12mo)" num="₱13.0M" delta="+24.6% YoY" dir="up" spark={revenue} />
                <StatCard label="New signups" num="89" delta="+8 vs Apr" dir="up" spark={newSignups} />
                <StatCard
                    label="Avg. session/wk"
                    num="3.2"
                    delta="+0.4 vs Apr"
                    dir="up"
                    spark={[2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.0, 3.1, 3.2, 3.2]}
                />
                <StatCard
                    label="NPS"
                    num="72"
                    delta="+6"
                    dir="up"
                    spark={[58, 60, 61, 63, 64, 66, 67, 68, 69, 70, 71, 72]}
                />
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <Card>
                    <CardHeader row>
                        <div>
                            <h3 className="text-base text-black font-semibold tracking-tight">
                                Revenue & signups · last 12 months
                            </h3>
                            <p className="text-sm text-slate-500">Dual-axis line chart.</p>
                        </div>
                        <Tabs options={['3M', '6M', '12M', 'All']} active="12M" onChange={() => {}} />
                    </CardHeader>
                    <CardContent>
                        <svg
                            viewBox="0 0 100 60"
                            preserveAspectRatio="none"
                            style={{ width: '100%', height: 260, overflow: 'visible' }}>
                            {[0, 25, 50, 75, 100].map(y => (
                                <line
                                    key={y}
                                    x1="0"
                                    x2="100"
                                    y1={y * 0.6}
                                    y2={y * 0.6}
                                    stroke="#e2e8f0"
                                    strokeWidth="0.2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            ))}
                            <polygon points={`0,60 ${revPts} 100,60`} fill="rgba(15,23,42,0.06)" />
                            <polyline
                                points={revPts}
                                fill="none"
                                stroke="#1e293b"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                            <polyline
                                points={sigPts}
                                fill="none"
                                stroke="#16a34a"
                                strokeWidth="1.5"
                                strokeDasharray="2,2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                        <div
                            className="grid mt-2 text-[10px] text-slate-400 font-mono text-center"
                            style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                            {months.map(m => (
                                <div key={m}>{m}</div>
                            ))}
                        </div>
                        <div className="flex gap-6 mt-4 text-xs text-slate-600">
                            <span className="flex items-center gap-2">
                                <span className="w-4 inline-block" style={{ height: 2, background: '#1e293b' }} />
                                Revenue (₱k)
                            </span>
                            <span className="flex items-center gap-2">
                                <span
                                    className="w-4 inline-block"
                                    style={{ height: 0, borderTop: '2px dashed #16a34a' }}
                                />
                                New signups
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 className="text-base text-black font-semibold tracking-tight">Court utilization mix</h3>
                        <p className="text-sm text-slate-500">Share of booked hours, last 30 days.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-2 pb-4">
                            <div className="relative" style={{ width: 180, height: 180 }}>
                                <svg
                                    viewBox="0 0 100 100"
                                    style={{ width: 180, height: 180, transform: 'rotate(-90deg)' }}>
                                    {donut.map((s, i) => {
                                        const dash = (s.val / 100) * C;
                                        const offset = -(s.start / 100) * C;
                                        return (
                                            <circle
                                                key={i}
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke={s.color}
                                                strokeWidth="14"
                                                strokeDasharray={`${dash} ${C}`}
                                                strokeDashoffset={offset}
                                            />
                                        );
                                    })}
                                    <circle cx="50" cy="50" r="30" fill="white" />
                                </svg>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    style={{ pointerEvents: 'none' }}>
                                    <span className="text-[28px] text-black font-bold tracking-tight">74%</span>
                                    <span className="text-[11px] text-slate-500">utilized</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            {donut.map((s, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-[13px]">
                                    <span
                                        className="w-2.5 h-2.5 rounded-sm  flex-shrink-0"
                                        style={{ background: s.color }}
                                    />
                                    <span className="flex-1 text-black">{s.label}</span>
                                    <span className="font-semibold text-black">{s.val}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <Card>
                    <CardHeader>
                        <h3 className="text-base text-black font-semibold tracking-tight">
                            Hourly utilization heatmap
                        </h3>
                        <p className="text-sm text-slate-500">Avg. % of capacity, last 30 days.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-0.5" style={{ gridTemplateColumns: '48px repeat(8, 1fr)' }}>
                            <div />
                            {heatHours.map(h => (
                                <div key={h} className="text-[10px] text-slate-400 font-mono text-center">
                                    {h}
                                </div>
                            ))}
                            {heatDays.map((d, di) => (
                                <>
                                    <div key={d} className="text-[11px] text-slate-500 font-medium flex items-center">
                                        {d}
                                    </div>
                                    {heatHours.map((_, hi) => {
                                        const v = heat[di][hi];
                                        const op = v / 100;
                                        return (
                                            <div
                                                key={hi}
                                                title={`${d} ${heatHours[hi]}: ${v}%`}
                                                className="rounded flex items-center justify-center text-[10px] font-semibold"
                                                style={{
                                                    height: 30,
                                                    background: `hsl(222 47% 11% / ${op})`,
                                                    color: op > 0.5 ? 'white' : '#0f172a',
                                                }}>
                                                {v}
                                            </div>
                                        );
                                    })}
                                </>
                            ))}
                        </div>
                        <div className="flex justify-end items-center gap-1.5 mt-4 text-[11px] text-slate-500">
                            <span>Less</span>
                            {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1].map(o => (
                                <span
                                    key={o}
                                    className="w-4 rounded-sm"
                                    style={{ height: 12, background: `hsl(222 47% 11% / ${o})` }}
                                />
                            ))}
                            <span>More</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h3 className="text-base text-black font-semibold tracking-tight">Retention cohorts</h3>
                        <p className="text-sm text-slate-500">% retained after N months.</p>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-[11px]">
                            <thead className="border-b border-slate-100">
                                <tr>
                                    <Th>Cohort</Th>
                                    {[0, 1, 2, 3, 4, 5].map(i => (
                                        <Th key={i} center>
                                            M{i}
                                        </Th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cohorts.map((c, i) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                        <td className="py-1.5 px-4 font-mono text-[11px] text-slate-500">{c.m}</td>
                                        {c.vals.map((v, j) => (
                                            <td key={j} className="py-1 px-1 text-center">
                                                {v != null ? (
                                                    <div
                                                        className="rounded font-semibold text-[11px] py-1.5"
                                                        style={{
                                                            background: `hsl(142 76% 36% / ${v / 100})`,
                                                            color: v > 60 ? 'white' : '#0f172a',
                                                        }}>
                                                        {v}
                                                    </div>
                                                ) : (
                                                    <div className="py-1.5 text-slate-300">—</div>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader row>
                    <div>
                        <h3 className="text-base text-black font-semibold tracking-tight">Top revenue sources</h3>
                        <p className="text-sm text-slate-500">Last 30 days.</p>
                    </div>
                    <Btn variant="outline" sm>
                        {ICONS.download} Export
                    </Btn>
                </CardHeader>
                <CardContent flush>
                    <table className="w-full text-[13px]">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <Th>Source</Th>
                                <Th>Volume</Th>
                                <Th>Revenue</Th>
                                <Th>% of total</Th>
                                <Th right>Trend</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    src: 'Subscriptions',
                                    vol: '847',
                                    rev: '₱1,520,400',
                                    pct: '68.4%',
                                    trend: '↗ +8.2%',
                                    up: true,
                                    badge: 'default' as BadgeVariant,
                                },
                                {
                                    src: 'Court reservations',
                                    vol: '1,284',
                                    rev: '₱412,800',
                                    pct: '18.6%',
                                    trend: '↗ +12.1%',
                                    up: true,
                                    badge: 'secondary' as BadgeVariant,
                                },
                                {
                                    src: 'Personal training',
                                    vol: '342',
                                    rev: '₱204,000',
                                    pct: '9.2%',
                                    trend: '↗ +4.8%',
                                    up: true,
                                    badge: 'outline' as BadgeVariant,
                                },
                                {
                                    src: 'Class drop-ins',
                                    vol: '186',
                                    rev: '₱46,500',
                                    pct: '2.1%',
                                    trend: '↘ −2.1%',
                                    up: false,
                                    badge: 'outline' as BadgeVariant,
                                },
                                {
                                    src: 'Shop / apparel',
                                    vol: '89',
                                    rev: '₱37,200',
                                    pct: '1.7%',
                                    trend: '↗ +18.4%',
                                    up: true,
                                    badge: 'outline' as BadgeVariant,
                                },
                            ].map((r, i) => (
                                <Tr key={i}>
                                    <Td>
                                        <Badge variant={r.badge}>{r.src}</Badge>
                                    </Td>
                                    <Td className="text-black">{r.vol}</Td>
                                    <Td>
                                        <span className="font-medium text-black">{r.rev}</span>
                                    </Td>
                                    <Td muted>{r.pct}</Td>
                                    <Td
                                        right
                                        className={r.up ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                                        {r.trend}
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}

// ─── Class Config ─────────────────────────────────────────────────────────────

function ClassConfig() {
    const [autoCancel, setAutoCancel] = useState(true);
    const [waitlist, setWaitlist] = useState(true);
    const [allowDropIn, setAllowDropIn] = useState(true);
    const [policy, setPolicy] = useState('strict');

    const toggles = [
        {
            id: 'wl',
            label: 'Enable waitlist',
            sub: 'Auto-promote when seats open up.',
            val: waitlist,
            setter: setWaitlist,
        },
        {
            id: 'di',
            label: 'Allow drop-in (₱350)',
            sub: 'Non-members can book a single class.',
            val: allowDropIn,
            setter: setAllowDropIn,
        },
        {
            id: 'ac',
            label: 'Auto-cancel below 4 bookings',
            sub: 'Refund all 24h before class.',
            val: autoCancel,
            setter: setAutoCancel,
        },
    ];

    return (
        <div className="px-6 pb-6 pt-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[13px] text-black font-semibold mb-3">Booking policy</h4>
                    {toggles.map(t => (
                        <label
                            key={t.id}
                            className="flex gap-3 py-3 border-b border-slate-100 cursor-pointer last:border-0">
                            <button
                                type="button"
                                onClick={() => t.setter(!t.val)}
                                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5 ${t.val ? 'bg-slate-900' : 'bg-slate-200'}`}>
                                <div
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${t.val ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
                                />
                            </button>
                            <div>
                                <div className="text-[13px] text-black font-medium">{t.label}</div>
                                <div className="text-xs text-slate-500">{t.sub}</div>
                            </div>
                        </label>
                    ))}

                    <h4 className="text-[13px] text-black font-semibold mt-6 mb-3">Cancellation window</h4>
                    <Tabs
                        options={['4h before', '12h before', '24h before']}
                        active={policy === 'flex' ? '4h before' : policy === 'standard' ? '12h before' : '24h before'}
                        onChange={v =>
                            setPolicy(v === '4h before' ? 'flex' : v === '12h before' ? 'standard' : 'strict')
                        }
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        {policy === 'flex' && 'Members can cancel up to 4 hours before class for a full refund.'}
                        {policy === 'standard' && 'Members can cancel up to 12 hours before class for a full refund.'}
                        {policy === 'strict' && 'Members can cancel up to 24 hours before class for a full refund.'}
                    </p>
                </div>

                <div>
                    <h4 className="text-[13px] text-black font-semibold mb-3">Default capacity by class type</h4>
                    {[
                        { type: 'MMA / BJJ / Boxing', cap: 18, color: '#1e293b' },
                        { type: 'HIIT / Strength', cap: 24, color: '#ef4444' },
                        { type: 'Yoga / Mobility', cap: 20, color: '#3b82f6' },
                        { type: 'Court clinic', cap: 12, color: '#16a34a' },
                    ].map(t => (
                        <div key={t.type} className="flex items-center gap-3 py-3 border-b border-slate-100">
                            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: t.color }} />
                            <span className="flex-1 text-[13px] text-black font-medium">{t.type}</span>
                            <input
                                className="h-8 w-20 border border-slate-200 rounded px-2 text-xs outline-none focus:border-slate-400"
                                type="number"
                                defaultValue={t.cap}
                            />
                        </div>
                    ))}

                    <h4 className="text-[13px] text-black font-semibold mt-6 mb-2">Notifications</h4>
                    <div className="p-3 bg-slate-50 rounded-md text-xs text-slate-500 leading-relaxed">
                        Email reminders sent <strong className="text-slate-700">24h</strong> and{' '}
                        <strong className="text-slate-700">1h</strong> before class. SMS reminders enabled for premium
                        members.
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-slate-100">
                <Btn variant="outline" sm>
                    Discard
                </Btn>
                <Btn sm>Save configuration</Btn>
            </div>
        </div>
    );
}

// ─── Classes ──────────────────────────────────────────────────────────────────

function Classes() {
    const [view, setView] = useState<ClassView>('calendar');
    const [edit, setEdit] = useState<ClassItem | null>(null);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 16 }, (_, i) => i + 6);

    return (
        <>
            <Card>
                <CardHeader row>
                    <div>
                        <h3 className="text-base text-black font-semibold tracking-tight">Weekly class schedule</h3>
                        <p className="text-sm text-slate-500">
                            May 11–17 · 13 classes · 199 booked of 248 capacity (80%)
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tabs
                            options={['Calendar', 'List', 'Configure']}
                            active={view === 'calendar' ? 'Calendar' : view === 'list' ? 'List' : 'Configure'}
                            onChange={v => setView(v === 'Calendar' ? 'calendar' : v === 'List' ? 'list' : 'config')}
                        />
                        <Btn sm>{ICONS.plus} Add class</Btn>
                    </div>
                </CardHeader>

                {view === 'calendar' && (
                    <CardContent>
                        <div
                            className="border border-slate-200 rounded overflow-hidden"
                            style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)' }}>
                            <div className="bg-slate-50 border-r border-b border-slate-100" />
                            {days.map((d, i) => (
                                <div
                                    key={d}
                                    className="px-2 py-2.5 text-center bg-slate-50 border-r border-b border-slate-100 last:border-r-0 text-black font-semibold text-[11px]">
                                    {d} {11 + i}
                                </div>
                            ))}
                            {hours.map(h => (
                                <>
                                    <div
                                        key={`t${h}`}
                                        className="px-2 bg-slate-50/60 border-r border-b border-slate-100 font-mono text-[10px] text-slate-400 flex items-start pt-1"
                                        style={{ height: 50 }}>
                                        {String(h).padStart(2, '0')}:00
                                    </div>
                                    {days.map((d, di) => {
                                        const cls = CLASS_DATA.find(c => c.day === d && c.start === h);
                                        return (
                                            <div
                                                key={di}
                                                className="relative border-r border-b border-slate-100 last:border-r-0"
                                                style={{ height: 50 }}>
                                                {cls && (
                                                    <button
                                                        onClick={() => setEdit(cls)}
                                                        className="absolute inset-x-0.5 top-0.5 rounded overflow-hidden text-left text-white"
                                                        style={{ background: cls.color, height: cls.dur * 50 - 4 }}>
                                                        <div className="px-1.5 py-1">
                                                            <div className="text-[11px] text-blackfont-bold leading-tight">
                                                                {cls.name}
                                                            </div>
                                                            <div className="text-[10px] opacity-80">
                                                                {cls.coach} · {cls.booked}/{cls.cap}
                                                            </div>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
                            {[
                                { color: '#1e293b', label: 'MMA / BJJ / Boxing' },
                                { color: '#ef4444', label: 'HIIT / Strength' },
                                { color: '#3b82f6', label: 'Yoga' },
                                { color: '#16a34a', label: 'Court clinics' },
                            ].map(l => (
                                <span key={l.label} className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                                    {l.label}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                )}

                {view === 'list' && (
                    <CardContent flush>
                        <table className="w-full text-[13px]">
                            <thead className="border-b border-slate-100">
                                <tr>
                                    <Th>Class</Th>
                                    <Th>Coach</Th>
                                    <Th>When</Th>
                                    <Th>Booked</Th>
                                    <Th>Capacity</Th>
                                    <Th />
                                </tr>
                            </thead>
                            <tbody>
                                {CLASS_DATA.map(c => (
                                    <Tr key={c.id}>
                                        <Td>
                                            <div className="flex items-center text-black gap-2.5">
                                                <span
                                                    className="w-1 h-6 rounded-sm flex-shrink-0"
                                                    style={{ background: c.color }}
                                                />
                                                {c.name}
                                            </div>
                                        </Td>
                                        <Td className="text-black">{c.coach}</Td>
                                        <Td muted>
                                            {c.day} · {String(c.start).padStart(2, '0')}:00
                                        </Td>
                                        <Td>
                                            <Badge
                                                variant={
                                                    c.booked / c.cap >= 0.95
                                                        ? 'destructive'
                                                        : c.booked / c.cap >= 0.7
                                                          ? 'warning'
                                                          : 'success'
                                                }>
                                                {c.booked}/{c.cap}
                                            </Badge>
                                        </Td>
                                        <Td>
                                            <div className="h-1 bg-slate-100 rounded-full w-20 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${(c.booked / c.cap) * 100}%`,
                                                        background: c.color,
                                                    }}
                                                />
                                            </div>
                                        </Td>
                                        <Td right>
                                            <Btn variant="ghost" sm onClick={() => setEdit(c)}>
                                                Edit
                                            </Btn>
                                        </Td>
                                    </Tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                )}

                {view === 'config' && <ClassConfig />}
            </Card>

            {edit && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
                    onClick={() => setEdit(null)}>
                    <div className="bg-white rounded-lg w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                            <div>
                                <h3 className="text-base text-black font-semibold tracking-tight">{edit.name}</h3>
                                <p className="text-sm text-slate-500">
                                    {edit.day} · {String(edit.start).padStart(2, '0')}:00 · {edit.dur}h
                                </p>
                            </div>
                            <Btn variant="ghost" sm icon onClick={() => setEdit(null)}>
                                {ICONS.close}
                            </Btn>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {[
                                    {
                                        label: 'CLASS NAME',
                                        el: (
                                            <input
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                defaultValue={edit.name}
                                            />
                                        ),
                                    },
                                    {
                                        label: 'COACH',
                                        el: (
                                            <select
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                defaultValue={edit.coach}>
                                                <option>Coach Rey</option>
                                                <option>Coach Liz</option>
                                                <option>Coach Mark</option>
                                                <option>Coach Tina</option>
                                            </select>
                                        ),
                                    },
                                    {
                                        label: 'DAY',
                                        el: (
                                            <select
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                defaultValue={edit.day}>
                                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                                    <option key={d}>{d}</option>
                                                ))}
                                            </select>
                                        ),
                                    },
                                    {
                                        label: 'START',
                                        el: (
                                            <input
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                type="time"
                                                defaultValue={`${String(edit.start).padStart(2, '0')}:00`}
                                            />
                                        ),
                                    },
                                    {
                                        label: 'DURATION (HRS)',
                                        el: (
                                            <input
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                type="number"
                                                step="0.5"
                                                defaultValue={edit.dur}
                                            />
                                        ),
                                    },
                                    {
                                        label: 'CAPACITY',
                                        el: (
                                            <input
                                                className="h-9 w-full border border-slate-200 text-black rounded px-3 text-[13px] outline-none focus:border-slate-400"
                                                type="number"
                                                defaultValue={edit.cap}
                                            />
                                        ),
                                    },
                                ].map(f => (
                                    <div key={f.label}>
                                        <div className="text-[11px] font-medium text-slate-400 mb-1">{f.label}</div>
                                        {f.el}
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md text-[12px] text-slate-500 mb-4">
                                <div className="flex justify-between">
                                    <span>Currently booked</span>
                                    <span className="font-semibold text-slate-700">
                                        {edit.booked} of {edit.cap}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span>Waitlist</span>
                                    <span className="font-semibold text-slate-700">0</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-200">
                            <Btn variant="ghost" sm onClick={() => setEdit(null)}>
                                Cancel
                            </Btn>
                            <Btn variant="outline" sm>
                                Cancel class
                            </Btn>
                            <Btn sm onClick={() => setEdit(null)}>
                                Save changes
                            </Btn>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Trainers ─────────────────────────────────────────────────────────────────

function Trainers() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <StatCard
                    label="Active coaches"
                    num="8"
                    delta="+1 this month"
                    dir="up"
                    spark={[6, 6, 6, 7, 7, 7, 8, 8]}
                />
                <StatCard
                    label="Sessions / mo"
                    num="782"
                    delta="+62 vs Apr"
                    dir="up"
                    spark={[640, 668, 690, 712, 720, 742, 760, 782]}
                />
                <StatCard
                    label="Avg. rating"
                    num="4.8"
                    delta="+0.1"
                    dir="up"
                    spark={[4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8]}
                />
                <StatCard
                    label="PT revenue"
                    num="₱204k"
                    delta="+4.8%"
                    dir="up"
                    spark={[178, 182, 186, 190, 194, 198, 200, 204]}
                />
            </div>
            <Card>
                <CardHeader row>
                    <div>
                        <h3 className="text-base text-black font-semibold tracking-tight">All trainers</h3>
                        <p className="text-sm text-slate-500">8 active · 1 on leave · 0 archived</p>
                    </div>
                    <div className="flex gap-2">
                        <Btn variant="outline" sm>
                            {ICONS.download} Export
                        </Btn>
                        <Btn sm>{ICONS.plus} Add trainer</Btn>
                    </div>
                </CardHeader>
                <CardContent flush>
                    <table className="w-full text-[13px]">
                        <thead className="border-b border-slate-100">
                            <tr>
                                <Th>Trainer</Th>
                                <Th>Specialty</Th>
                                <Th>Certs</Th>
                                <Th>Sessions (30d)</Th>
                                <Th>Rating</Th>
                                <Th>Members</Th>
                                <Th>Rate</Th>
                                <Th>Status</Th>
                                <Th />
                            </tr>
                        </thead>
                        <tbody>
                            {TRAINER_ROWS.map((t, i) => (
                                <Tr key={i}>
                                    <Td>
                                        <div className="flex items-center gap-2.5">
                                            <Avatar init={t.i} sm />
                                            <span className="text-black font-medium">{t.n}</span>
                                        </div>
                                    </Td>
                                    <Td className="text-black">{t.spec}</Td>
                                    <Td mono muted>
                                        {t.certs}
                                    </Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <span className="text-black font-medium min-w-[28px]">{t.sessions}</span>
                                            <div className="h-1 w-14 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-slate-900 rounded-full"
                                                    style={{ width: `${(t.sessions / 200) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <span className="inline-flex text-black items-center gap-1 font-medium">
                                            <span className="text-amber-400 ">★</span>
                                            {t.rating.toFixed(1)}
                                        </span>
                                    </Td>
                                    <Td className="text-black">{t.members}</Td>
                                    <Td>
                                        <span className="text-black font-medium">{t.rate}</span>
                                    </Td>
                                    <Td>
                                        <Badge variant={t.status === 'active' ? 'success' : 'warning'}>
                                            {t.status}
                                        </Badge>
                                    </Td>
                                    <Td right>
                                        <Btn variant="ghost" sm icon>
                                            {ICONS.more}
                                        </Btn>
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function Placeholder({ title }: { title: string }) {
    return (
        <Card>
            <div className="py-20 px-6 text-center">
                <h3 className="text-base text-black font-semibold tracking-tight mb-2">{title}</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                    This view is wired into the system but not designed yet.
                </p>
                <Btn sm>
                    {ICONS.plus} Configure {title.toLowerCase()}
                </Btn>
            </div>
        </Card>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MmgAdmin() {
    const [tab, setTab] = useState<Tab>('dash');
    const meta = PAGE_META[tab];

    const content: Record<Tab, React.ReactNode> = {
        dash: <Dashboard />,
        analytics: <Analytics />,
        bookings: <Bookings />,
        classes: <Classes />,
        members: <Members />,
        trainers: <Trainers />,
        subs: <Subs />,
        shop: <Placeholder title="Shop orders" />,
        cms: <Placeholder title="Content" />,
        staff: <Placeholder title="Staff" />,
    };

    return (
        <>
            {/* Desktop-only guard */}
            <div className="lg:hidden flex flex-col items-center justify-center min-h-screen bg-slate-100 px-6 text-center">
                <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-sm w-full shadow-sm">
                    <div className="text-5xl mb-4">🖥️</div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Desktop Only</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The admin panel is only accessible on desktop screens. Please open this page on a larger device.
                    </p>
                    <Link
                        to="/mmg"
                        className="mt-6 inline-block px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
                        Back to MMG
                    </Link>
                </div>
            </div>

            <div
                className="hidden lg:grid min-h-screen bg-slate-200"
                style={{
                    gridTemplateColumns: '240px 1fr',
                    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
                }}>
                <Sidebar tab={tab} onTab={setTab} />

                <main className="px-8 py-6 pb-16">
                    <div className="flex items-center justify-between gap-6 mb-6 flex-wrap">
                        <div>
                            <h1 className="text-2xl text-black font-bold tracking-tight">{meta.title}</h1>
                            <p className="text-sm text-slate-500 mt-0.5">{meta.sub}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    {ICONS.search}
                                </span>
                                <input
                                    className="h-9 pl-8 pr-10 w-72 text-black border border-slate-200 rounded-md bg-white text-[13px] outline-none focus:border-slate-400"
                                    placeholder="Search…"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-semibold px-1.5 py-0.5 border border-slate-200 rounded bg-slate-100 text-slate-400">
                                    ⌘K
                                </span>
                            </div>
                            <Link to="/mmg">
                                <Btn variant="outline" sm>
                                    {ICONS.external} View site
                                </Btn>
                            </Link>
                        </div>
                    </div>

                    {content[tab]}
                </main>
            </div>
        </>
    );
}
