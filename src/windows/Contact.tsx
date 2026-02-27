import WindowControls from '@components/WindowControls';
import WindowWrapper from '@hoc/WindowWrapper';
import { Download, Github, Linkedin } from 'lucide-react';

const Chip = ({ text }: { text: string }) => {
    return (
        <div className="bg-[#27a169] rounded-full px-3 py-1 w-fit">
            <p className="text-xs">{text}</p>
        </div>
    );
};

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <h2 className="text-center w-full">Contact</h2>
                <WindowControls target="ubuntu" />
            </div>
            <div className="flex bg-[#1f1e25] w-xl p-5 text-white gap-2 rounded-b-md">
                <img src="/images/karl.png" alt="" className="max-w-32 h-fit" />
                <div className="">
                    <p className="text-md">Karl Marx Roxas</p>
                    <p className="text-md">09239703709</p>
                    <a href="mailto:karlm.roxas@gmail.com">karlm.roxas@gmail.com</a>
                    <div>
                        <div className="flex items-center gap-2 hover:scale-101 transition">
                            <Linkedin size={16} />
                            <a href="https://www.linkedin.com/in/km-roxas/" target="_blank">
                                linkedin.com/in/km-roxas/
                            </a>
                        </div>
                        <div className="">
                            <a
                                href="files/resume.pdf"
                                download
                                target="_blank"
                                className="flex items-center hover:scale-101 transition gap-2">
                                <Download size={16} />
                                Resume
                            </a>
                        </div>
                        <div className="flex items-center gap-2 hover:scale-101 transition">
                            <Github size={16} />
                            <a
                                href="https://github.com/Karlroxas21/"
                                target="_blank">
                                github.com/Karlroxas21/
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <Chip text="Fullstack AI Engineer" />
                        <Chip text="Software Engineer" />
                        <Chip text="Expertise in Frontend Dev" />
                        <Chip text="Expertise in Backend Dev" />
                        <Chip text="Open for Work" />
                    </div>
                </div>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'ubuntu');

export default ContactWindow;
