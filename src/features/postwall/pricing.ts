/**
 * Pricing as the page shows it. Must match postwall-ui docs/pricing.md: annual only, USD, no monthly
 * and no lifetime option. Every launch-day change is a one-line edit here.
 */

export const PRO_PRICE_USD = 24;

export type FoundingOffer = {
    priceUsd: number;
    /** ISO date (YYYY-MM-DD) Pro goes on sale. Null while it is not on sale yet. */
    startsOn: string | null;
    durationDays: number;
    /** Shown in the copy only — the page cannot count buyers, so the owner ends it by hand. */
    buyerCap: number;
    /** Flip to true if the buyer cap is reached before the end date. */
    endedManually: boolean;
};

export const FOUNDING_OFFER: FoundingOffer = {
    priceUsd: 15,
    startsOn: null,
    durationDays: 90,
    buyerCap: 500,
    endedManually: false,
};

/** Polar checkout URL. Null renders the Pro button disabled until the checkout exists. */
export const PRO_CHECKOUT_URL: string | null = null;

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
