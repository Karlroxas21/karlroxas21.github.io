/** Public API of the postwall feature. Nothing outside imports its internals. */
export { default as PWNav } from './components/PWNav';
export { default as PWHero } from './components/PWHero';
export { default as PWPlatforms } from './components/PWPlatforms';
export { default as PWEditor } from './components/PWEditor';
export { default as PWWall } from './components/PWWall';
export { default as PWFeatures } from './components/PWFeatures';
export { default as PWPalette } from './components/PWPalette';
export { default as PWCTA } from './components/PWCTA';
export { default as PWFooter } from './components/PWFooter';

/** Tokens are public: the page needs them for the outer paper/ink shell. */
export { PW, PW_GRAIN, PW_MAXW, noteColor } from './pwTokens';
export type { NoteColor, NoteColorKey } from './pwTokens';
