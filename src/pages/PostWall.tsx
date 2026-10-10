import { useLocation } from 'react-router-dom';
import {
    PWBeforeAfter,
    PWCTA,
    PWEditor,
    PWFeatures,
    PWFooter,
    PWHero,
    PWJourney,
    PWNav,
    PWPalette,
    PWPlatforms,
    PWRail,
    PWShell,
    PWStatement,
} from '../features/postwall';
import { useAnalytics } from '../hooks/use-analytics';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_G_ID as string | undefined;
if (GA_ID) ReactGA.initialize(GA_ID);

/**
 * Story beats, in order: hook → context → the day → proof → craft → detail → close.
 * Three sections pin (Why, A day, Editor); the rest scroll normally so the rhythm breathes.
 */
export default function PostWall() {
    const { trackPageview } = useAnalytics();
    const location = useLocation();
    const fullPath = location.pathname + location.hash;

    useEffect(() => {
        if (GA_ID) trackPageview(fullPath);
    }, [fullPath, trackPageview]);

    return (
        <PWShell>
            <PWNav />
            <PWRail />
            <PWHero />
            <PWStatement />
            <PWBeforeAfter />
            <PWJourney />
            <PWPlatforms />
            <PWEditor />
            <PWFeatures />
            <PWPalette />
            <PWCTA />
            <PWFooter />
        </PWShell>
    );
}
