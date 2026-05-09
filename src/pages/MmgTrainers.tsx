import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../components/mmg/mmg.css';
import MmgNav from '../components/mmg/MmgNav';
import MmgChatbot from '../components/mmg/MmgChatbot';

// ─── Colors ───────────────────────────────────────────────────────────────────

const C = {
    bg: '#f4ede0',
    bg2: '#ece3d2',
    bg3: '#e0d5c0',
    ink: '#161412',
    ink2: '#3d3833',
    ink3: '#6b6259',
    line: 'rgba(22,20,18,0.12)',
    lineStrong: 'rgba(22,20,18,0.25)',
    rust: '#b94e2a',
    moss: '#4d7c3a',
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRAINERS = [
    {
        id: 'rey',
        first: 'Rey',
        last: 'Mendoza',
        tagline: 'Boxing · MMA',
        specialties: ['Boxing', 'MMA'],
        bio: "Former amateur boxing champion (2014, '16). Trains beginners to fight-ready in 90 days. Patient, technical, and relentless on footwork.",
        rate: 1800,
        sessions: '480+',
        years: 9,
        rating: '4.9',
        next: 'Tomorrow 10:00am',
        certs: 'PCAP · ISSA · USA Boxing Coach',
        style: 'warm',
    },
    {
        id: 'mio',
        first: 'Mio',
        last: 'Aquino',
        tagline: 'Strength · Powerlifting',
        specialties: ['Strength', 'Hybrid'],
        bio: 'Programs for raw strength, structural balance, and longevity. Spent 4 years coaching at a powerlifting club in Pasig before joining MMG.',
        rate: 1500,
        sessions: '320+',
        years: 6,
        rating: '5.0',
        next: 'Today 6:00pm',
        certs: 'NSCA-CSCS · USAPL Coach',
        style: '',
    },
    {
        id: 'jen',
        first: 'Jen',
        last: 'Cabrera',
        tagline: 'BJJ · Submission Grappling',
        specialties: ['MMA', 'Mobility'],
        bio: 'Brown belt, two-time PH submission grappling silver. Loves teaching first-timers and building defensive games.',
        rate: 1600,
        sessions: '210+',
        years: 7,
        rating: '4.9',
        next: 'Wed 8:00pm',
        certs: 'IBJJF · NASM-CPT',
        style: 'cool',
    },
    {
        id: 'pia',
        first: 'Pia',
        last: 'Dela Cruz',
        tagline: 'Yoga · Mobility',
        specialties: ['Mobility', 'Recovery'],
        bio: '200-hour RYT. Gentle but precise. Specializes in athletes recovering from injury and desk workers in chronic pain.',
        rate: 1300,
        sessions: '600+',
        years: 11,
        rating: '5.0',
        next: 'Tomorrow 7:00am',
        certs: 'Yoga Alliance RYT-200 · FRCms',
        style: 'cool',
    },
    {
        id: 'joy',
        first: 'Joy',
        last: 'Tanaka',
        tagline: 'Hyrox · Conditioning',
        specialties: ['Conditioning', 'Hybrid'],
        bio: 'Hyrox PH top-30 finisher. Builds hybrid programs for runners who want to lift and lifters who want to run.',
        rate: 1400,
        sessions: '180+',
        years: 4,
        rating: '4.8',
        next: 'Today 7:30pm',
        certs: 'NASM-CPT · Hyrox Trainer',
        style: 'warm',
    },
    {
        id: 'alex',
        first: 'Alex',
        last: 'Ramos',
        tagline: 'Basketball · Skills',
        specialties: ['Basketball', 'Conditioning'],
        bio: 'Former UAAP guard. Skills development for HS / college players + adult pickup hopefuls.',
        rate: 1500,
        sessions: '95+',
        years: 3,
        rating: '4.7',
        next: 'Sat 9:00am',
        certs: 'PBA Skills Cert',
        style: '',
    },
    {
        id: 'tina',
        first: 'Tina',
        last: 'Solis',
        tagline: 'Pickleball Coach',
        specialties: ['Pickleball'],
        bio: 'PH National Pickleball Team alternate. Teaches drills, dinks, and tournament mindset. Will out-rally you.',
        rate: 1500,
        sessions: '140+',
        years: 5,
        rating: '5.0',
        next: 'Tue 6:00pm',
        certs: 'PPR Certified Coach',
        style: 'cool',
    },
    {
        id: 'kai',
        first: 'Kai',
        last: 'Villanueva',
        tagline: 'Strength · Beginner',
        specialties: ['Strength', 'Mobility'],
        bio: 'Specialty: 50+ year-olds, post-rehab clients, and absolute beginners. Slow, safe, and effective.',
        rate: 1200,
        sessions: '410+',
        years: 12,
        rating: '5.0',
        next: 'Tomorrow 9:00am',
        certs: 'ACE-CPT · CES',
        style: 'warm',
    },
    {
        id: 'noel',
        first: 'Noel',
        last: 'Tan',
        tagline: 'Muay Thai',
        specialties: ['Boxing', 'MMA'],
        bio: 'Lumpinee-trained. Sharp clinch work, brutal pad rounds, and warm laughter outside the ring.',
        rate: 1700,
        sessions: '260+',
        years: 8,
        rating: '4.9',
        next: 'Today 8:00pm',
        certs: 'Kru certified · WMC',
        style: '',
    },
];

const FILTERS = [
    'All',
    'Boxing',
    'MMA',
    'Strength',
    'Mobility',
    'Conditioning',
    'Pickleball',
    'Basketball',
    'Hybrid',
    'Recovery',
];

type Trainer = (typeof TRAINERS)[number];

// ─── Photo placeholder ────────────────────────────────────────────────────────

const PHOTO_COLORS: Record<string, { bg: string; text: string }> = {
    warm: { bg: '#d4a57a', text: '#2a1a0a' },
    cool: { bg: '#8aabbf', text: '#0a1a2a' },
    '': { bg: C.bg3, text: C.ink3 },
};

function PhotoPlaceholder({ trainer, minHeight = 240 }: { trainer: Trainer; minHeight?: number }) {
    const colors = PHOTO_COLORS[trainer.style] ?? PHOTO_COLORS[''];
    return (
        <div
            style={{
                background: colors.bg,
                minHeight,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                padding: '12px 14px',
            }}>
            <span
                className="mmg-mono"
                style={{
                    fontSize: 9,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: colors.text,
                    opacity: 0.7,
                }}>
                {trainer.first} {trainer.last} · {trainer.tagline}
            </span>
        </div>
    );
}

// ─── Trainer card ─────────────────────────────────────────────────────────────

function TrainerCard({ trainer, onClick }: { trainer: Trainer; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? C.bg2 : C.bg,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                transition: 'background 0.2s',
            }}>
            <PhotoPlaceholder trainer={trainer} minHeight={220} />

            {/* Specialty tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {trainer.specialties.map(s => (
                    <span
                        key={s}
                        className="mmg-mono"
                        style={{
                            padding: '4px 8px',
                            border: `1px solid ${C.lineStrong}`,
                            fontSize: 9,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            color: C.ink3,
                        }}>
                        {s}
                    </span>
                ))}
            </div>

            {/* Name */}
            <div>
                <span
                    className="mmg-display"
                    style={{ display: 'block', fontSize: 28, lineHeight: 1, letterSpacing: '-0.5px' }}>
                    {trainer.first}
                </span>
                <span className="mmg-serif" style={{ display: 'block', fontSize: 28, lineHeight: 1 }}>
                    {trainer.last}
                </span>
            </div>

            <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.5, margin: 0 }}>{trainer.bio}</p>

            {/* Stats */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 12,
                    paddingTop: 16,
                    borderTop: `1px solid ${C.line}`,
                    marginTop: 'auto',
                }}>
                <div>
                    <span
                        className="mmg-mono"
                        style={{
                            fontSize: 9,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: C.ink3,
                            display: 'block',
                            marginBottom: 4,
                        }}>
                        From
                    </span>
                    <span className="mmg-display" style={{ fontSize: 17, display: 'block', letterSpacing: '-0.3px' }}>
                        ₱{trainer.rate.toLocaleString()}
                    </span>
                </div>
                <div>
                    <span
                        className="mmg-mono"
                        style={{
                            fontSize: 9,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: C.ink3,
                            display: 'block',
                            marginBottom: 4,
                        }}>
                        Rating
                    </span>
                    <span className="mmg-display" style={{ fontSize: 17, display: 'block', letterSpacing: '-0.3px' }}>
                        {trainer.rating}
                    </span>
                </div>
                <div>
                    <span
                        className="mmg-mono"
                        style={{
                            fontSize: 9,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            color: C.ink3,
                            display: 'block',
                            marginBottom: 4,
                        }}>
                        Next
                    </span>
                    <span className="mmg-display" style={{ fontSize: 12, display: 'block' }}>
                        {trainer.next}
                    </span>
                </div>
            </div>

            <button
                onClick={e => {
                    e.stopPropagation();
                    onClick();
                }}
                style={{
                    width: '100%',
                    padding: '12px 18px',
                    background: C.rust,
                    color: C.bg,
                    border: 'none',
                    fontSize: 11,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    fontFamily: 'Manrope, Helvetica, sans-serif',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                Book session →
            </button>
        </div>
    );
}

