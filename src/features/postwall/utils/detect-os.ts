export type OSFamily = 'mac' | 'win' | 'linux' | 'other';

/**
 * Best-effort OS family, for ordering download buttons — nothing more.
 *
 * Deliberately does NOT report architecture. A browser cannot tell Apple Silicon from Intel
 * (an M-series Mac still reports "MacIntel"), nor .deb from .rpm, so an asset must never be
 * chosen by arch. `userAgentData` is Chromium-only, hence the `navigator.platform` fallback.
 */
export function detectOS(): OSFamily {
    if (typeof navigator === 'undefined') return 'other';

    const ua = navigator as Navigator & { userAgentData?: { platform?: string } };
    const p = (ua.userAgentData?.platform || navigator.platform || navigator.userAgent).toLowerCase();

    // Android's UA also says "linux", so it has to be ruled out first.
    if (p.includes('android')) return 'other';
    if (/iphone|ipod/.test(p)) return 'other';
    // iPadOS reports "MacIntel" too; touch points separate it from a desktop Mac.
    if (p.includes('mac')) return navigator.maxTouchPoints > 1 ? 'other' : 'mac';
    if (p.includes('win')) return 'win';
    if (p.includes('linux') || p.includes('x11')) return 'linux';
    return 'other';
}
