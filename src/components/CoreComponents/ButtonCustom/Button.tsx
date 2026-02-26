import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {
  buttonVariantStyles,
  getJustIconButtonMeasures,
  iconColors,
  iconMargins,
  iconSizesWithoutText,
  iconSizesWithText,
  justIconButtonDefaultStyle,
  textColorByVariant,
  useGetTextStyle,
} from './Button.style';
import {ButtonProps} from './Button.type';
import useButtonHook from './useButtonHook';

import Display from '../Display/Display';
import {Icon} from '../Icon';
import Spinner from '../Spinner/Spinner';
import Text from '../Text/Text';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {ColorType} from 'assets/colors';
import {designPropToStyle} from 'helpers/utils/design.utils';
import {DesignProps} from 'types/design';

const Button: React.FC<ButtonProps> = props => {
  const {
    size = 'lg',
    variant = 'primary',
    text,
    leftIcon,
    rightIcon,
    icon,
    disabled,
    loading,
    transparent,
    forceBgColor,
  } = props;
  const designPropStyle = designPropToStyle(props as DesignProps);
  const {focused, disabledTag, onPressIn, onPressOut, onButtonPressed} =
    useButtonHook(props);
  const justIcon = icon && !text;

  const buttonTextStyle = useGetTextStyle({size, disabled, variant});

  const {backgroundColor: focusBgColor, ...focusPropsRest} =
    buttonVariantStyles[
      `button-${variant}-${size}${focused && !disabled ? '-focus' : '-unfocus'}`
    ];

  const {
    backgroundColor: bgColor,
    borderColor: borderColor,
    ...viewColorRest
  } = buttonVariantStyles[`button-${variant}-${size}${disabledTag}`];

  const [buttonFocusBgColor, buttonBgColor, buttonBorderColor] = useThemeColor([
    transparent ? 'transparent' : forceBgColor || (focusBgColor as ColorType),
    transparent ? 'transparent' : forceBgColor || (bgColor as ColorType),
    transparent ? 'transparent' : forceBgColor || (borderColor as ColorType),
  ]);

  const loadingOpacity = {opacity: loading ? 0 : 1};

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onButtonPressed}
      activeOpacity={1}
      style={[designPropStyle]}>
      <View
        style={[
          focused
            ? {
                ...focusPropsRest,
                backgroundColor: buttonFocusBgColor,
                borderColor: buttonBorderColor,
              }
            : focusPropsRest,
        ]}>
        <View
          style={[
            {backgroundColor: buttonBgColor, borderColor: buttonBorderColor},
            viewColorRest,
            justIcon ? getJustIconButtonMeasures(size) : undefined,
            justIcon ? justIconButtonDefaultStyle : undefined,
          ]}>
          <Display show={leftIcon}>
            <Icon
              name={leftIcon}
              {...iconSizesWithText[size]}
              color={iconColors[`${variant}${disabledTag}`]}
              marginRight={iconMargins[size]}
              style={[loadingOpacity]}
            />
          </Display>
          <Display show={justIcon}>
            <Icon
              name={icon}
              {...iconSizesWithoutText[size]}
              color={iconColors[`${variant}${disabledTag}`]}
              style={[loadingOpacity]}
            />
          </Display>
          <Display show={!!text}>
            <Text style={[buttonTextStyle, loadingOpacity]}>{text}</Text>
          </Display>
          <Spinner
            color={textColorByVariant()[variant]}
            // simple
            fullScreen
            size={'small'}
            loading={loading}
          />
          <Display show={rightIcon && !loading}>
            <Icon
              name={rightIcon}
              {...iconSizesWithText[size]}
              color={iconColors[`${variant}${disabledTag}`]}
              marginLeft={iconMargins[size]}
            />
          </Display>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
