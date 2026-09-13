import { Reveal, SectionLabel } from './PWPrimitives';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

interface Voice {
    quote: string;
    who: string;
    role: string;
    color: NoteColorKey;
    rot: number;
}

const VOICES: Voice[] = [
    {
        quote: 'The first notes app that made my Windows box feel considered.',
        who: 'Priya N.',
        role: 'Product designer',
        color: 'sky',
        rot: -1.6,
    },
    {
        quote: 'Two brackets and my notes started talking to each other. No plugins.',
        who: 'Tomás R.',
        role: 'Researcher',
        color: 'sage',
        rot: 1.2,
    },
    {
        quote: 'I quit for a month. Came back. Every note was still a plain .md file. That’s trust.',
        who: 'Hannah K.',
        role: 'Writer',
        color: 'butter',
        rot: -0.8,
    },
    {
        quote: 'Pointed it at my Syncthing folder and it just worked. No account, no relay.',
        who: 'Devraj M.',
        role: 'Backend engineer',
        color: 'sand',
        rot: 2,
    },
    {
        quote: 'Roll-up is the feature I didn’t know I needed. Six notes, one line each, top of screen.',
        who: 'Léa B.',
        role: 'Founder',
        color: 'blush',
        rot: -2.2,
    },
    {
        quote: 'Finally something that doesn’t look like a web page pretending to be an app.',
        who: 'Marcus O.',
        role: 'Linux user, 14 yrs',
        color: 'peach',
        rot: 1.5,
    },
    {
        quote: 'Wall sync between my Mac and my work PC just… works. Encrypted, too.',
        who: 'Sofia A.',
        role: 'PM',
        color: 'sky',
        rot: -1,
    },
    {
        quote: 'The colors. Eight hours of them and my eyes are fine.',
        who: 'Jun W.',
        role: 'Illustrator',
        color: 'sage',
        rot: 0.9,
    },
];

function VoiceCard({ v }: { v: Voice }) {
    const c = noteColor(v.color);
    return (
        <figure
            className="m-0 shrink-0 flex flex-col"
            style={{
                width: 300,
                margin: '0 10px',
                padding: '20px 22px 18px',
                borderRadius: 14,
                background: c.bg,
                color: c.ink,
                backgroundImage: PW_GRAIN,
                boxShadow: '0 1px 2px rgba(40,30,20,0.08), 0 12px 28px rgba(40,30,20,0.12)',
                transform: `rotate(${v.rot}deg)`,
            }}>
            <blockquote
                className="m-0 flex-1"
                style={{
                    fontFamily: PW.serif,
                    fontSize: 19,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    textWrap: 'pretty',
                }}>
                “{v.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2" style={{ fontSize: 12 }}>
                <span
                    style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: c.ink,
                        color: c.bg,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                    }}>
                    {v.who[0]}
                </span>
                <span style={{ fontWeight: 600 }}>{v.who}</span>
                <span style={{ opacity: 0.6 }}>· {v.role}</span>
            </figcaption>
        </figure>
    );
}

function Row({ items, reverse, speed }: { items: Voice[]; reverse?: boolean; speed: number }) {
    return (
        <div
            className="pw-marquee overflow-hidden py-3"
            style={{
                maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            }}>
            <div
                className="pw-marquee-track"
                data-reverse={reverse ? '1' : undefined}
                style={{ ['--speed' as string]: `${speed}s` }}>
                {/* Duplicated once so the loop is seamless at -50%. */}
                {[...items, ...items].map((v, i) => (
                    <VoiceCard key={i} v={v} />
                ))}
            </div>
        </div>
    );
}

export default function PWVoices() {
    const first = VOICES.slice(0, 4);
    const second = VOICES.slice(4);
    return (
        <section
            className="py-[90px] md:py-[110px] overflow-hidden"
            style={{ borderTop: '0.5px solid ' + PW.hairline }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8 text-center mb-8">
                <Reveal>
                    <div className="inline-block">
                        <SectionLabel>Voices</SectionLabel>
                    </div>
                </Reveal>
                <Reveal delay={60}>
                    <h2
                        className="m-0 mx-auto"
                        style={{
                            fontFamily: PW.serif,
                            fontWeight: 500,
                            fontSize: 'clamp(30px, 3.8vw, 46px)',
                            lineHeight: 1.05,
                            letterSpacing: '-0.025em',
                            maxWidth: 640,
                            textWrap: 'balance',
                        }}>
                        Loved by people who think with their hands.
                    </h2>
                </Reveal>
            </div>
            <Reveal delay={120}>
                <Row items={first} speed={52} />
                <Row items={second} reverse speed={60} />
            </Reveal>
        </section>
    );
}
