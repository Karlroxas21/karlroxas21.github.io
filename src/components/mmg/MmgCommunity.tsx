import { useState, useEffect } from 'react';

const QUOTES = [
    { text: '"Kumpleto ng mga gamit at mababait ang staffs"', cite: "— Marga, member since '26" },
    { text: '"Coach Dan changed how I train."', cite: '— Iggy, MMA' },
    { text: '"The pickleball crew here is unreal."', cite: '— Tina, court regular' },
];

const PHOTOS: { id: string; label: string; col: number; row: number; src: string; pos?: string }[] = [
    {
        id: '1',
        label: 'member photo',
        col: 2,
        row: 2,
        src: '/images/mmg/pickleball-badminton.jpg',
        pos: 'center center',
    },
    { id: '2', label: 'class shot', col: 2, row: 1, src: '/images/mmg/class-shot.png', pos: 'center center' },
    { id: '3', label: 'court action', col: 2, row: 2, src: '/images/mmg/workout-today.png', pos: 'left center' },
    { id: '4', label: 'trainer', col: 1, row: 1, src: '/images/mmg/mma.jpg', pos: 'center center' },
    { id: '5', label: 'event', col: 1, row: 1, src: '/images/mmg/gym.jpg', pos: 'center center' },
    { id: '6', label: 'weights room', col: 2, row: 1, src: '/images/mmg/weights-room.jpeg', pos: 'center center' },
    { id: '7', label: 'lobby', col: 2, row: 1, src: '/images/mmg/full-court.jpg', pos: 'center center' },
];

export default function MmgCommunity() {
    const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox]);

    return (
        <section id="community" style={{ padding: '96px 0', borderTop: '1px solid rgba(22,20,18,0.12)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                <div className="mmg-mono uppercase text-[#6b6259]" style={{ fontSize: 11, letterSpacing: '2px' }}>
                    04 — Community
                </div>
                <h2
                    className="mmg-display"
                    style={{
                        fontSize: 'clamp(32px,4vw,56px)',
                        lineHeight: 1,
                        letterSpacing: '-1px',
                        margin: '8px 0 0',
                    }}>
                    Built by <span className="mmg-serif">our regulars.</span>
                </h2>

                {/* Photo wall */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridAutoRows: 140,
                        gap: 8,
                        marginTop: 48,
                    }}>
                    {PHOTOS.map(p => (
                        <div
                            key={p.id}
                            className="relative overflow-hidden cursor-pointer"
                            style={{
                                gridColumn: `span ${p.col}`,
                                gridRow: `span ${p.row}`,
                                border: '1px solid rgba(22,20,18,0.12)',
                            }}
                            onClick={() => setLightbox({ src: p.src, label: p.label })}>
                            <img
                                src={p.src}
                                alt={p.label}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                style={{ objectPosition: p.pos ?? 'center center' }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.16) 100%)',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 32,
                        marginTop: 64,
                    }}>
                    {QUOTES.map(q => (
                        <blockquote
                            key={q.cite}
                            style={{
                                margin: 0,
                                padding: '32px 24px',
                                border: '1px solid rgba(22,20,18,0.12)',
                                background: '#f4ede0',
                            }}>
                            <p className="mmg-serif" style={{ fontSize: 24, lineHeight: 1.3, margin: '0 0 16px' }}>
                                {q.text}
                            </p>
                            <cite
                                className="mmg-mono uppercase"
                                style={{ fontSize: 11, letterSpacing: '1.5px', color: '#6b6259', fontStyle: 'normal' }}>
                                {q.cite}
                            </cite>
                        </blockquote>
                    ))}
                </div>
            </div>

            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: 'rgba(22,20,18,0.92)' }}
                    onClick={() => setLightbox(null)}>
                    <img
                        src={lightbox.src}
                        alt={lightbox.label}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-6 right-8 mmg-mono uppercase text-[#d8c8a6]"
                        style={{
                            fontSize: 12,
                            letterSpacing: '1.5px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => setLightbox(null)}>
                        Close ✕
                    </button>
                </div>
            )}
        </section>
    );
}
