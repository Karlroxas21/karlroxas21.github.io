import { useEffect, useState } from 'react';

import { PW_DOWNLOADS, PW_RELEASES_URL, PW_REPO, type PWDownloadId } from '../releases';

/** The list endpoint, not `/releases/latest`: that one 404s while only pre-releases exist. */
const RELEASES_API = 'https://api.github.com/repos/Karlroxas21/postwall-releases/releases?per_page=20';
const CACHE_KEY = 'pw-latest-release';
const TIMEOUT_MS = 5000;

type ResolvedAsset = { href: string; size: number };

type ResolvedRelease = {
    tag: string;
    isBeta: boolean;
    assets: Partial<Record<PWDownloadId, ResolvedAsset>>;
};

type ApiAsset = { name: string; browser_download_url: string; size: number };
type ApiRelease = { tag_name: string; draft: boolean; prerelease: boolean; assets: ApiAsset[] };

export type LatestRelease = {
    status: 'loading' | 'resolved' | 'fallback';
    /** Tag as published, e.g. `v1.0.0-rc.1`. Null until resolved. */
    tag: string | null;
    /** True when no stable release exists yet and a pre-release is being offered. */
    isBeta: boolean;
    /** The chosen release's page, or the releases list when nothing resolved. */
    pageUrl: string;
    /** An unresolved asset points at the releases list, so a download click is never dead. */
    asset: (id: PWDownloadId) => { href: string; size: number | null };
};

const isApiRelease = (value: unknown): value is ApiRelease => {
    const release = value as ApiRelease;
    return typeof release?.tag_name === 'string' && Array.isArray(release.assets);
};

/** Newest stable release wins; until one exists, the newest pre-release stands in as a beta. */
function pickRelease(releases: ApiRelease[]): ResolvedRelease | null {
    const published = releases.filter(release => !release.draft);
    const chosen = published.find(release => !release.prerelease) ?? published[0];
    if (!chosen) return null;

    const assets: ResolvedRelease['assets'] = {};
    for (const download of PW_DOWNLOADS) {
        const match = chosen.assets.find(
            asset => asset.name.endsWith(download.suffix) && asset.browser_download_url.startsWith(`${PW_REPO}/`)
        );
        if (match) assets[download.id] = { href: match.browser_download_url, size: match.size };
    }
    return { tag: chosen.tag_name, isBeta: chosen.prerelease, assets };
}

function readCache(): ResolvedRelease | null {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        return cached ? (JSON.parse(cached) as ResolvedRelease) : null;
    } catch {
        return null;
    }
}

function writeCache(release: ResolvedRelease) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(release));
    } catch {
        // Private mode or blocked storage: the next page load simply asks the API again.
    }
}

async function fetchRelease(): Promise<ResolvedRelease | null> {
    const cached = readCache();
    if (cached) return cached;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(RELEASES_API, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
        });
        if (!response.ok) return null;
        const body: unknown = await response.json();
        if (!Array.isArray(body)) return null;
        const release = pickRelease(body.filter(isApiRelease));
        if (release) writeCache(release);
        return release;
    } catch (error) {
        // Offline, rate-limited (60/h per IP) or timed out: every button falls back to the releases list.
        console.debug('PostWall release lookup failed', error);
        return null;
    } finally {
        clearTimeout(timer);
    }
}

/** One request per page load, shared by every component that shows a download. */
let pending: Promise<ResolvedRelease | null> | null = null;

/** The release the page offers for download, resolved in the browser so new builds need no redeploy. */
export function useLatestRelease(): LatestRelease {
    const [state, setState] = useState<{ status: LatestRelease['status']; release: ResolvedRelease | null }>({
        status: 'loading',
        release: null,
    });

    useEffect(() => {
        let active = true;
        pending ??= fetchRelease();
        pending.then(release => {
            if (active) setState({ status: release ? 'resolved' : 'fallback', release });
        });
        return () => {
            active = false;
        };
    }, []);

    const { status, release } = state;
    return {
        status,
        tag: release?.tag ?? null,
        isBeta: release?.isBeta ?? false,
        pageUrl: release ? `${PW_RELEASES_URL}/tag/${release.tag}` : PW_RELEASES_URL,
        asset: id => {
            const match = release?.assets[id];
            return match ? { href: match.href, size: match.size } : { href: PW_RELEASES_URL, size: null };
        },
    };
}
