import {
    PW,
    PWCTA,
    PWEditor,
    PWFeatures,
    PWFooter,
    PWHero,
    PWNav,
    PWPalette,
    PWPlatforms,
    PWWall,
} from '../features/postwall';

export default function PostWall() {
    return (
        <div
            style={{
                background: PW.paper,
                color: PW.ink,
                fontFamily: PW.font,
                WebkitFontSmoothing: 'antialiased',
                lineHeight: 1.5,
            }}>
            <PWNav />
            <PWHero />
            <PWPlatforms />
            <PWEditor />
            <PWWall />
            <PWFeatures />
            <PWPalette />
            <PWCTA />
            <PWFooter />
        </div>
    );
}
