import WindowControls from '@components/WindowControls';
import { techStack } from '@constants/index';
import WindowWrapper from '@hoc/WindowWrapper';
import { Check } from 'lucide-react';

const Command: React.FC<{ cmd?: string; append?: string }> = ({ cmd, append }) => {
    return (
        <>
            <span className="font-bold text-[#27a169]">karl@Supercrane</span>
            <span>:</span>
            <span className="text-[#12488b]">~{append && <span>/{append}</span>}</span>
            <span>$ </span>
            {cmd && <span>{cmd}</span>}
        </>
    );
};

const Terminal = () => {
    return (
        <>
            <div id="window-header">
                <h2>Tech Stack</h2> <WindowControls target="terminal" />
            </div>

            <div className="techstack">
                <p>
                    <Command cmd={'cd Documents'} />
                </p>
                <p>
                    <Command cmd={'cat karlTechStack.txt'} append="Documents" />
                </p>

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li id={category} className="flex items-center">
                            <Check className="check" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        {item}
                                        {index < items.length - 1 ? ',' : ''}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <p>
                    <Command append="Documents" />
                </p>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;
