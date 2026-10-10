import { Reveal, SectionHead } from './PWPrimitives';
import { PW } from '../pwTokens';

/** Widths of the fake code lines in the work window, as % of its width. */
const CODE_LINES = [62, 48, 70, 36, 0, 58, 66, 40, 54, 0, 44, 60, 30];

/** A plain editor window — the work the note has to compete with. Deliberately not any real product. */
function WorkWindow() {
    return (
        <div
            aria-hidden
            style={{
                position: 'absolute',
                left: '4%',
                top: '8%',
                width: '70%',
                height: '82%',
                zIndex: 2,
                borderRadius: 10,
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow:
                    '0 1px 2px rgba(40,30,20,0.08), 0 16px 34px rgba(40,30,20,0.16), inset 0 0 0 0.5px ' +
                    PW.hairlineStrong,
            }}>
            <div
                className="flex items-center"
                style={{
                    height: '9%',
                    padding: '0 4%',
                    background: PW.sidebar,
                    boxShadow: '0 0.5px 0 ' + PW.hairlineStrong,
                    fontSize: 'clamp(8px, 1.1vw, 11px)',
                    color: PW.inkSoft,
                    fontFamily: PW.mono,
                }}>
                main.ts
            </div>
            <div style={{ padding: '5% 6%' }}>
                {CODE_LINES.map((width, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${width}%`,
                            height: 'clamp(4px, 0.7vw, 7px)',
                            marginBottom: 'clamp(5px, 0.9vw, 9px)',
                            marginLeft: i % 4 === 2 ? '8%' : 0,
                            borderRadius: 3,
                            background: width ? 'rgba(44,43,41,0.1)' : 'transparent',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function Scene({ pinned, label, caption }: { pinned: boolean; label: string; caption: string }) {
    return (
        <figure className="m-0">
            <div
                role="img"
                aria-label={label}
                className="relative w-full overflow-hidden"
                style={{
                    aspectRatio: '4 / 3',
                    borderRadius: 16,
                    background: PW.sidebar,
                    boxShadow: 'inset 0 0 0 0.5px ' + PW.hairlineStrong,
                }}>
                <WorkWindow />
                {/* Real captures of the app's note window, unpinned and pinned. */}
                <img
                    src={pinned ? '/postwall/note-pinned.webp' : '/postwall/note-unpinned.webp'}
                    alt=""
                    width={600}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    style={{
                        position: 'absolute',
                        left: '58%',
                        top: '24%',
                        width: '32%',
                        height: 'auto',
                        zIndex: pinned ? 3 : 1,
                        borderRadius: '6%',
                        boxShadow: pinned
                            ? '0 2px 4px rgba(40,30,20,0.12), 0 22px 44px rgba(40,30,20,0.22)'
                            : '0 1px 2px rgba(40,30,20,0.08)',
                    }}
                />
            </div>
            <figcaption className="mt-4" style={{ fontSize: 14, lineHeight: 1.5, color: PW.inkSoft }}>
                <span style={{ fontWeight: 700, color: PW.ink }}>{pinned ? 'After' : 'Before'}:</span> {caption}
            </figcaption>
        </figure>
    );
}

/** The wedge, shown rather than told: the same note, the same desk, one click on the pin apart. */
export default function PWBeforeAfter() {
    return (
        <section id="pw-wedge" className="py-[110px] md:py-[140px]" style={{ scrollMarginTop: 64 }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="Before · after"
                    title="Your note, on top of your work."
                    kicker="Same note, same desk. The only difference is one click on the pin."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <Reveal>
                        <Scene
                            pinned={false}
                            label="A sticky note hidden behind a code editor window"
                            caption="buried behind the window you're working in."
                        />
                    </Reveal>
                    <Reveal delay={90}>
                        <Scene
                            pinned
                            label="The same sticky note pinned above the code editor"
                            caption="pinned on top, always in view."
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
