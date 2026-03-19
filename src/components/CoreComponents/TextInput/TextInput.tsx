import React, { useState } from 'react';
import { TextInput as RNInput, StyleSheet, TextInputProps } from 'react-native';

import Block from '../Block';

import { Icon, IconProps } from '../Icon';
import Text from '../Text/Text';
import {
  DesignProps,
  TypographyBaseSize,
  TypographyVariants,
} from 'types/design';
import { ColorType } from 'assets/colors';
import { FontWeightType } from 'assets/typography';
import { ButtonProps } from '../ButtonCustom/Button.type';
import { useThemeColor } from 'helpers/hooks/useThemeColor';
import Button from '../ButtonCustom';

const isEmpty = (data: any) => {
  if (!data) {
    return true;
  }
  return false;
};

interface Props extends DesignProps, TextInputProps {
  leftIconProps?: IconProps;
  rightIconProps?: IconProps;
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

  rightButtonProps?: ButtonProps;
  errorText?: string;
  disabled?: boolean;
  label?: string;
  multiline?: boolean;
  renderRight?: () => React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  leftIconProps,
  rightIconProps,
  placeholderTextColor = 'neutral.600',
  textColor = 'neutral.950',
  textStyle = { variant: 'text', size: 'md', fontWeight: '400' },
  placeholderTextStyle = { variant: 'text', size: 'md', fontWeight: '400' },
  backgroundColor = 'custom-wb',
  borderColor = 'neutral.400',
  value,
  borderRadius = 20,
  rightButtonProps,
  errorText,
  disabled,
  secureTextEntry,
  label,
  renderRight,
  multiline = false,
  ...rest
}) => {
  const [placeholderColor, colorOfText, bgColorHex] = useThemeColor([
    placeholderTextColor,
    isEmpty(errorText) ? textColor : 'red.500',
    backgroundColor,
  ]);
  const [secure, setSecure] = useState(secureTextEntry);

  const propsTextStyle =
    textStyle && value
      ? {
          fontSize: 16,
          fontWeight: textStyle.fontWeight,
        }
      : placeholderTextStyle && !value
      ? {
          fontSize: 16,
          fontWeight: placeholderTextStyle.fontWeight,
        }
      : undefined;

  if (disabled) {
    return (
      <Block
        {...(rest as any)}
        alignItems="flex-start"
        backgroundColour={'neutral.00'}
        borderRadius={4}
      >
        <Block
          borderRadius={borderRadius}
          backgroundColour={'neutral.300'}
          fill
          flexDirection="row"
          paddingVertical={12}
          paddingHorizontal={14}
        >
          {leftIconProps ? <Icon marginRight={7} {...leftIconProps} /> : null}
          <Text fillInRow left variant="text" size="lg">
            {value}
          </Text>
          {rightButtonProps ? <Button {...rightButtonProps} /> : null}
          {rightIconProps ? (
            <Icon marginRight={-3} {...rightIconProps} />
          ) : null}
          {renderRight ? renderRight() : undefined}
          {errorText ? (
            <Text
              style={styles.errorText}
              variant="caption1"
              size="lg"
              color="red.500"
            >
              {errorText}
            </Text>
          ) : null}
        </Block>
      </Block>
    );
  }

  return (
    <Block {...(rest as any)} alignItems="flex-start">
      {label ? (
        <Text
          marginBottom={4}
          variant="subhead"
          size="xs"
          color={'primary.500'}
        >
          {label}
        </Text>
      ) : null}
      <Block
        borderRadius={borderRadius}
        backgroundColour={backgroundColor}
        borderWidth={1}
        borderColor={isEmpty(errorText) ? borderColor : 'red.500'}
        fill
        flexDirection="row"
      >
        {leftIconProps ? <Icon marginRight={7} {...leftIconProps} /> : null}
        <RNInput
          placeholderTextColor={placeholderColor}
          style={[
            styles.textInput,
            { color: colorOfText },
            propsTextStyle,
            { backgroundColor: bgColorHex },
            multiline && { minHeight: 100, textAlignVertical: 'top' },
          ]}
          value={value}
          {...rest}
          secureTextEntry={secure}
          keyboardAppearance="dark"
          multiline={multiline}
        />
        {rightButtonProps ? <Button {...rightButtonProps} /> : null}
        {rightIconProps ? <Icon marginRight={7} {...rightIconProps} /> : null}
        {secureTextEntry ? (
          <Icon
            marginRight={16}
            name={secure ? 'o:eye' : 'o:eye-slash'}
            color="neutral.600"
            onPress={() => setSecure(!secure)}
            {...rightIconProps}
          />
        ) : null}
        {renderRight ? renderRight() : undefined}
        {errorText ? (
          <Text
            style={styles.errorText}
            variant="caption1"
            size="lg"
            color="red.500"
          >
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
    // shadowColor: '#FF00FF',
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    marginLeft: 5,
  },
});

export default TextInput;
