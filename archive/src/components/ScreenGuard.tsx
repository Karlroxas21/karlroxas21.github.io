import React from 'react';
import Fallback from '../pages/Fallback';

interface ScreenGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const ScreenGuard: React.FC<ScreenGuardProps> = ({ children }) => {
    return (
        <>
            {/* Show content on md and above */}
            <div className="hidden lg:block">{children}</div>

            {/* Show fallback on screens below md */}
            <div className="block lg:hidden">
                <Fallback />
            </div>
        </>
    );
};

export default ScreenGuard;
