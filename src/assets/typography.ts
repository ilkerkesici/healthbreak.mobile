import {TextStyle} from 'react-native';
import {TypographyBaseSize} from 'types/design';

interface Typography {
  largeTitle: Record<TypographyBaseSize, TextStyle>;
  title1: Record<TypographyBaseSize, TextStyle>;
  title2: Record<TypographyBaseSize, TextStyle>;
  title3: Record<TypographyBaseSize, TextStyle>;
  headline: Record<TypographyBaseSize, TextStyle>;
  body: Record<TypographyBaseSize, TextStyle>;
  callout: Record<TypographyBaseSize, TextStyle>;
  subhead: Record<TypographyBaseSize, TextStyle>;
  footnote: Record<TypographyBaseSize, TextStyle>;
  caption1: Record<TypographyBaseSize, TextStyle>;
  caption2: Record<TypographyBaseSize, TextStyle>;
  // New typography
  text: Record<TypographyBaseSize, TextStyle>;
  display: Record<TypographyBaseSize, TextStyle>;
}

export const typography: Typography = {
  largeTitle: {
    xs: {
      fontSize: 31,
      lineHeight: 38,
    },
    sm: {
      fontSize: 32,
      lineHeight: 39,
    },
    md: {
      fontSize: 33,
      lineHeight: 40,
    },
    lg: {
      fontSize: 34,
      lineHeight: 41,
    },
    xl: {
      fontSize: 36,
      lineHeight: 43,
    },
    '2xl': {
      fontSize: 38,
      lineHeight: 46,
    },
    '3xl': {
      fontSize: 40,
      lineHeight: 48,
    },
  },
  title1: {
    xs: {
      fontSize: 25,
      lineHeight: 31,
    },
    sm: {
      fontSize: 26,
      lineHeight: 32,
    },
    md: {
      fontSize: 27,
      lineHeight: 33,
    },
    lg: {
      fontSize: 28,
      lineHeight: 34,
    },
    xl: {
      fontSize: 30,
      lineHeight: 36,
    },
    '2xl': {
      fontSize: 32,
      lineHeight: 39,
    },
    '3xl': {
      fontSize: 34,
      lineHeight: 41,
    },
  },
  title2: {
    xs: {
      fontSize: 19,
      lineHeight: 23,
    },
    sm: {
      fontSize: 20,
      lineHeight: 24,
    },
    md: {
      fontSize: 21,
      lineHeight: 28,
    },
    lg: {
      fontSize: 22,
      lineHeight: 28,
    },
    xl: {
      fontSize: 24,
      lineHeight: 30,
    },
    '2xl': {
      fontSize: 26,
      lineHeight: 32,
    },
    '3xl': {
      fontSize: 28,
      lineHeight: 34,
    },
  },
  title3: {
    xs: {
      fontSize: 17,
      lineHeight: 22,
    },
    sm: {
      fontSize: 18,
      lineHeight: 23,
    },
    md: {
      fontSize: 19,
      lineHeight: 24,
    },
    lg: {
      fontSize: 20,
      lineHeight: 28,
    },
    xl: {
      fontSize: 22,
      lineHeight: 25,
    },
    '2xl': {
      fontSize: 24,
      lineHeight: 28,
    },
    '3xl': {
      fontSize: 26,
      lineHeight: 30,
    },
  },
  headline: {
    xs: {
      fontSize: 14,
      lineHeight: 19,
    },
    sm: {
      fontSize: 15,
      lineHeight: 20,
    },
    md: {
      fontSize: 16,
      lineHeight: 21,
    },
    lg: {
      fontSize: 17,
      lineHeight: 22,
    },
    xl: {
      fontSize: 19,
      lineHeight: 24,
    },
    '2xl': {
      fontSize: 21,
      lineHeight: 26,
    },
    '3xl': {
      fontSize: 23,
      lineHeight: 28,
    },
  },
  body: {
    xs: {
      fontSize: 14,
      lineHeight: 19,
    },
    sm: {
      fontSize: 15,
      lineHeight: 20,
    },
    md: {
      fontSize: 16,
      lineHeight: 21,
    },
    lg: {
      fontSize: 17,
      lineHeight: 22,
    },
    xl: {
      fontSize: 19,
      lineHeight: 24,
    },
    '2xl': {
      fontSize: 21,
      lineHeight: 26,
    },
    '3xl': {
      fontSize: 23,
      lineHeight: 28,
    },
  },
  callout: {
    xs: {
      fontSize: 13,
      lineHeight: 18,
    },
    sm: {
      fontSize: 14,
      lineHeight: 19,
    },
    md: {
      fontSize: 15,
      lineHeight: 20,
    },
    lg: {
      fontSize: 16,
      lineHeight: 21,
    },
    xl: {
      fontSize: 18,
      lineHeight: 23,
    },
    '2xl': {
      fontSize: 20,
      lineHeight: 24,
    },
    '3xl': {
      fontSize: 22,
      lineHeight: 28,
    },
  },
  subhead: {
    xs: {
      fontSize: 12,
      lineHeight: 16,
    },
    sm: {
      fontSize: 13,
      lineHeight: 18,
    },
    md: {
      fontSize: 14,
      lineHeight: 19,
    },
    lg: {
      fontSize: 15,
      lineHeight: 20,
    },
    xl: {
      fontSize: 17,
      lineHeight: 22,
    },
    '2xl': {
      fontSize: 19,
      lineHeight: 24,
    },
    '3xl': {
      fontSize: 21,
      lineHeight: 28,
    },
  },
  footnote: {
    xs: {
      fontSize: 12,
      lineHeight: 16,
    },
    sm: {
      fontSize: 12,
      lineHeight: 16,
    },
    md: {
      fontSize: 12,
      lineHeight: 16,
    },
    lg: {
      fontSize: 13,
      lineHeight: 18,
    },
    xl: {
      fontSize: 15,
      lineHeight: 20,
    },
    '2xl': {
      fontSize: 17,
      lineHeight: 22,
    },
    '3xl': {
      fontSize: 19,
      lineHeight: 24,
    },
  },
  caption1: {
    xs: {
      fontSize: 11,
      lineHeight: 13,
    },
    sm: {
      fontSize: 11,
      lineHeight: 13,
    },
    md: {
      fontSize: 11,
      lineHeight: 13,
    },
    lg: {
      fontSize: 12,
      lineHeight: 16,
    },
    xl: {
      fontSize: 14,
      lineHeight: 19,
    },
    '2xl': {
      fontSize: 16,
      lineHeight: 21,
    },
    '3xl': {
      fontSize: 18,
      lineHeight: 23,
    },
  },
  caption2: {
    xs: {
      fontSize: 9,
      lineHeight: 13,
    },
    sm: {
      fontSize: 11,
      lineHeight: 13,
    },
    md: {
      fontSize: 11,
      lineHeight: 13,
    },
    lg: {
      fontSize: 11,
      lineHeight: 13,
    },
    xl: {
      fontSize: 13,
      lineHeight: 18,
    },
    '2xl': {
      fontSize: 15,
      lineHeight: 20,
    },
    '3xl': {
      fontSize: 17,
      lineHeight: 22,
    },
  },
  // New Namings
  text: {
    '3xl': {
      fontSize: 24,
      lineHeight: 34,
    },
    '2xl': {
      fontSize: 22,
      lineHeight: 32,
    },
    xl: {
      fontSize: 20,
      lineHeight: 30,
    },
    lg: {
      fontSize: 18,
      lineHeight: 28,
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
    },
    sm: {
      fontSize: 14,
      lineHeight: 20,
    },
    xs: {
      fontSize: 12,
      lineHeight: 18,
    },
  },
  display: {
    '3xl': {
      fontSize: 60,
      lineHeight: 72,
    },
    '2xl': {
      fontSize: 22,
      lineHeight: 32,
    },
    xl: {
      fontSize: 20,
      lineHeight: 30,
    },
    lg: {
      fontSize: 48,
      lineHeight: 60,
    },
    md: {
      fontSize: 36,
      lineHeight: 44,
    },
    sm: {
      fontSize: 30,
      lineHeight: 38,
    },
    xs: {
      fontSize: 24,
      lineHeight: 32,
    },
  },
};

export type FontWeightType = '300' | '400' | '500' | '600' | '700';
