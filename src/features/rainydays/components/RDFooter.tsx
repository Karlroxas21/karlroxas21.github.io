import { RD_CITATIONS, RD_SECTIONS, type RDCitation } from '../rdTokens';
import { IconArrowRight, IconArrowUp, IconCloudRain } from './RDIcons';
import { SectionLink, Shell } from './RDPrimitives';

export default function RDFooter() {
    return (
        <footer className="border-t border-white/[0.08] bg-[#0A0A0A] pb-8 pt-14 text-[#B0B0B0] md:pb-10 md:pt-16">
            <Shell>
                <div className="grid gap-10 md:grid-cols-[1.4fr_2fr] lg:grid-cols-[1.4fr_2fr_auto]">
                    <div className="flex flex-col gap-3">
                        <span className="flex items-center gap-2.5 text-lg font-bold tracking-[-0.01em] text-white">
                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#0A0A0A]">
                                <IconCloudRain size={16} strokeWidth={2.2} />
                            </span>
                            RainyDays
                        </span>
                        <span className="text-sm">Made in the Philippines · Local by default</span>
                    </div>

                    <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Footer">
                        <SectionLink id="rd-top" className="text-sm transition-colors hover:text-white">
                            Home
                        </SectionLink>
                        {RD_SECTIONS.map(({ id, label }) => (
                            <SectionLink key={id} id={id} className="text-sm transition-colors hover:text-white">
                                {label}
                            </SectionLink>
                        ))}
                    </nav>

                    <SectionLink
                        id="rd-top"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 lg:justify-self-end"
                        aria-label="Back to top">
                        <IconArrowUp size={18} strokeWidth={2} />
                    </SectionLink>
                </div>

                {/* Footnote target: every Cite marker on the page jumps here. */}
                <section id="rd-references" className="mt-12 border-t border-white/[0.08] pt-8">
                    <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#808080]">References</h2>
                    <ol className="mt-5 flex flex-col gap-4">
                        {(RD_CITATIONS as readonly RDCitation[]).map(c => (
                            <li key={c.key} className="flex gap-3 text-sm">
                                <span className="shrink-0 font-mono text-xs text-[#808080]">{c.n}</span>
                                <div className="flex flex-col gap-1">
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="group inline-flex items-center gap-1.5 font-medium text-[#D5D5D5] transition-colors hover:text-white">
                                            {c.label}
                                            <IconArrowRight
                                                size={13}
                                                strokeWidth={2}
                                                className="transition-transform duration-150 group-hover:translate-x-0.5"
                                            />
                                        </a>
                                    ) : (
                                        <span className="font-medium text-[#D5D5D5]">{c.label}</span>
                                    )}
                                    <span className="text-[13px] leading-relaxed text-[#808080]">{c.note}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.08] pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#808080] sm:flex-row sm:items-center sm:justify-between">
                    <span>© 2026 · No accounts. No servers.</span>
                    <span>Not a bank · Not an e-wallet · Not a lender</span>
                </div>
            </Shell>
        </footer>
    );
}
