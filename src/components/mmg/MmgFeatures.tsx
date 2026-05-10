import { Link } from 'react-router-dom';

const FEATURES = [
    {
        tag: 'Open courts',
        photo: 'pickleballAndBadminton',
        caption: 'Pickleball · Badminton court',
        title: ['Pickleball ', '&', ' Badminton'],
        serif: true,
        desc: '3 indoor courts. Reserve by the hour, walk-in friendly.',
        link: 'Reserve a court →',
        href: 'courts',
    },
    {
        tag: 'Hardwood',
        photo: 'basketball',
        caption: 'Hardwood · regulation',
        title: 'Basketball',
        desc: 'Regulation full court. Pick-up Tue/Thu 7pm, leagues on weekends.',
        link: 'View schedule →',
        href: 'courts',
    },
    {
        tag: 'Combat',
        photo: 'mma',
        caption: 'MMA · boxing studio',
        title: ['MMA ', '&', ' Boxing'],
        serif: true,
        desc: 'Mon–Sat. Coach Rey, Coach Mio, Coach Jen. Beginners welcome.',
        link: 'Class schedule →',
        href: 'courts',
    },
    {
        tag: 'Weights',
        photo: 'gym',
        caption: 'Fully equipped gym',
        title: 'Weights, Cardio and Studio',
        desc: 'Free weights, machines, and a dedicated studio space for cardio and group training.',
        link: 'Meet the team →',
        href: '#trainers',
    },
] as const;

const PHOTO_STYLES: Record<string, string> = {
    pickleballAndBadminton: '/images/mmg/pickleball-badminton.jpg',
    basketball: '/images/mmg/full-court.jpg',
    gym: '/images/mmg/gym.jpg',
    mma: '/images/mmg/mma.jpg',
};

export default function MmgFeatures() {
    return (
        <section id="courts" className="mmg-page py-16 sm:py-24" style={{ borderTop: '1px solid rgba(22,20,18,0.12)' }}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-end mb-10 sm:mb-12">
                    <div>
                        <div
                            className="mmg-mono uppercase text-[#6b6259]"
                            style={{ fontSize: 11, letterSpacing: '2px' }}>
                            01 — Inside MMG
                        </div>
                        <h2
                            className="mmg-display"
                            style={{
                                fontSize: 'clamp(32px,4vw,56px)',
                                lineHeight: 1,
                                letterSpacing: '-1px',
                                margin: '8px 0 0',
                            }}>
                            A full club <span className="mmg-serif">under one roof.</span>
                        </h2>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.5, color: '#3d3833', maxWidth: '60ch', margin: 0 }}>
                        Five training surfaces, fifteen weekly classes, and a coaching team that knows your name. Built
                        for the neighborhood, run by people who train here every day.
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                    style={{
                        gap: 1,
                        background: 'rgba(22,20,18,0.12)',
                        border: '1px solid rgba(22,20,18,0.12)',
                    }}>
                    {FEATURES.map((f, i) => (
                        <FeatureCard key={i} feature={f} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
    return (
        <Link
            to={feature.href}
            className="flex flex-col no-underline text-[#161412] transition-colors"
            style={{ background: '#f4ede0' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#ece3d2')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#f4ede0')}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img src={PHOTO_STYLES[feature.photo]} alt={feature.caption} className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.16) 100%)' }}
                />
            </div>
            <span
                className="mmg-mono w-full uppercase"
                style={{
                    fontSize: 11,
                    letterSpacing: '1px',
                    padding: '10px 12px',
                    borderTop: '1px solid rgba(22,20,18,0.12)',
                }}>
                {feature.caption}
            </span>

            <div className="flex flex-col flex-1" style={{ padding: 24 }}>
                <div
                    className="mmg-mono uppercase inline-block"
                    style={{
                        fontSize: 10,
                        letterSpacing: '1.5px',
                        padding: '4px 8px',
                        border: '1px solid rgba(22,20,18,0.25)',
                    }}>
                    {feature.tag}
                </div>

                <h3
                    className="mmg-display"
                    style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.3px', margin: '14px 0 0' }}>
                    {Array.isArray(feature.title) ? (
                        <>
                            {feature.title[0]}
                            <span className="mmg-serif">{feature.title[1]}</span>
                            {feature.title[2]}
                        </>
                    ) : (
                        feature.title
                    )}
                </h3>

                <p style={{ color: '#6b6259', margin: '10px 0 18px', fontSize: 14, lineHeight: 1.5 }}>{feature.desc}</p>

                <span
                    className="mmg-mono uppercase mt-auto"
                    style={{
                        fontSize: 11,
                        letterSpacing: '1.5px',
                        paddingTop: 14,
                        borderTop: '1px solid rgba(22,20,18,0.12)',
                    }}>
                    {feature.link}
                </span>
            </div>
        </Link>
    );
}
