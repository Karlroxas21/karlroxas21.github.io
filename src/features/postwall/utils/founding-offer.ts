import type { FoundingOffer } from '../pricing';

const DAY_MS = 86_400_000;

/**
 * Live until the end date (start + duration) or until the owner ends it by hand. Before Pro goes
 * on sale (`startsOn` null) the founding rate is the announced launch price, so it shows.
 */
export function isFoundingOfferLive(offer: FoundingOffer, today = new Date()): boolean {
    if (offer.endedManually) return false;
    if (offer.startsOn === null) return true;

    const start = Date.parse(`${offer.startsOn}T00:00:00Z`);
    if (Number.isNaN(start)) return false;
    return today.getTime() < start + offer.durationDays * DAY_MS;
}
