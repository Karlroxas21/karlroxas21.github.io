import { dockApps } from '@constants/index';
import useWindowStore from '@store/window';
import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

interface DockApps {
    id: string;
    name: string;
    icon: string;
    canOpen: boolean;
}
const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    const toggleApp = ({ id, canOpen }: Pick<DockApps, 'id' | 'canOpen'>) => {
        if (canOpen) {
            const window = windows[id];
            if (!window) return;
            if (window.isOpen) {
                closeWindow(id);
            } else {
                openWindow(id, null);
                console.log('ID: ', id);
            }
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center items-center ">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id={'dock-tooltip'}
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}>
                            <img
                                src={icon}
                                alt={name}
                                loading={'lazy'}
                                className={canOpen ? '' : 'opacity-60'}
                                width={62}
                                height={62}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip transition" noArrow={true} />
            </div>
        </section>
    );
};

export default Dock;
