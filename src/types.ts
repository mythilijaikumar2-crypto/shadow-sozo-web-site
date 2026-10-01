export interface SceneConfig {
  id: string;
  range: [number, number]; // [start, end] normalized 0 -> 1
  tagline?: string;
  lines: string[];
  subtext?: string;
  accent?: 'gold' | 'silver' | 'white';
}

/**
 * Normalized Master Story Timeline (0.0 -> 1.0)
 */
export const MASTER_SCENES = {
  SCENE_1: { start: 0.0, end: 0.10 },
  SCENE_2: { start: 0.10, end: 0.25 },
  SCENE_3: { start: 0.25, end: 0.42 },
  SCENE_4: { start: 0.42, end: 0.62 },
  SCENE_5: { start: 0.62, end: 0.78 },
  SCENE_6: { start: 0.78, end: 0.92 },
  SCENE_7: { start: 0.92, end: 1.00 },
};

export function calcNormalizedState(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number
) {
  if (progress < enterStart || progress > exitEnd) {
    return {
      active: false,
      opacity: 0,
      translateY: 16,
      blur: 2,
      scale: 0.98,
      pointerEvents: 'none' as const,
    };
  }

  let opacity = 1;
  let translateY = 0;
  let blur = 0;
  let scale = 1;

  if (progress < enterEnd) {
    const p = Math.max(0, Math.min(1, (progress - enterStart) / Math.max(0.0001, enterEnd - enterStart)));
    opacity = p;
    translateY = (1 - p) * 16;
    blur = (1 - p) * 2;
    scale = 0.98 + p * 0.02;
  } else if (progress > exitStart) {
    const p = Math.max(0, Math.min(1, (progress - exitStart) / Math.max(0.0001, exitEnd - exitStart)));
    opacity = 1 - p;
    translateY = -p * 12;
    blur = p * 2;
    scale = 1 - p * 0.02;
  } else {
    opacity = 1;
    translateY = 0;
    blur = 0;
    scale = 1;
  }

  return {
    active: opacity > 0.01,
    opacity,
    translateY,
    blur,
    scale,
    pointerEvents: opacity > 0.5 ? ('auto' as const) : ('none' as const),
  };
}

/**
 * Scene Indicator Helper (01 / 07 -> 07 / 07)
 */
export function getSceneNumberStr(progress: number): { current: string; label: string } {
  if (progress < 0.14) return { current: '01 / 07', label: 'ORIGIN' };
  if (progress < 0.28) return { current: '02 / 07', label: 'SHADOW' };
  if (progress < 0.42) return { current: '03 / 07', label: 'VISION' };
  if (progress < 0.57) return { current: '04 / 07', label: 'CRAFT' };
  if (progress < 0.71) return { current: '05 / 07', label: 'EVOLUTION' };
  if (progress < 0.86) return { current: '06 / 07', label: 'RISE' };
  return { current: '07 / 07', label: 'FLY TO HIGH' };
}
