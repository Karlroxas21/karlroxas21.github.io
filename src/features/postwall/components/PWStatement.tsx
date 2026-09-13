import { useRef, type CSSProperties } from 'react';

import { useScrollProgress } from '../hooks/use-scroll-progress';
import { PW, PW_GRAIN, noteColor, type NoteColorKey } from '../pwTokens';

const SENTENCE = 'Think on paper. Live on screen. Your desk deserved better than a text file.';

/** Background notes: far notes move little, near notes cross the whole viewport. */
const DRIFTERS: { color: NoteColorKey; x: string; y: string; w: number; h: number; rot: number; depth: number }[] = [
    { color: 'butter', x: '4%', y: '18%', w: 150, h: 110, rot: -6, depth: 0.9 },
    { color: 'sky', x: '84%', y: '12%', w: 130, h: 96, rot: 5, depth: 0.5 },
    { color: 'sage', x: '76%', y: '68%', w: 170, h: 120, rot: -3, depth: 1 },
    { color: 'blush', x: '10%', y: '72%', w: 120, h: 90, rot: 7, depth: 0.35 },
    { color: 'peach', x: '50%', y: '84%', w: 110, h: 80, rot: -9, depth: 0.7 },
    { color: 'sand', x: '62%', y: '4%', w: 100, h: 74, rot: 4, depth: 0.2 },
];

/**
 * Pinned manifesto. The wrapper is 220vh tall; the inner panel sticks for one viewport while `--p`
 * scrubs 0→1, revealing one word at a time. Notes drift past at six depths behind the type.
 */
export default function PWStatement() {
    const wrap = useRef<HTMLElement>(null);
    useScrollProgress(wrap, { mode: 'pin', range: [0.05, 0.85] });

    const words = SENTENCE.split(' ');
    const n = words.length;

    return (
        <section
            ref={wrap}
            id="pw-why"
            className="relative"
            style={{ height: '220vh', background: PW.ink, color: PW.paper, scrollMarginTop: 0 }}>
            <div className="sticky top-0 h-[100vh] overflow-hidden flex items-center justify-center">
                {DRIFTERS.map((d, i) => {
                    const c = noteColor(d.color);
                    const travel = 180 + d.depth * 520;
                    const style: CSSProperties = {
                        position: 'absolute',
                        left: d.x,
                        top: d.y,
                        width: d.w,
                        height: d.h,
                        borderRadius: 12,
                        background: c.bg,
                        backgroundImage: PW_GRAIN,
                        opacity: 0.18 + d.depth * 0.5,
                        filter: d.depth < 0.5 ? `blur(${(0.5 - d.depth) * 3}px)` : undefined,
                        transform:
                            `translate3d(0, calc((${travel / 2}px - var(--p, 0) * ${travel}px) * var(--pw-depth, 1)), 0)` +
                            ` rotate(${d.rot}deg)`,
                        willChange: 'transform',
                    };
                    return <div key={i} aria-hidden className="pw-parallax" style={style} />;
                })}

                <div
                    className="relative max-w-[1000px] px-6 md:px-8 text-center"
                    style={{ zIndex: 2, textShadow: '0 2px 30px rgba(26,26,28,0.6)' }}>
                    <div
                        className="uppercase mb-8"
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            color: PW.notes.butter.bg,
                            opacity: 'clamp(0, calc(var(--p, 0) * 6), 1)',
                        }}>
                        Why PostWall
                    </div>
                    <p
                        className="m-0"
                        style={{
                            fontFamily: PW.serif,
                            fontWeight: 400,
                            fontSize: 'clamp(34px, 5.6vw, 76px)',
                            lineHeight: 1.04,
                            letterSpacing: '-0.03em',
                            textWrap: 'balance',
                        }}>
                        {words.map((w, i) => {
                            const start = (i / n) * 0.9;
                            const ramp = n * 0.9;
                            const isAccent = i >= n - 3; // "a text file." lands in butter
                            return (
                                <span
                                    key={i}
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '0.26em',
                                        color: isAccent ? PW.notes.butter.bg : PW.paper,
                                        fontStyle: isAccent ? 'italic' : 'normal',
                                        opacity: `clamp(0.14, calc((var(--p, 0) - ${start.toFixed(3)}) * ${ramp.toFixed(2)} + 0.14), 1)`,
                                        transform: `translate3d(0, calc(clamp(0, 1 - (var(--p, 0) - ${start.toFixed(3)}) * ${ramp.toFixed(2)}, 1) * 0.18em), 0)`,
                                        willChange: 'opacity, transform',
                                    }}>
                                    {w}
                                </span>
                            );
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
}
