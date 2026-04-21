import WindowWrapper from '@hoc/WindowWrapper';
import WindowControls from '../components/WindowControls';
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    PanelLeft,
    RotateCw,
    Shield,
    File,
    Star,
    Menu,
    MoveRight,
} from 'lucide-react';
import { blogPosts } from '@constants/index';
import { Link } from 'react-router';

const Firefox = () => {
    return (
        <>
            <div id="window-header">
                <div className="flex items-center space-x-2">
                    <div>
                        <PanelLeft className="icon" />
                    </div>
                    <div className="flex justify-start p-2 rounded-xl bg-[#3e3e48]">
                        <p className="text-left w-full pr-10 pl-1 text-white">Karl's Website</p>
                    </div>
                </div>

                <div className="flex items-center space-x-10">
                    <ChevronDown />

                    <WindowControls target={'firefox'} />
                </div>
            </div>
            {/* Firefox Actions */}
            <div className="flex bg-[#2b2a33] pl-4">
                <div className="flex items-center space-x-3 mr-12">
                    <ArrowLeft color="white" size={18} />
                    <ArrowRight color="white" size={18} />
                    <RotateCw color="white" size={18} />
                </div>
                <div className="flex space-x-1 items-center px-2 my-1 rounded-md bg-[#1e1d24]">
                    <Shield color="white" size={18} />
                    <File color="white" size={18} />
                    <input
                        type="text"
                        placeholder="http://localhost:5173"
                        className="flex-1 text-white bg-transparent border-none outline-none w-xl rounded-md p-1"
                    />

                    <div>
                        <Star color="white" size={18} />
                    </div>
                </div>
                <div className="flex items-center ml-16">
                    <Menu color="white" size={18} />
                </div>
            </div>
            {/* Body */}
            <div className="bg-[#1f1e25] text-white overflow-auto">
                <div className="blog">
                    <h2>My Blogs</h2>

                    <div className="space-y-8 pb-10">
                        {blogPosts.map(({ id, image, title, date, link }) => (
                            <div key={id} className="blog-post">
                                <div className="col-span-4">
                                    <img src={image} alt={title} />
                                </div>

                                <div className="content">
                                    <p>{date}</p>
                                    <h3>{title}</h3>
                                    <Link to={link} target="_blank" rel="noopener noreferrer">
                                        Checkout the full post <MoveRight className="icon-hover" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const FirefoxWindows = WindowWrapper(Firefox, 'firefox');

export default FirefoxWindows;
