import { useCallback } from 'react';
import ReactGA from 'react-ga4';

export const useAnalytics = () => {
    const trackEvent = useCallback((action: string, category: string, label: string) => {
        ReactGA.event({
            category: category || 'Not set',
            action: action,
            label: label,
        });
    }, []);

    const trackPageview = useCallback((path: string, title?: string) => {
        ReactGA.send({ hitType: 'pageview', page: path, title: title ?? path });
    }, []);

    return { trackEvent, trackPageview };
};
