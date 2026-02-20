import { useThemeColor } from 'helpers/hooks/useThemeColor';
import { textDesignPropToStyle } from 'helpers/utils/design.utils';
import React, { memo } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import {
  TextDesignProps,
  TypographyBaseSize,
  TypographyVariants,
} from 'types/design';

import { FontWeightType, typography } from 'assets/typography';
import { ColorType } from 'assets/colors';

/** iOS ve Android'de linklenen Manrope variable font (Manrope-VariableFont_wght.ttf) */
export const FONT_FAMILY_MANROPE = 'Manrope-VariableFont_wght';

export interface CustomTextProps extends TextDesignProps, TextProps {
  variant?: TypographyVariants;
  size?: TypographyBaseSize;
  fontWeight?: FontWeightType;
  underline?: boolean;
}

function Text({
  children,
  color = 'neutral.950',
  style,
  variant = 'text',
  size = 'lg',
  fontWeight,
  underline,
  ...rest
}: CustomTextProps) {
  const [textColor] = useThemeColor([color as ColorType]);

  const propStyle = textDesignPropToStyle(rest);
  const underlineStyle: TextStyle = underline
    ? { textDecorationLine: 'underline' }
    : {};

  return (
    <RNText
      {...rest}
      style={[
        propStyle,
        typography[variant][size],
        {
          color: textColor,
          fontWeight: fontWeight,
          fontFamily: FONT_FAMILY_MANROPE,
        },
        // variantStyle,
        style,
        underlineStyle,
      ]}
      allowFontScaling={false}
    >
      {children}
    </RNText>
  );
}

export default memo(Text);
