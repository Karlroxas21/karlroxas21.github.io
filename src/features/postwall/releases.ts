/**
 * Release facts that do not change per build. Version, URLs and sizes are read at runtime from
 * github.com/Karlroxas21/postwall-releases (see hooks/use-latest-release.ts), so publishing a new
 * release never needs a site redeploy.
 */

export const PW_REPO = 'https://github.com/Karlroxas21/postwall-releases';
export const PW_RELEASES_URL = `${PW_REPO}/releases`;

export type PWDownloadId = 'mac-arm64' | 'win-x64' | 'linux-deb' | 'linux-rpm';

export type PWDownload = {
    id: PWDownloadId;
    os: 'mac' | 'win' | 'linux';
    label: string;
    /** Shown under the button — the architecture/format this file actually is. */
    detail: string;
    /**
     * How the asset's file name ends. Names embed the version, so matching on the suffix is what
     * keeps this stable across releases. Mirrors the makers in postwall-ui forge.config.ts.
     */
    suffix: string;
};

/** Only what is actually built. No Intel mac, no AppImage, no Flatpak — do not list them. */
export const PW_DOWNLOADS: PWDownload[] = [
    { id: 'mac-arm64', os: 'mac', label: 'Download for Mac', detail: 'Apple Silicon · .dmg', suffix: '-arm64.dmg' },
    { id: 'win-x64', os: 'win', label: 'Windows', detail: 'x64 installer · .exe', suffix: '.Setup.exe' },
    {
        id: 'linux-deb',
        os: 'linux',
        label: 'Linux (.deb)',
        detail: 'Debian / Ubuntu · amd64',
        suffix: '_amd64.deb',
    },
    {
        id: 'linux-rpm',
        os: 'linux',
        label: 'Linux (.rpm)',
        detail: 'Fedora / RHEL · x86_64',
        suffix: '.x86_64.rpm',
    },
];