// ─── Booking modal ────────────────────────────────────────────────────────────

interface FormState {
    name: string;
    email: string;
    goal: string;
    date: string;
    message: string;
}

function TrainerModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
    const [step, setStep] = useState<'contact' | 'sent'>('contact');
    const [form, setForm] = useState<FormState>({ name: '', email: '', goal: '', date: '', message: '' });

    function update(k: keyof FormState, v: string) {
        setForm(f => ({ ...f, [k]: v }));
    }

    const inputStyle: React.CSSProperties = {
        padding: '11px 13px',
        border: `1px solid ${C.lineStrong}`,
        background: C.bg,
        fontFamily: 'Manrope, Helvetica, sans-serif',
        fontSize: 14,
        outline: 'none',
        width: '100%',
        color: C.ink,
        boxSizing: 'border-box',
    };

    const labelStyle: React.CSSProperties = {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 9,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: C.ink3,
        display: 'block',
        marginBottom: 5,
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(22,20,18,0.5)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                animation: 'mmg-fade 0.2s ease',
            }}>
            <style>{`@keyframes mmg-fade { from { opacity: 0 } }`}</style>

            <div
                onClick={e => e.stopPropagation()}
                className="max-[700px]:grid-cols-1"
                style={{
                    background: C.bg,
                    width: '100%',
                    maxWidth: 920,
                    maxHeight: 'calc(100vh - 48px)',
                    overflowY: 'auto',
                    border: `1px solid ${C.ink}`,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    position: 'relative',
                }}>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        background: C.bg,
                        border: `1px solid ${C.ink}`,
                        width: 38,
                        height: 38,
                        cursor: 'pointer',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        color: C.ink,
                    }}>
                    ✕
                </button>

                <PhotoPlaceholder trainer={trainer} minHeight={480} />

                <div
                    style={{
                        padding: '40px 36px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                        overflowY: 'auto',
                    }}>
                    {step === 'contact' ? (
                        <>
                            <div
                                className="mmg-mono"
                                style={{
                                    fontSize: 10,
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    color: C.ink3,
                                }}>
                                {trainer.tagline}
                            </div>
                            <h2 className="mmg-display" style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>
                                {trainer.first} <span className="mmg-serif">{trainer.last}</span>
                            </h2>
                            <p style={{ color: C.ink2, margin: 0, fontSize: 14, lineHeight: 1.5 }}>{trainer.bio}</p>

                            {/* Quick stats */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: 12,
                                    padding: '16px 0',
                                    borderTop: `1px solid ${C.line}`,
                                    borderBottom: `1px solid ${C.line}`,
                                }}>
                                {[
                                    { label: 'Rate', value: `₱${trainer.rate.toLocaleString()}`, sub: '/session' },
                                    { label: 'Experience', value: `${trainer.years} yrs`, sub: '' },
                                    { label: 'Sessions led', value: trainer.sessions, sub: '' },
                                    { label: 'Rating', value: `${trainer.rating}`, sub: ' / 5.0' },
                                ].map(({ label, value, sub }) => (
                                    <div key={label}>
                                        <div
                                            className="mmg-mono"
                                            style={{
                                                fontSize: 9,
                                                letterSpacing: '1.5px',
                                                textTransform: 'uppercase',
                                                color: C.ink3,
                                                marginBottom: 4,
                                            }}>
                                            {label}
                                        </div>
                                        <div className="mmg-display" style={{ fontSize: 20, letterSpacing: '-0.3px' }}>
                                            {value}
                                            {sub && (
                                                <span
                                                    style={{
                                                        fontFamily: 'Manrope, sans-serif',
                                                        fontSize: 11,
                                                        color: C.ink3,
                                                    }}>
                                                    {sub}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Certs */}
                            <div>
                                <div
                                    className="mmg-mono"
                                    style={{
                                        fontSize: 9,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        color: C.ink3,
                                        marginBottom: 6,
                                    }}>
                                    Certifications
                                </div>
                                <div className="mmg-mono" style={{ fontSize: 12 }}>
                                    {trainer.certs}
                                </div>
                            </div>

                            {/* Booking form */}
                            <form
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    paddingTop: 16,
                                    borderTop: `1px solid ${C.line}`,
                                }}
                                onSubmit={e => {
                                    e.preventDefault();
                                    setStep('sent');
                                }}>
                                <div>
                                    <label style={labelStyle}>Your name</label>
                                    <input
                                        required
                                        style={inputStyle}
                                        value={form.name}
                                        onChange={e => update('name', e.target.value)}
                                        placeholder="First, last"
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <input
                                        required
                                        type="email"
                                        style={inputStyle}
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        placeholder="you@email.com"
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <div>
                                        <label style={labelStyle}>Goal</label>
                                        <select
                                            style={inputStyle}
                                            value={form.goal}
                                            onChange={e => update('goal', e.target.value)}>
                                            <option value="">Choose…</option>
                                            <option>Get fit / general</option>
                                            <option>Build strength</option>
                                            <option>Lose weight</option>
                                            <option>Fight prep</option>
                                            <option>Sport-specific</option>
                                            <option>Recovery / mobility</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Preferred date</label>
                                        <input
                                            type="date"
                                            style={inputStyle}
                                            value={form.date}
                                            onChange={e => update('date', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Message (optional)</label>
                                    <textarea
                                        rows={3}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        value={form.message}
                                        onChange={e => update('message', e.target.value)}
                                        placeholder="Anything Coach should know?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '13px 18px',
                                        background: C.rust,
                                        color: C.bg,
                                        border: 'none',
                                        fontSize: 11,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        fontFamily: 'Manrope, Helvetica, sans-serif',
                                        cursor: 'pointer',
                                        marginTop: 4,
                                    }}>
                                    Request session with {trainer.first} →
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                            <div className="mmg-serif" style={{ fontSize: 56, lineHeight: 1, marginBottom: 16 }}>
                                Sent.
                            </div>
                            <p style={{ color: C.ink2, maxWidth: 320, margin: '0 auto 24px', fontSize: 14 }}>
                                Coach {trainer.first} will reply within 24 hours at <strong>{form.email}</strong>.
                            </p>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '12px 24px',
                                    background: 'transparent',
                                    color: C.ink,
                                    border: `1px solid ${C.ink}`,
                                    fontSize: 11,
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    fontFamily: 'Manrope, Helvetica, sans-serif',
                                    cursor: 'pointer',
                                }}>
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MmgTrainers() {
    const [filter, setFilter] = useState('All');
    const [open, setOpen] = useState<Trainer | null>(null);

    const filtered = useMemo(() => {
        if (filter === 'All') return TRAINERS;
        return TRAINERS.filter(t => t.specialties.includes(filter));
    }, [filter]);

    return (
        <div className="mmg-page" style={{ minHeight: '100vh' }}>
            <MmgNav />

            {/* Hero */}
            <section
                style={{ padding: '80px 56px 56px', borderBottom: `1px solid ${C.line}` }}
                className="max-[700px]:!px-5 max-[700px]:!py-10">
                <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                    <div
                        className="mmg-mono"
                        style={{ fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: C.ink3 }}>
                        Coaching · {TRAINERS.length} trainers
                    </div>
                    <h1
                        className="mmg-display"
                        style={{
                            fontSize: 'clamp(48px, 6vw, 88px)',
                            lineHeight: 1,
                            letterSpacing: '-2px',
                            margin: '12px 0 0',
                        }}>
                        Coaches who <span className="mmg-serif">know your name.</span>
                    </h1>
                    <p style={{ marginTop: 24, fontSize: 18, color: C.ink2, maxWidth: 620, lineHeight: 1.5 }}>
                        Every MMG trainer is certified, vetted by our head coach, and trains here daily. Book a
                        60-minute session — ₱1,200 to ₱1,800 depending on coach. Members get one free intro session.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <div
                style={{
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    padding: '20px 56px',
                    borderBottom: `1px solid ${C.line}`,
                    alignItems: 'center',
                }}
                className="max-[700px]:!px-5">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className="mmg-mono"
                        style={{
                            padding: '7px 13px',
                            border: `1px solid ${f === filter ? C.ink : C.lineStrong}`,
                            background: f === filter ? C.ink : 'transparent',
                            color: f === filter ? C.bg : C.ink,
                            fontSize: 10,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}>
                        {f}
                    </button>
                ))}
                <span style={{ flex: 1 }} />
                <span className="mmg-mono" style={{ fontSize: 10, letterSpacing: '1px', color: C.ink3 }}>
                    {filtered.length} TRAINERS
                </span>
            </div>

            {/* Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1,
                    background: C.line,
                    borderBottom: `1px solid ${C.line}`,
                }}
                className="max-[1100px]:!grid-cols-2 max-[700px]:!grid-cols-1">
                {filtered.map(t => (
                    <TrainerCard key={t.id} trainer={t} onClick={() => setOpen(t)} />
                ))}
            </div>

            {/* Back link */}
            <div style={{ padding: '24px 56px', borderTop: `1px solid ${C.line}` }} className="max-[700px]:!px-5">
                <Link
                    to="/mmg"
                    className="mmg-mono"
                    style={{
                        fontSize: 11,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: C.ink3,
                        textDecoration: 'none',
                    }}>
                    ← Back to home
                </Link>
            </div>

            {open && <TrainerModal trainer={open} onClose={() => setOpen(null)} />}

            <MmgChatbot />
        </div>
    );
}
