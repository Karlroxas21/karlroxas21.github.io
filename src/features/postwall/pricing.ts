/**
 * Pricing as the page shows it. Must match postwall-ui docs/pricing.md: annual only, USD, no monthly
 * and no lifetime option. Every launch-day change is a one-line edit here.
 */

export const PRO_PRICE_USD = 23.99;

export type FoundingOffer = {
    priceUsd: number;
    /** ISO date (YYYY-MM-DD) Pro goes on sale. Null while it is not on sale yet. */
    startsOn: string | null;
    durationDays: number;
    /** Shown in the copy only — the page cannot count buyers, so the owner ends it by hand. */
    buyerCap: number;
    /** Flip to true if the buyer cap is reached before the end date. */
    endedManually: boolean;
    /** Polar discount code applied at checkout. Must exist with this code in both Polar environments. */
    discountCode: string;
};

export const FOUNDING_OFFER: FoundingOffer = {
    priceUsd: 14.99,
    startsOn: null,
    durationDays: 90,
    buyerCap: 500,
    endedManually: false,
    discountCode: 'founding',
};

type PolarEnvironment = 'production' | 'sandbox';

/**
 * Polar checkout links (Polar dashboard → Products → Checkout Links), one per Polar environment. Null
 * renders the Pro button disabled. Sandbox (sandbox.polar.sh) is a separate Polar account with its own
 * products and takes only test cards, so a purchase there never charges anyone.
 */
const PRO_CHECKOUT_URLS: Record<PolarEnvironment, string | null> = {
    production: null,
    sandbox:
        'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_ncWKFU3tgpqwPcAz2W3t2KL2mDjaD3i0aakbP2dIC8o/redirect',
};

/** `VITE_POLAR_ENV` picks the environment. Unset, the dev server uses sandbox and a build uses
 * production, so a local run only takes a real payment when asked to. */
function polarEnvironment(): PolarEnvironment {
    const configured = import.meta.env.VITE_POLAR_ENV as string | undefined;
    if (configured === 'sandbox' || configured === 'production') return configured;
    return import.meta.env.DEV ? 'sandbox' : 'production';
}

export const PRO_CHECKOUT_URL = PRO_CHECKOUT_URLS[polarEnvironment()];

export const FREE_FEATURES = [
    'The full app: every editor and wall feature',
    'Sync through a folder iCloud, Dropbox or Syncthing already syncs',
    'No note limit',
    'No account needed',
];

export const PRO_FEATURES = [
    'Everything in Free',
    'Hosted sync, no folder to set up',
    '30-day version history',
    'Image sync',
    'Backup, restore and export',
    'Unlimited devices',
];
