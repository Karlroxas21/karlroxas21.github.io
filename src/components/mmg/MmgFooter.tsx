import MmgLogo from './MmgLogo';

const FOOTER_COLS = [
    {
        heading: 'Train',
        items: [
            { label: 'Court booking', href: '#courts' },
            { label: 'Group classes', href: '#classes' },
            { label: 'Personal trainers', href: '#trainers' },
            { label: 'MMA / Boxing', href: '#classes' },
        ],
    },
    {
        heading: 'Visit',
        items: [
            { label: 'Bagong Calzada', href: null },
            { label: 'Taguig City, PH', href: null },
            { label: '+63 923 970 3709', href: null },
            { label: 'karlm.roxas@gmail.com', href: null },
        ],
    },
    {
        heading: 'Account',
        items: [
            { label: 'Membership', href: '#membership' },
            { label: 'Admin login', href: '#' },
            { label: 'Member portal', href: '#' },
            { label: 'FAQ', href: '#' },
        ],
    },
];

export default function MmgFooter() {
    return (
        <footer style={{ background: '#161412', color: '#f4ede0', padding: '72px 40px 32px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: 48,
                    maxWidth: 1440,
                    margin: '0 auto',
                }}>
                <div>
                    <div className="flex items-center gap-2.5">
                        <MmgLogo invert />
                        <span className="flex flex-col leading-none">
                            <span
                                className="mmg-display text-[#f4ede0]"
                                style={{ fontSize: 18, letterSpacing: '-0.5px', lineHeight: 1 }}>
                                STELLAR
                            </span>
                            <span
                                className="mmg-serif text-[#f4ede0]"
                                style={{ fontSize: 10, letterSpacing: '5px', marginTop: 3 }}>
                                GYM
                            </span>
                        </span>
                    </div>
                    <p
                        style={{
                            marginTop: 24,
                            maxWidth: '36ch',
                            opacity: 0.7,
                            fontSize: 14,
                            lineHeight: 1.6,
                        }}>
                        A neighborhood gym for the long haul. Train hard, train often, stay weird.
                    </p>
                </div>

                {FOOTER_COLS.map(col => (
                    <div key={col.heading}>
                        <h4
                            className="mmg-mono uppercase"
                            style={{
                                fontSize: 11,
                                letterSpacing: '2px',
                                opacity: 0.5,
                                margin: '0 0 16px',
                                fontWeight: 500,
                            }}>
                            {col.heading}
                        </h4>
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                fontSize: 14,
                            }}>
                            {col.items.map(item => (
                                <li key={item.label}>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="no-underline text-[#f4ede0] opacity-80 hover:opacity-100 transition-opacity">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <span style={{ opacity: 0.7 }}>{item.label}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div
                className="mmg-mono flex justify-between flex-wrap gap-4"
                style={{
                    maxWidth: 1440,
                    margin: '64px auto 0',
                    paddingTop: 24,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: 11,
                    opacity: 0.5,
                }}>
                <span>© 2026 MMG STELLAR — ALL RIGHTS RESERVED</span>
                <span>BUILT IN TAGUIG</span>
            </div>
        </footer>
    );
}
