import { Link } from 'react-router-dom';

const LINKS = [
    { href: '/mmg', label: 'HOME' },
    { href: '/mmg/courts', label: 'COURTS' },
    { href: '/mmg/trainers', label: 'TRAINERS' },
    { href: '/mmg#classes', label: 'CLASSES' },
    { href: '#shop', label: 'SHOP' },
    { href: '/mmg/admin', label: 'ADMIN' },
];

export default function MmgNav() {
    return (
        <header
            className="sticky top-0 z-50 flex items-center px-14 py-[18px] backdrop-blur-sm"
            style={{
                background: '#f4ede0',
                borderBottom: '1px solid rgba(22,20,18,0.12)',
            }}>
            <Link
                to="#"
                className="flex items-center gap-2.5 text-[#161412] no-underline flex-1"
                aria-label="MMG Stellar home">
                {/* <MmgLogo /> */}
                <img src={'/images/mmg/mmg-logo.jpg'} className="rounded-md" width={38} />
                <span className="flex flex-col leading-none">
                    <span className="mmg-display" style={{ fontSize: 18, letterSpacing: '-0.5px', lineHeight: 1 }}>
                        MMG STELLAR
                    </span>
                    <span
                        className="mmg-serif"
                        style={{ fontSize: 10, letterSpacing: '5px', marginTop: 3, fontStyle: 'italic' }}>
                        GYM
                    </span>
                </span>
            </Link>

            <nav className="hidden md:flex gap-7" style={{ fontSize: 13, letterSpacing: '0.5px', fontWeight: 500 }}>
                {LINKS.map(({ href, label }) => (
                    <Link
                        key={label}
                        to={href}
                        className="text-[#161412] no-underline pb-px transition-all"
                        style={{ borderBottom: '1px solid transparent' }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.borderBottomColor = '#161412')}
                        onMouseLeave={e => ((e.target as HTMLElement).style.borderBottomColor = 'transparent')}>
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="flex flex-1 justify-end">
                <Link
                    to="#membership"
                    className="inline-flex items-center no-underline transition-colors"
                    style={{
                        padding: '8px 14px',
                        border: '1px solid #161412',
                        fontSize: 11,
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: '#161412',
                        fontFamily: 'Manrope, Helvetica, sans-serif',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = '#161412';
                        (e.currentTarget as HTMLElement).style.color = '#f4ede0';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = '#161412';
                    }}>
                    BECOME A MEMBER
                </Link>
            </div>
        </header>
    );
}
