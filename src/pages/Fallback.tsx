import { locations, techStack } from '@constants/index';
import { Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';

const Fallback = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const trackDownloadClick = () => {
        ReactGA.event({
            category: 'Resume',
            action: 'Downloaded my Resume',
            label: 'Download button in medium-small screens',
        });
    };

    const experience = locations['experience'].children.map(
        item => item.children.find(data => data.id === 11)?.description[0]
    );

    const yearWorking = locations['experience'].children.map(
        item => item.children.find(data => data.id === 11)?.description[1]
    );

    const company = locations['experience'].children.map(
        item => item.children.find(data => data.id === 11)?.description[2]
    );

    // find all work description except for the job title (id 11)
    const workDesc = locations['experience'].children.map(item => item.children.filter(data => data.id !== 11));

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const menuRef = useRef<HTMLDivElement>(null);

    // close menu when clicking outside
    useEffect(() => {
        const handNavClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handNavClickOutside);
            document.addEventListener('touchstart', handNavClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handNavClickOutside);
            document.removeEventListener('touchstart', handNavClickOutside);
        };
    }, [menuOpen]);

    return (
        <>
            <div className="">
                <div className="relative">
                    <div className="flex justify-between py-4 px-8 backdrop-blur-md border-[#e7e5e4]">
                        <p className="text-lg font-semibold tracking-tight text-[#1c1917]">KMR</p>
                        {/* Mobile menu */}
                        <div className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X /> : <Menu />}
                        </div>

                        {menuOpen && (
                            <div
                                id="mobile-menu"
                                ref={menuRef}
                                className="absolute top-full w-full left-0 z-50 border-t border-[#e7e5e4] bg-[#fafaf9] backdrop-blur-md">
                                <ul className="flex flex-col gap-1 px-6 py-4 text-sm text-[#78716c]">
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('about');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('experience');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            Experience
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('skills');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            Skills
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('projects');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            Projects
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('education');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            Education
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('certificates');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917] transition-colors cursor-pointer">
                                            Certificates
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                scrollTo('contact');
                                                setMenuOpen(false);
                                            }}
                                            className="block py-2 hover:text-[#1c1917]transition-colors cursor-pointer">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8 mx-auto">
                    {/* HERO SECTION */}
                    <section id="hero">
                        <p className="text-[#d97706] font-medium text-sm mb-3">Hello I'm</p>
                        <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1917] mb-4">
                            Karl Marx Roxas
                        </p>
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
                                href="mailto:karlm.roxas@gmail.com"
                                className="items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-[#fafaf9] text-sm font-medium rounded-lg hover:bg-[#292524] transition-colors">
                                Get in touch
                            </a>
                            <div
                                onClick={() => {
                                    trackDownloadClick();
                                }}>
                                <a
                                    href="files/resume.pdf"
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#d6d3d1] text-[#44403c] text-sm font-medium rounded-lg hover:bg-[#f5f5f4] transition-colors">
                                    <Download size={16} />
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </section>
                    {/* ABOUT */}
                    <section id="about" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">About</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>
                        {locations['about'].children.map(item =>
                            Array.isArray(item.description) && item.description.length > 0 ? (
                                <div className="text-[#57534e] leading-relaxed mb-4">
                                    {item.description.map((desc, index) => (
                                        <p key={index}>{desc}</p>
                                    ))}
                                </div>
                            ) : null
                        )}
                    </section>

                    {/* EXPERIENCE */}
                    <section id="experience" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Experience</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>
                        <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                                <div>
                                    <h3 className="font-semibold text-[#0c0a09]">{experience}</h3>
                                    <p className="text-[#b45309] text-sm font-medium">{company}</p>
                                </div>
                                <span className="text-sm text-[#a8a29e] whitespace-nowrap">{yearWorking}</span>
                            </div>
                            {workDesc.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                    {group.map(job => (
                                        <div key={job.id}>
                                            <ul className="space-y-2 text-sm text-[#57534e]">
                                                {job.description.map((point, index) => (
                                                    <li className="flex gap-2" key={index}>
                                                        <span className="text-[#f59e0b] mt-1">&#8226;</span>
                                                        {point.startsWith('- ') ? point.substring(2) : point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SKILLS */}
                    <section id="skills" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Skills</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>

                        <div className="flex flex-col gap-4">
                            {techStack.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6">
                                    <p className="text-sm font-semibold text-[#0c0a09] uppercase tracking-wider mb-2">
                                        {item.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.items.map(item => (
                                            <span className="px-3 py-1 text-xs font-medium bg-[#f5f5f4] text-[#44403c] rounded-full border border-[#e7e5e4]">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PROJECTS */}
                    <section id="projects" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Projects</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* TODO: Put this on index.ts constants */}
                            {/* PROJ 1 */}
                            <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6 flex flex-col">
                                <h3 className="font-semibold text-[#1c1917] mb-1">RainyDays Service</h3>
                                <p className="text-sm text-[#78716c] leading-relaxed mb-4 flex-1">
                                    This product is a family emergency fund coordination system designed for countries
                                    with weak healthcare safety nets.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Spring Boot
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        PostgreSQL
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Redis
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Hexagonal Architecture
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        JWT
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        OAuth
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <a
                                        href="https://github.com/Karlroxas21/rainy-days"
                                        target="_blank"
                                        className="text-[#78716c] hover:text-[#0c0a09] transition-colors flex items-center justify-center gap-1">
                                        <Github size={16} />
                                        Code
                                    </a>
                                    {/* <a
                                        href="#"
                                        className="text-[#78716c] hover:text-[#0c0a09] transition-colors flex items-center gap-1">
                                        <SquareArrowUpRight size={16} />
                                        Download
                                    </a> */}
                                </div>
                            </div>

                            {/* PROJ 2 */}
                            <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6 flex flex-col">
                                <h3 className="font-semibold text-[#1c1917] mb-1">RainyDays FE</h3>
                                <p className="text-sm text-[#78716c] leading-relaxed mb-4 flex-1">
                                    This product is a family emergency fund coordination system designed for countries
                                    with weak healthcare safety nets.
                                </p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        React Native
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Expo
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Zustand
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        RESTful API
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-[#fffbeb] text-[#b45309] rounded border border-accent-200">
                                        Typescript
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <a
                                        href="https://github.com/Karlroxas21/rainydaps-app"
                                        target="_blank"
                                        className="text-[#78716c] hover:text-[#0c0a09] transition-colors flex items-center justify-center gap-1">
                                        <Github size={16} />
                                        Code
                                    </a>
                                    {/* <a
                                        href="#"
                                        className="text-[#78716c] hover:text-[#0c0a09] transition-colors flex items-center gap-1">
                                        <SquareArrowUpRight size={16} />
                                        Download
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* EDUCATION */}
                    <section id="education" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Education</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>

                        <div className="space-y-6">
                            <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                    <div>
                                        <h3 className="font-semibold text-[#1c1917]">
                                            Bachelor of Science in Information Technology with Specialization in
                                            Multimedia Arts and Animation
                                        </h3>
                                        <p className="text-[#b45309] text-sm font-medium">
                                            National University Manila, Phillipines
                                        </p>
                                    </div>
                                    <span className="text-sm text-[#a8a29e] whitespace-nowrap">2020 — 2024</span>
                                </div>
                                <p className="text-sm text-[#78716c] mt-2">
                                    Graduated with latin honor; Capstone: Ecotopia A Parallax Enabled Website for
                                    Climate Change Awareness with Interactive Mini Arcade Game
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Certification */}
                    <section id="certificates" className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Certificates</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>

                        <div className="space-y-6">
                            <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                    <div>
                                        <h3 className="font-semibold text-[#1c1917]">Backend Development and APIs</h3>
                                        <p className="text-[#b45309] text-sm font-medium">freeCodeCamp</p>
                                    </div>
                                    <span className="text-sm text-[#a8a29e] whitespace-nowrap">2024</span>
                                </div>
                                <a
                                    href="https://www.freecodecamp.org/certification/fcc28b946f6-a530-4de7-8823-102f7eed7fc8/back-end-development-and-apis"
                                    target="_blank"
                                    className="text-sm text-[#78716c] mt-2">
                                    https://www.freecodecamp.org/certification/fcc28b946f6-a530-4de7-8823-102f7eed7fc8/back-end-development-and-apis{' '}
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
                <section id="contact" className="pt-8 pb-20 px-8 bg-[#f5f5f4]/50">
                    <div className="mx-auto">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Contact</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>

                        <div className="max-w-2xl">
                            <p className="text-[#57534e] leading-relaxed mb-8">
                                I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free
                                to reach out!
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <a
                                    href="mailto:karlm.roxas@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1c1917] text-[#fafaf9] text-sm font-medium rounded-lg hover:bg-[#292524]transition-colors">
                                    <Mail size={14} />
                                    karlm.roxas@gmail.com
                                </a>
                            </div>

                            <div className="flex gap-5">
                                <a
                                    href="https://github.com/Karlroxas21"
                                    target="_blank"
                                    className="text-[#a8a29e] hover:text-[#1c1917] transition-colors"
                                    aria-label="GitHub">
                                    <Github />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/km-roxas/"
                                    target="_blank"
                                    className="text-[#a8a29e] hover:text-[#1c1917] transition-colors"
                                    aria-label="LinkedIn">
                                    <Linkedin />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer className="py-8 px-6 border-t border-[#e7e5e4]">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#a8a29e]">
                    <p>&copy; 2026 Karl Marx Roxas. All rights reserved.</p>
                    <button onClick={scrollToTop} className="hover:text-[#1c1917] cursor-pointer transition-colors">
                        Back to top
                    </button>
                </div>
            </footer>
        </>
    );
};

export default Fallback;
