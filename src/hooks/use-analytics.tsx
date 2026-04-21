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

    return { trackEvent };
};
