import useWindowStore from '@store/window';
import { Minus, Square, X } from 'lucide-react';

const WindowControls = ({ target }: { target: string }) => {
    const { closeWindow } = useWindowStore();

    return (
        <div id="window-controls">
            <div className="close flex justify-center items-center" onClick={() => closeWindow(target)}>
                <Minus size={10} color="white" />
            </div>
            <div className="minimize flex justify-center items-center" onClick={() => closeWindow(target)}>
                <Square size={10} color="white" />
            </div>
            <div className="close flex justify-center items-center" onClick={() => closeWindow(target)}>
                <X size={10} color="white" />
            </div>
        </div>
    );
};

export default WindowControls;
