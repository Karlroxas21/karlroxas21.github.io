import { SectionHead } from './PWPrimitives';
import { PW, PW_GRAIN, type NoteColorKey } from '../pwTokens';

export default function PWPalette() {
    const swatches = Object.entries(PW.notes) as [NoteColorKey, (typeof PW.notes)[NoteColorKey]][];
    return (
        <section className="py-[120px]">
            <div className="max-w-[1180px] mx-auto px-8">
                <SectionHead
                    eyebrow="The palette"
                    title="Six colors. All easy on the eyes."
                    kicker="Picked for long sessions and low glare. Muted enough that a wall of them stays calm — saturated enough that you can tell them apart at a glance."
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {swatches.map(([name, c]) => (
                        <div key={name} className="flex flex-col gap-3.5">
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    aspectRatio: '4 / 5',
                                    borderRadius: 12,
                                    background: c.bg,
                                    backgroundImage: PW_GRAIN,
                                    boxShadow:
                                        '0 1px 2px rgba(40,30,20,0.08), 0 14px 28px rgba(40,30,20,0.12), inset 0 0 0 0.5px ' +
                                        c.edge,
                                    padding: '14px 14px',
                                    color: c.ink,
                                }}>
                                <div
                                    style={{
                                        fontSize: 11,
                                        fontFamily: PW.mono,
                                        opacity: 0.55,
                                        letterSpacing: 0.4,
                                    }}>
                                    {name.toUpperCase()}
                                </div>
                                <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                                    <div style={{ fontFamily: PW.mono, fontSize: 11, opacity: 0.75 }}>{c.bg}</div>
                                    <div
                                        style={{
                                            fontFamily: PW.mono,
                                            fontSize: 11,
                                            opacity: 0.55,
                                            marginTop: 2,
                                        }}>
                                        {c.ink}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
