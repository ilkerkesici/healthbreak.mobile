import React from 'react';
import {TextInput as RNInput, StyleSheet, TextInputProps} from 'react-native';

import Block from '../Block';

import {Icon, IconProps} from '../Icon';
import Text from '../Text/Text';
import {
  DesignProps,
  TypographyBaseSize,
  TypographyVariants,
} from 'types/design';
import {ColorType} from 'assets/colors';
import {FontWeightType, typography} from 'assets/typography';
import {ButtonProps} from '../ButtonCustom/Button.type';
import {useTheme, useThemeColor} from 'helpers/hooks/useThemeColor';
import Button from '../ButtonCustom';

const isEmpty = (data: any) => {
  if (!data) {
    return true;
  }
  return false;
};

interface Props extends DesignProps, TextInputProps {
  leftIconProps?: IconProps;
  placeholderTextColor?: ColorType;
  textColor?: ColorType;
  textStyle?: {
    variant: TypographyVariants;
    size: TypographyBaseSize;
    fontWeight: FontWeightType;
  };
  placeholderTextStyle?: {
    variant: TypographyVariants;
    size: TypographyBaseSize;
    fontWeight: FontWeightType;
  };
  backgroundColor?: ColorType;
  label?: string;
  rightButtonProps?: ButtonProps;
  errorText?: string;
  renderRight?: () => React.ReactNode;
}

const DarkInput: React.FC<Props> = ({
  leftIconProps,
  placeholderTextColor = 'neutral.600',
  textColor,
  textStyle,
  placeholderTextStyle,
  // backgroundColor = 'secondary.900',
  borderColor = 'secondary.800',
  value,
  label,
  borderRadius = 4,
  rightButtonProps,
  errorText,
  borderWidth,
  renderRight,
  ...rest
}) => {
  //   const [focused, setFocused] = useState(false);
  const {isDarkMode} = useTheme();
  const defaultTextColor: ColorType = isDarkMode
    ? 'neutral.800'
    : 'neutral.300';
  const [placeholderColor, colorOfText, bgColor] = useThemeColor([
    placeholderTextColor,
    isEmpty(errorText) ? textColor || defaultTextColor : 'red.500',
    !isDarkMode ? 'secondary.900' : 'neutral.300',
  ]);
  const propsTextStyle =
    textStyle && value
      ? {
          ...typography[textStyle.variant][textStyle.size],
          fontWeight: textStyle.fontWeight,
        }
      : placeholderTextStyle && !value
      ? {
          ...typography[placeholderTextStyle.variant][
            placeholderTextStyle.size
          ],
          fontWeight: placeholderTextStyle.fontWeight,
        }
      : undefined;

  return (
    <Block {...(rest as any)} alignItems="flex-start">
      {label ? (
        <Text
          marginBottom={4}
          variant="subhead"
          size="xs"
          color={!isDarkMode ? 'neutral.500' : 'neutral.600'}>
          {label}
        </Text>
      ) : null}
      <Block
        borderRadius={borderRadius}
        paddingVertical={4}
        paddingHorizontal={12}
        backgroundColour={!isDarkMode ? 'secondary.900' : 'neutral.300'}
        borderWidth={borderWidth ?? isEmpty(errorText) ? 1 : 1}
        borderColor={isEmpty(errorText) ? borderColor : 'red.500'}
        fill
        flexDirection="row">
        {leftIconProps ? <Icon marginRight={7} {...leftIconProps} /> : null}
        <RNInput
          placeholderTextColor={placeholderColor}
          style={[
            styles.textInput,
            {color: colorOfText},
            propsTextStyle,
            {backgroundColor: bgColor},
          ]}
          value={value}
          //   onFocus={() => setFocused(true)}
          //   onBlur={() => setFocused(false)}
          {...rest}
        />
        {rightButtonProps ? <Button {...rightButtonProps} /> : null}
        {renderRight ? renderRight() : undefined}
        {errorText ? (
          <Text
            style={styles.errorText}
            variant="caption1"
            size="lg"
            color="red.500">
            {errorText}
          </Text>
        ) : null}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    marginLeft: 5,
  },
});

export default DarkInput;
