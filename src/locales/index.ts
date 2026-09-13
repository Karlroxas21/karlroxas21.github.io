import en from './en.json';
import tl from './tl.json';

/** Shape all locale files must match, derived from the English source of truth. */
export type SiteContent = typeof en;

/**
 * Locale registry. To add a language:
 *   1. Copy en.json → <code>.json and translate the strings.
 *   2. import it here and add it to this object + LOCALE_LABELS.
 * `satisfies` makes a shape mismatch (missing/renamed key) a compile error.
 */
export const LOCALES = { en, tl } satisfies Record<string, SiteContent>;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = 'en';

/** Human-readable names shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
    en: 'English',
    tl: 'Filipino',
};
