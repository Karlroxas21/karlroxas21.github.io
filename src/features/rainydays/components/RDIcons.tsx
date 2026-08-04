import {
    CloudRain,
    Wallet,
    Users,
    QrCode,
    FileKey,
    ShieldCheck,
    ArrowRight,
    ArrowDown,
    ArrowUp,
    ArrowLeft,
    WifiOff,
    Fingerprint,
    Link2,
    Menu,
    X,
    Check,
} from 'lucide-react';

export {
    CloudRain as IconCloudRain,
    Wallet as IconWallet,
    Users as IconUsers,
    QrCode as IconQrCode,
    FileKey as IconFileKey,
    ShieldCheck as IconShieldCheck,
    ArrowRight as IconArrowRight,
    ArrowDown as IconArrowDown,
    ArrowUp as IconArrowUp,
    ArrowLeft as IconArrowLeft,
    WifiOff as IconWifiOff,
    Fingerprint as IconFingerprint,
    Link2 as IconLink,
    Menu as IconMenu,
    X as IconClose,
    Check as IconCheck,
};

export const IconApple = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 12.4c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.9 3.4-.9 1.6 0 2 .9 3.4.9 1.4 0 2.3-1.2 3.1-2.5.7-1 1.3-2.3 1.7-3.7-.2-.1-2.4-1-2.4-3.2zM14.5 5.6c.7-.9 1.2-2.1 1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.3 1.1.1 2.3-.6 3.1-1.5z" />
    </svg>
);

export const IconGoogle = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.6 2.3c-.4.4-.6 1-.6 1.7v16c0 .7.2 1.3.6 1.7l9-9-9-10.4zM14 12.7l2.4 2.4-9.5 5.4c-.6.3-1.2.3-1.7.1L14 12.7zM18.6 10.1c.7.4 1.2 1 1.2 1.9s-.4 1.5-1.2 1.9l-1.9 1.1-2.6-2.6 2.6-2.6 1.9 1.3zM5.2 3c.5-.2 1.1-.1 1.7.2l9.5 5.4-2.4 2.4L5.2 3z" />
    </svg>
);
