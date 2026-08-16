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

export default function RainyDays() {
    useReveal();
    useCountUp();
    useHashScroll();

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
