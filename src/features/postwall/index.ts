/** Public API of the postwall feature. Nothing outside imports its internals. */
export { default as PWShell } from './components/PWShell';
export { default as PWNav } from './components/PWNav';
export { default as PWRail } from './components/PWRail';
export { default as PWHero } from './components/PWHero';
export { default as PWStatement } from './components/PWStatement';
export { default as PWJourney } from './components/PWJourney';
export { default as PWPlatforms } from './components/PWPlatforms';
export { default as PWEditor } from './components/PWEditor';
export { default as PWWall } from './components/PWWall';
export { default as PWFeatures } from './components/PWFeatures';
export { default as PWPalette } from './components/PWPalette';
export { default as PWVoices } from './components/PWVoices';
export { default as PWCTA } from './components/PWCTA';
export { default as PWFooter } from './components/PWFooter';

/** Tokens stay public for anything that needs to match the paper/ink kit. */
export { PW, PW_GRAIN, PW_MAXW, noteColor } from './pwTokens';
export type { NoteColor, NoteColorKey } from './pwTokens';
