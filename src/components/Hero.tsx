import React from 'react';
import { PROFILE } from './data';
import { Link } from 'react-router';
import { useAnalytics } from '../hooks/use-analytics';

const Hero = () => {
    const { trackEvent } = useAnalytics();
    const sections = [
        { n: '01', label: 'About', href: '#about', arrow: '↓' },
        { n: '02', label: 'Work', href: '#work', arrow: '↓' },
        { n: '03', label: 'Writing', href: '#writing', arrow: '↓' },
        { n: '04', label: 'Experience', href: '#exp', arrow: '↓' },
        { n: '05', label: 'Now / OSS', href: '#now', arrow: '↓' },
        { n: '06', label: 'Contact', href: '#contact', arrow: '↓' },
    ];
    return (
        <section className="section relative pt-[calc(var(--pad-y)+40px)] pb-(--pad-y)">
            <div className="shell g12">
                <div className="col-span-12 flex justify-between items-baseline mb-[clamp(36px,6vh,80px)]">
                    <span className="label">- {PROFILE.name}, portfolio &amp; index</span>
                    <span className="label num">N 14.5176° · E 121.0509°</span>
                </div>

                <h1 className="hero__title font-['Fraunces'] italic col-span-12 m-0 text-[clamp(64px,13vw,220px)] leading-[0.88] tracking-[-0.045em] text-balance">
                    {PROFILE.tagline}
                </h1>

                <p className="col-span-7 mt-[clamp(40px,6vh,80px)] font-(family-name:--f-body) text-[clamp(20px,1.6vw,26px)] leading-[1.35] tracking-[-0.01em] text-(--fg-2) max-w-[28ch] text-pretty">
                    {PROFILE.sub}
                </p>

                <nav
                    aria-label="Sections"
                    className="col-start-9 col-span-4 mt-[clamp(40px,6vh,80px)] flex flex-col gap-2 font-(family-name:--f-label) text-[12px] tracking-[0.12em] uppercase">
                    {sections.map(s => (
                        <Link
                            key={s.n}
                            to={`${s.href}`}
                            onClick={() => trackEvent(`Navigate ${s.label}`, 'Hero Index', s.href)}
                            className="group grid grid-cols-[28px_1fr_60px] gap-2.5 items-baseline py-2 border-t border-(--hairline) last:border-b transition-[padding,color] duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:pl-3 hover:text-(--accent)">
                            <span className="text-(--fg-3)">{s.n}</span>
                            <span>{s.label}</span>
                            <span className="text-right text-(--fg-3) transition-transform duration-250 group-hover:text-(--accent) group-hover:translate-x-1">
                                {s.arrow}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="shell">
                <div
                    aria-hidden="true"
                    className="marquee__track-parent relative mt-[clamp(80px,12vh,160px)] border-y border-(--rule) overflow-hidden py-3.5 font-(family-name:--f-label) text-[12px] tracking-[0.18em] uppercase text-(--fg-2) whitespace-nowrap">
                    <div className="marquee__track inline-flex gap-12 pl-12 animate-scroll">
                        <span className="inline-flex items-center gap-12">
                            {Array.from({ length: 2 }).map((_, dup) => (
                                <React.Fragment key={dup}>
                                    <span>Available Anytime</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                    <span>Taguig, PH</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                    <span>TypeScript · Java</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                    <span>Previously: Amihan Global Strategies</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                    <span>Open to mid-level &amp; staff roles</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                    <span>Writing at /notes</span>
                                    <span className="sep inline-block w-1.5 h-1.5 rounded-full bg-(--fg)" />
                                </React.Fragment>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
