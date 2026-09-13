import { useLocation } from 'react-router-dom';
import {
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
    PWVoices,
    PWWall,
} from '../features/postwall';
import { useAnalytics } from '../hooks/use-analytics';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_G_ID as string | undefined;
if (GA_ID) ReactGA.initialize(GA_ID);

/**
 * Story beats, in order: hook → context → the day → proof → craft → climax → detail → close.
 * Three sections pin (Why, A day, Editor/Wall); the rest scroll normally so the rhythm breathes.
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
            <PWJourney />
            <PWPlatforms />
            <PWEditor />
            <PWWall />
            <PWFeatures />
            <PWPalette />
            <PWVoices />
            <PWCTA />
            <PWFooter />
        </PWShell>
    );
}
