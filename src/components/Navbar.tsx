import dayjs from 'dayjs';
import { Network, Power, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <nav className="flex justify-center items-center bg-[#1b1a1c] text-white backdrop-blur-3xl p-2 px-5 select-none">
            <div className="flex-1"></div>
            
            <div className="flex-1 text-sm font-medium text-white text-center">
                <time>{now.format('ddd MMM D h:mm:ss A')}</time>
            </div>

            <div className="flex gap-2 justify-end flex-1">
                <Network size={16} className="hover:cursor-pointer" />
                <Volume2 size={16} className="hover:cursor-pointer" />
                <Power size={16} className="hover:cursor-pointer" />
            </div>
        </nav>
    );
};

export default Navbar;
