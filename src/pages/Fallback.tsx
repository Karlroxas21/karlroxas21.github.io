import { locations } from '@constants/index';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';
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

    console.log('workDesc ', workDesc);

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
                        <div
                            onClick={() => {
                                trackDownloadClick();
                            }}>
                            <a
                                href="files/resume.pdf"
                                download
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-warm-300 text-[#44403c] text-sm font-medium rounded-lg hover:bg-[#f5f5f4] transition-colors">
                                <Download size={16} />
                                Download Resume
                            </a>
                        </div>
                    </div>
                    {/* ABOUT */}
                    <div className="mt-8">
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
                    </div>

                    {/* EXPERIENCE */}

                    {/* --- */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#1c1917] mb-2">Experience</h2>
                        <div className="h-1 w-10 bg-[#fbbf24] rounded-full mb-8"></div>
                        <div className="bg-[#fafaf9] border border-warm-200 rounded-xl p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                                <div>
                                    <h3 className="font-semibold text-warm-900">{experience}</h3>
                                    <p className="text-accent-700 text-sm font-medium">{company}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fallback;
