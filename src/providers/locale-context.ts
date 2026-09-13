import { createContext, useContext } from 'react';
import type { Locale, SiteContent } from '../locales';

export type LocaleContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    /** Content for the active locale. */
    content: SiteContent;
};

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const useLocale = () => {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
    return ctx;
};
