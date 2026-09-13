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

/**
 * Story beats, in order: hook → context → the day → proof → craft → climax → detail → close.
 * Three sections pin (Why, A day, Editor/Wall); the rest scroll normally so the rhythm breathes.
 */
export default function PostWall() {
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
