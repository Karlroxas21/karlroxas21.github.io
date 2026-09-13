import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { LocaleContext } from './locale-context';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../locales';

const STORAGE_KEY = 'lang';

const isLocale = (v: string | null): v is Locale => v !== null && v in LOCALES;

// Stored preference wins; otherwise fall back to the browser's language, then English.
const detectLocale = (): Locale => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
    const nav = navigator.language.slice(0, 2).toLowerCase();
    return isLocale(nav) ? nav : DEFAULT_LOCALE;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>(detectLocale);

    useEffect(() => {
        document.documentElement.lang = locale;
        localStorage.setItem(STORAGE_KEY, locale);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale, content: LOCALES[locale] }}>
            {children}
        </LocaleContext.Provider>
    );
};
