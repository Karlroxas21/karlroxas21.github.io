import { useLocation } from 'react-router-dom';
import {
    RDNav,
    RDHero,
    RDProof,
    RDScenarios,
    RDFeatures,
    RDHowItWorks,
    RDScreens,
    RDResearch,
    RDWhyExists,
    RDPrivacyCallout,
    RDDownload,
    RDFooter,
    useReveal,
    useCountUp,
    useHashScroll,
} from '../features/rainydays';
import { useAnalytics } from '../hooks/use-analytics';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_G_ID as string | undefined;
if (GA_ID) ReactGA.initialize(GA_ID);

export default function RainyDays() {
    useReveal();
    useCountUp();
    useHashScroll();

    const { trackPageview } = useAnalytics();
    const location = useLocation();
    const fullPath = location.pathname + location.hash;

    useEffect(() => {
        if (GA_ID) trackPageview(fullPath);
    }, [fullPath, trackPageview]);
    return (
        <div className="rd-page">
            <RDNav />
            <main id="rd-main">
                <RDHero />
                <RDProof />
                <RDScenarios />
                <RDFeatures />
                <RDHowItWorks />
                <RDScreens />
                <RDResearch />
                <RDWhyExists />
                <RDPrivacyCallout />
                <RDDownload />
            </main>
            <RDFooter />
        </div>
    );
}
