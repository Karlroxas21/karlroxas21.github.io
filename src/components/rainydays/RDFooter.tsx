const NAV_LINKS = [
    { href: '#rd-top', label: 'Home' },
    { href: '#rd-scenarios', label: 'Scenarios' },
    { href: '#rd-how', label: 'How it works' },
    { href: '#rd-why', label: 'Why this exists' },
    { href: '#rd-download', label: 'Download' },
];

export default function RDFooter() {
    return (
        <footer className="bg-[#0A0A0A] text-[#B0B0B0] pt-16 pb-10 border-t border-white/[0.08] sm:pt-12 sm:pb-8">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6">
                <div className="grid gap-12 md:grid-cols-1 md:gap-8" style={{ gridTemplateColumns: '1.5fr 2fr 1fr' }}>
                    <div className="flex flex-col gap-3">
                        <span className="text-white font-bold text-lg">RainyDays</span>
                        <span className="text-sm">Made in the Philippines · Local by default</span>
                    </div>

                    <nav className="flex gap-8 flex-wrap md:justify-start">
                        {NAV_LINKS.map(({ href, label }) => (
                            <a key={href} href={href} className="text-sm hover:text-white transition-colors">
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="text-[13px] text-[#808080] text-right md:text-left">
                        © 2026 · No accounts. No servers.
                    </div>
                </div>
            </div>
        </footer>
    );
}
