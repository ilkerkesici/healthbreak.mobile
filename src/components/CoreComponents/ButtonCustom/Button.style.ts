import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {ColorType} from 'assets/colors';
import {typography} from 'assets/typography';
import {ButtonBaseSize, ButtonVariant} from 'types/design';
import {useThemeColor} from 'helpers/hooks/useThemeColor';

const buttonFocusDefaultStyle: ViewStyle = {
  padding: 2,
  margin: -2,
  alignSelf: 'stretch',
};

const flexAndCenter: ViewStyle = {
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};

export const justIconButtonDefaultStyle: ViewStyle = {
  paddingVertical: 0,
  paddingHorizontal: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
export const buttonVariantStyles = StyleSheet.create({
  'button-sm-just-icon': {
    ...justIconButtonDefaultStyle,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  'button-md-just-icon': {
    ...justIconButtonDefaultStyle,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  'button-lg-just-icon': {
    ...justIconButtonDefaultStyle,
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  'button-primary-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'primary.500',
    borderRadius: 100,
    ...flexAndCenter,
  },
  'button-primary-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'primary.500',
    borderRadius: 100,
    ...flexAndCenter,
  },
  'button-primary-lg': {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'primary.500',
    borderRadius: 100,
    ...flexAndCenter,
  },
  'button-primary-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.600',
    borderRadius: 4,
    ...flexAndCenter,
  },
  'button-primary-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.600',
    borderRadius: 4,
    ...flexAndCenter,
  },
  'button-primary-lg-disabled': {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.600',
    borderRadius: 100,
    ...flexAndCenter,
  },
  'button-primary-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.100/32',
    borderRadius: 100,
  },
  'button-primary-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.100/32',
    borderRadius: 100,
  },
  'button-primary-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.100/32',
    borderRadius: 100,
  },
  'button-primary-sm-unfocus': {
    backgroundColor: 'primary.100/32',
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  'button-primary-md-unfocus': {
    backgroundColor: 'primary.100/32',
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  'button-primary-lg-unfocus': {
    backgroundColor: 'primary.100/32',
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  'button-primary-red-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'red.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-primary-red-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'red.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-primary-red-lg': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'red.50',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-primary-red-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'red.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-primary-red-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'red.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-primary-red-lg-disabled': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'red.50',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-primary-red-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'red.50/32',
    borderRadius: 40,
  },
  'button-primary-red-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'red.50/32',
    borderRadius: 40,
  },
  'button-primary-red-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'red.50/32',
    borderRadius: 40,
  },
  'button-primary-red-sm-unfocus': {
    backgroundColor: 'red.50/32',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-primary-red-md-unfocus': {
    backgroundColor: 'red.50/32',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-primary-red-lg-unfocus': {
    backgroundColor: 'red.50/32',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-borderless-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-borderless-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-borderless-lg': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-borderless-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-borderless-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-borderless-lg-disabled': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.200',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-borderless-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-borderless-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-borderless-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-borderless-sm-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-borderless-md-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-borderless-lg-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bordered-sm': {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'custom-wb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'neutral.400',
    ...flexAndCenter,
  },
  'button-bordered-md': {
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: 'custom-wb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'neutral.400',
    ...flexAndCenter,
  },
  'button-bordered-lg': {
    paddingVertical: 16,
    paddingHorizontal: 15,
    backgroundColor: 'custom-wb',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'neutral.400',
    ...flexAndCenter,
  },
  'button-bordered-sm-disabled': {
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bordered-md-disabled': {
    paddingVertical: 9,
    paddingHorizontal: 13,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bordered-lg-disabled': {
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: 'neutral.200',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bordered-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bordered-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bordered-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bordered-sm-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bordered-md-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bordered-lg-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.300',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.300',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-lg': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.300',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-gray-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-lg-disabled': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.200',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-gray-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-sm-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-md-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-lg-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-2-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.300',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.300',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-lg': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.300',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-lg-disabled': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'neutral.200',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-gray-2-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-2-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-2-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'neutral.200',
    borderRadius: 40,
  },
  'button-bezeled-gray-2-sm-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-2-md-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-gray-2-lg-unfocus': {
    backgroundColor: 'neutral.200',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-sm': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-md': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-lg': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'primary.50/40',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-sm-disabled': {
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: 'primary.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-md-disabled': {
    paddingVertical: 11,
    paddingHorizontal: 15,
    backgroundColor: 'primary.50',
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-bezeled-lg-disabled': {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'primary.50',
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-bezeled-sm-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
  },
  'button-bezeled-md-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
  },
  'button-bezeled-lg-focus': {
    ...buttonFocusDefaultStyle,
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
  },
  'button-bezeled-sm-unfocus': {
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-md-unfocus': {
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-bezeled-lg-unfocus': {
    backgroundColor: 'primary.50/40',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-ghost-sm': {
    backgroundColor: 'transparent',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-ghost-md': {
    backgroundColor: 'transparent',
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-ghost-lg': {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-ghost-sm-disabled': {
    backgroundColor: 'transparent',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-ghost-md-disabled': {
    backgroundColor: 'transparent',
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 40,
    ...flexAndCenter,
  },
  'button-ghost-lg-disabled': {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 50,
    ...flexAndCenter,
  },
  'button-ghost-sm-focus': {
    backgroundColor: 'transparent',
    ...buttonFocusDefaultStyle,
    borderRadius: 40,
  },
  'button-ghost-md-focus': {
    backgroundColor: 'transparent',
    ...buttonFocusDefaultStyle,
    borderRadius: 40,
  },
  'button-ghost-lg-focus': {
    backgroundColor: 'transparent',
    ...buttonFocusDefaultStyle,
    borderRadius: 40,
  },
  'button-ghost-sm-unfocus': {
    backgroundColor: 'transparent',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-ghost-md-unfocus': {
    backgroundColor: 'transparent',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
  'button-ghost-lg-unfocus': {
    backgroundColor: 'transparent',
    borderRadius: 40,
    alignSelf: 'stretch',
  },
} as const);

// Icon Styles

export const iconSizesWithText = {
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
};
export const iconSizesWithoutText = {
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
};

export const iconMargins = {
  sm: 4,
  md: 7,
  lg: 7,
};

export const iconColors: Record<string, ColorType> = {
  primary: 'white',
  'primary-disabled': 'white',
  borderless: 'primary.500',
  'borderless-disabled': 'neutral.700',
  bordered: 'neutral.900',
  'bordered-disabled': 'neutral.600',
  'bezeled-gray': 'primary.500',
  'bezeled-gray-disabled': 'neutral.600',
  'bezeled-gray-2': 'neutral.900',
  'bezeled-gray-2-disabled': 'neutral.600',
  bezeled: 'primary.500',
  'bezeled-disabled': 'neutral.600',
};

// Button Styles

const justIconButtonSizes = {
  sm: 30,
  md: 40,
  lg: 54,
};

export const getJustIconButtonMeasures = (size: ButtonBaseSize) => ({
  width: justIconButtonSizes[size],
  height: justIconButtonSizes[size],
  borderRadius: justIconButtonSizes[size] / 2,
});

const primaryGradientColors: ColorType[] = ['primary.400', 'primary.500'];

const bezeledGrayGradientColors: ColorType[] = [
  'neutral.400/30',
  'neutral.400/00',
];

const bezeledGradientColors: ColorType[] = [
  'primary.50/80',
  'primary.50/80',
  'primary.50',
];

export const buttonGradientColors: Record<ButtonVariant, ColorType[]> = {
  primary: primaryGradientColors,
  'primary-red': [],
  borderless: [],
  bordered: [],
  'bezeled-gray': bezeledGrayGradientColors,
  'bezeled-gray-2': bezeledGrayGradientColors,
  bezeled: bezeledGradientColors,
  ghost: [],
};

// Text Styles

export const typographyByButtonSize = {
  sm: typography.subhead.xs,
  md: typography.subhead.sm,
  lg: typography.subhead.xl,
};

export const textColorByVariant = (
  disabled?: boolean,
): Record<ButtonVariant, ColorType> => ({
  primary: disabled ? 'white' : 'white',
  'primary-red': disabled ? 'red.300' : 'red.500',
  borderless: disabled ? 'neutral.700' : 'primary.500',
  bordered: disabled ? 'neutral.600' : 'neutral.900',
  'bezeled-gray': disabled ? 'neutral.600' : 'primary.500',
  'bezeled-gray-2': disabled ? 'neutral.600' : 'neutral.900',
  bezeled: disabled ? 'neutral.600' : 'primary.500',
  ghost: disabled ? 'neutral.600' : 'neutral.900',
});

interface TextStyleProps {
  variant: ButtonVariant;
  size: ButtonBaseSize;
  disabled?: boolean;
}

export const useGetTextStyle = ({size, disabled, variant}: TextStyleProps) => {
  let color = textColorByVariant(disabled)[variant];
  const [colorHex] = useThemeColor([color as ColorType]);

  const style: TextStyle = {
    ...typographyByButtonSize[size],
    color: colorHex,
    fontWeight: '600',
  };
  return style;
};
