import { RD_PLAY_URL, RD_SECTION, RD_VERSION } from '../rdTokens';
import { IconCheck, IconGoogle } from './RDIcons';
import { Eyebrow, Shell, StoreButton } from './RDPrimitives';

const REQUIREMENTS = ['Android 10 or later', 'No account, no sign-up', 'Free, no ads, no subscription'];

export default function RDDownload() {
    return (
        <section id="rd-download" className={`bg-white ${RD_SECTION}`}>
            <Shell>
                <div className="rd-reveal overflow-hidden rounded-3xl border border-[#E5E5E5] bg-[#F5F5F5]">
                    <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-14 md:p-12 lg:p-16">
                        <div className="flex flex-col gap-5">
                            <Eyebrow>Download</Eyebrow>

                            <h2 className="text-[clamp(30px,4vw,44px)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                                Get RainyDays.
                            </h2>

                            <ul className="flex flex-col gap-2.5">
                                {REQUIREMENTS.map(r => (
                                    <li key={r} className="flex items-center gap-2.5 text-[15px] text-[#2A2A2A]">
                                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0A0A0A] text-white">
                                            <IconCheck size={12} strokeWidth={3} />
                                        </span>
                                        {r}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-2 flex flex-wrap items-center gap-4">
                                <StoreButton
                                    href={RD_PLAY_URL || undefined}
                                    sectionId="rd-download"
                                    icon={<IconGoogle size={22} />}
                                    label="Get it on"
                                    name="Google Play"
                                />
                                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#808080]">
                                    Available now · {RD_VERSION}
                                </span>
                            </div>
                        </div>

                        {/* Vertical version plate: mono detail balancing the checklist column */}
                        <div className="hidden shrink-0 items-center gap-6 md:flex">
                            <span className="h-32 w-px bg-[#E5E5E5]" aria-hidden="true" />
                            <div className="flex flex-col gap-1.5 text-right">
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#808080]">
                                    Built in PH
                                </span>
                                <span className="font-mono text-3xl font-bold tracking-[-0.03em] text-[#0A0A0A]">
                                    {RD_VERSION}
                                </span>
                                <span className="text-xs text-[#808080]">Local by default</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Shell>
        </section>
    );
}
