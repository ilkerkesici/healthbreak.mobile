import {ColorType} from 'assets/colors';

export type ThemeType = 'dark' | 'light' | 'system';

export type ButtonVariant =
  | 'primary'
  | 'primary-red'
  | 'borderless'
  | 'bordered'
  | 'bezeled-gray'
  | 'bezeled-gray-2'
  | 'bezeled'
  | 'ghost';
export type ButtonBaseSize = 'sm' | 'md' | 'lg';
export type TypographyBaseSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export type TypographyVariants =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption1'
  | 'caption2'
  | 'text'
  | 'display';

export type SpaceSizes =
  | 0
  | 2
  | 4
  | 6
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 24
  | 32
  | 48;

export interface MarginDesignProps {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  margin?: number;
}

export interface PaddingDesignProps {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  padding?: number;
}

export interface SizeDesignProps {
  width?: number | string;
  height?: number | string;
  minHeight?: number;
}

export interface BorderDesignProps {
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: ColorType;
}

export interface Alignment {
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between';
  alignItems?: 'center' | 'flex-end' | 'flex-start' | 'baseline';
  flexDirection?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
}

export interface BlockProps extends Alignment {
  flex?: number;
  gap?: SpaceSizes;
}

export interface FillmentDesignProps {
  fill?: boolean;
  fillInRow?: boolean;
  flex?: number;
}

export interface ColorDesignProps {
  backgroundColour?: ColorType;
  backgroundColor?: ColorType;
  colour?: ColorType;
  opacity?: number;
}

export interface DesignProps
  extends MarginDesignProps,
    PaddingDesignProps,
    BorderDesignProps,
    Alignment,
    SizeDesignProps,
    ColorDesignProps,
    FillmentDesignProps {}

export interface TextDesignProps extends DesignProps {
  right?: boolean;
  left?: boolean;
  center?: boolean;
  color?: ColorType;
}
