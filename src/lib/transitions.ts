export type TransitionKey =
  | "crossFade" | "fadeToBlack" | "fadeToWhite" | "radialFade" | "gradientFade" | "blurFade" | "pixelateFade" | "glitchFade"
  | "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "diagonalSlideTL" | "diagonalSlideBR" | "pushLeft" | "pushRight" | "pushUp" | "pushDown"
  | "zoomIn" | "zoomOut" | "kenBurnsLeft" | "kenBurnsRight" | "kenBurnsUp" | "kenBurnsDown" | "elasticZoom" | "spiralZoom"
  | "rotateCW" | "rotateCCW" | "flipH" | "flipV" | "cubeRotateLeft" | "cubeRotateRight" | "cardFlip" | "bookFlip"
  | "wipeLeft" | "wipeRight" | "wipeUp" | "wipeDown" | "circularWipe" | "starWipe" | "heartWipe" | "diamondWipe" | "polygonWipe" | "spiralWipe"
  | "splitH" | "splitV" | "barnDoor" | "venetianBlinds" | "verticalBlinds" | "checkerboard"
  | "liquidMorph" | "particleExplosion" | "shatterGlass" | "origamiFold" | "hologram" | "neonGlow" | "matrixCode" | "rippleWave";

export const TRANSITION_EFFECTS: TransitionKey[] = [
  "crossFade","fadeToBlack","fadeToWhite","radialFade","gradientFade","blurFade","pixelateFade","glitchFade",
  "slideLeft","slideRight","slideUp","slideDown","diagonalSlideTL","diagonalSlideBR","pushLeft","pushRight","pushUp","pushDown",
  "zoomIn","zoomOut","kenBurnsLeft","kenBurnsRight","kenBurnsUp","kenBurnsDown","elasticZoom","spiralZoom",
  "rotateCW","rotateCCW","flipH","flipV","cubeRotateLeft","cubeRotateRight","cardFlip","bookFlip",
  "wipeLeft","wipeRight","wipeUp","wipeDown","circularWipe","starWipe","heartWipe","diamondWipe","polygonWipe","spiralWipe",
  "splitH","splitV","barnDoor","venetianBlinds","verticalBlinds","checkerboard",
  "liquidMorph","particleExplosion","shatterGlass","origamiFold","hologram","neonGlow","matrixCode","rippleWave"
];

export function getRandomTransition(): TransitionKey {
  return TRANSITION_EFFECTS[Math.floor(Math.random() * TRANSITION_EFFECTS.length)];
}

export function generateRandomSequence(slideCount: number): TransitionKey[] {
  return Array.from({ length: slideCount }, () => getRandomTransition());
}
