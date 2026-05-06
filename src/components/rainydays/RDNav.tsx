import { IconCloudRain } from './RDIcons';

export default function RDNav() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 border-b border-[#E5E5E5] h-16 flex items-center backdrop-blur-sm">
            <div className="max-w-[1200px] mx-auto px-20 w-full lg:px-10 sm:px-6 flex items-center justify-between">
                <a href="#rd-top" className="flex items-center gap-2.5 font-bold tracking-[-0.01em] text-[#0A0A0A]">
                    <span className="w-7 h-7 rounded-lg bg-[#0A0A0A] text-white grid place-items-center">
                        <IconCloudRain size={16} strokeWidth={2.2} />
                    </span>
                    <span>RainyDays</span>
                </a>

                <nav className="hidden md:flex gap-8">
                    {[
                        { href: '#rd-scenarios', label: 'Scenarios' },
                        { href: '#rd-how', label: 'How it works' },
                        { href: '#rd-why', label: 'Why this exists' },
                        { href: '#rd-download', label: 'Download' },
                    ].map(({ href, label }) => (
                        <a key={href} href={href} className="rd-nav-link relative text-sm font-semibold text-[#0A0A0A]">
                            {label}
                        </a>
                    ))}
                </nav>

                <a
                    href="#rd-download"
                    className="text-sm font-semibold px-[18px] py-2.5 bg-[#0A0A0A] text-white rounded-[10px] border border-[#0A0A0A] hover:bg-[#1A1A1A] transition-colors sm:px-3.5 sm:py-2 sm:text-xs">
                    Get the app
                </a>
            </div>
        </header>
    );
}
