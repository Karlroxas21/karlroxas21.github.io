/**
 * Release facts, in one place. Everything here mirrors the assets published at
 * github.com/Karlroxas21/postwall-releases — if a build is re-cut, edit this file only.
 *
 * Only the Free tier is downloadable today. Pro (managed sync) is still being built —
 * it must never render a download or a price. When it ships it unlocks inside the SAME
 * binary via a license key, so there will still be exactly one download.
 */

export const PW_REPO = 'https://github.com/Karlroxas21/postwall-releases';
export const PW_RELEASES_URL = `${PW_REPO}/releases`;

export const PW_VERSION = 'v0.1.0-rc.1';
/** GitHub marks this tag as a pre-release — the site must say beta everywhere it says a version. */
export const PW_PRERELEASE = true;
export const PW_RELEASE_DATE = 'September 2026';

const asset = (file: string) => `${PW_REPO}/releases/download/${PW_VERSION}/${file}`;

export type PWDownload = {
    id: string;
    os: 'mac' | 'win' | 'linux';
    label: string;
    /** Shown under the button — the architecture/format this file actually is. */
    detail: string;
    size: string;
    href: string;
};

/** Only what is actually uploaded. No Intel mac, no AppImage, no Flatpak — do not list them. */
export const PW_DOWNLOADS: PWDownload[] = [
    {
        id: 'mac-arm64',
        os: 'mac',
        label: 'Download for Mac',
        detail: 'Apple Silicon · .dmg',
        size: '113 MB',
        href: asset(`PostWall-0.1.0-rc.1-arm64.dmg`),
    },
    {
        id: 'win-x64',
        os: 'win',
        label: 'Windows',
        detail: 'x64 installer · .exe',
        size: '139 MB',
        href: asset(`PostWall-0.1.0-rc.1.Setup.exe`),
    },
    {
        id: 'linux-deb',
        os: 'linux',
        label: 'Linux (.deb)',
        detail: 'Debian / Ubuntu · amd64',
        size: '91 MB',
        href: asset(`postwall_0.1.0.rc.1_amd64.deb`),
    },
    {
        id: 'linux-rpm',
        os: 'linux',
        label: 'Linux (.rpm)',
        detail: 'Fedora / RHEL · x86_64',
        size: '96 MB',
        href: asset(`PostWall-0.1.0.rc.1-1.x86_64.rpm`),
    },
];

export type PWTier = {
    id: 'free' | 'pro';
    name: string;
    price: string;
    priceNote: string;
    summary: string;
    points: string[];
    /** False while a tier is still being built: no download, no price, no purchase path. */
    available: boolean;
    /** Only read when `available` — an unavailable tier renders a status chip instead. */
    ctaLabel?: string;
};

export const PW_TIERS: PWTier[] = [
    {
        id: 'free',
        name: 'Free',
        price: 'Free',
        priceNote: 'no sign-in needed',
        summary: 'Bring your own cloud. Notes save straight into a folder you choose.',
        points: [
            'Every note-taking feature, unlocked',
            'Point the folder at iCloud, Dropbox, Drive or Syncthing',
            'Your files, your disk — quit anytime',
            'No sign-in, no telemetry',
        ],
        available: true,
        ctaLabel: 'Download',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 'In development',
        priceNote: 'not available yet',
        summary: 'Managed sync — nothing to wire up. Being built now; the beta is Free-tier only.',
        points: [
            'Everything in Free',
            'Signs you in and syncs every device automatically',
            'No cloud folder to configure',
            'Will unlock inside this same app — still one download',
        ],
        available: false,
    },
];
