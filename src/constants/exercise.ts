import type { IconType } from 'components/CoreComponents/Icon/Icon.type';

// Onboarding'deki bölgeler / target'lar ile ikonlarını eşleyen map.
// 'areas' sorusundaki id'ler:
// eyes, neck, lower-back, upper-back, wrist, none
// exercise.target alanında kullanılan hedefler:
// neck, shoulder, arm, wrist, back, leg

export const AREA_ICON_MAP: Record<string, IconType> = {
  eyes: 'o:eye',
  neck: 'o:neck',
  'lower-back': 'o:lower_back',
  'upper-back': 'o:upper_back',
  wrist: 'o:wrist',
  none: 's:check',
};

export const TARGET_ICON_MAP: Record<string, IconType> = {
  neck: 'o:neck',
  shoulder: 'o:upper_back',
  arm: 'o:arrow_path',
  wrist: 'o:wrist',
  back: 'o:lower_back',
  leg: 'o:arrows_up_down',
};

