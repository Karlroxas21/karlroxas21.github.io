import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Fallback = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="">
            <div className="flex justify-between border border-b">
                <p>KMR</p>
                <div>
                    <div onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</div>
                    <div className="absolute">{menuOpen && <div>test</div>} </div>
                </div>
            </div>
            <div className="p-8 mx-auto">
                {/* HERO SECTION */}
                <div>
                    <p className="text-[#d97706] font-medium text-sm mb-3">Hello I'm</p>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917] mb-4">Karl Marx Roxas</p>
                    <p className="text-xl sm:text-2xl text-[#78716c] font-medium mb-6">
                        Full-Stack AI Software Engineer
                    </p>
                    <p>
                        A software engineer who use AI to optimize work efficiency and enjoys building useful,
                        purposeful website that actually work well. I specialized in Typescript, Java, Spring Boot,
                        React, Angular, and React.js.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <a
                            href="#contact"
                            className="items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-[#fafaf9] text-sm font-medium rounded-lg hover:bg-[#292524] transition-colors">
                            Get in touch
                        </a>
                        <a
                            href="files/resume.pdf"
                            download
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-warm-300 text-[#44403c] text-sm font-medium rounded-lg hover:bg-[#f5f5f4] transition-colors">
                            <Download size={16} />
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fallback;
