import React, {memo, useCallback} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Icon, IconProps} from '../Icon';
import {
  DesignProps,
  TypographyBaseSize,
  TypographyVariants,
} from 'types/design';

import Spinner from '../Spinner/Spinner';
import {ColorType} from 'assets/colors';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import Text from '../Text/Text';
import {FontWeightType} from 'assets/typography';
import {designPropToStyle} from 'helpers/utils/design.utils';

interface Props extends DesignProps {
  textStyle?: TextStyle;
  textProps?: {
    variant?: TypographyVariants;
    size?: TypographyBaseSize;
    fontWeight?: FontWeightType;
  };
  buttonStyle?: ViewStyle;
  onPress?: () => void;
  text: string;
  testID?: string;
  iconProps?: IconProps;
  loading?: boolean;
  activeOpacity?: number;
  textColor?: ColorType;
  buttonColor?: ColorType;
  disabled?: boolean;
}

function ButtonBasic(props: Props) {
  const {
    text,
    textStyle,
    buttonStyle,
    onPress,
    testID,
    iconProps,
    loading,
    activeOpacity = 0.5,
    textColor = 'bw-white',
    buttonColor = 'neutral.950',
    textProps = {
      variant: 'body',
      size: 'sm',
      fontWeight: '500',
    },
    disabled = false,
  } = props;

  const onPressButton = useCallback(() => {
    if (loading || disabled) return;
    onPress && onPress();
  }, [loading, disabled, onPress]);

  const [backgroundColorHex] = useThemeColor([
    !disabled ? buttonColor : 'neutral.400',
  ]);
  const designPropStyle = designPropToStyle(props);

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : activeOpacity}
      testID={testID}
      onPress={onPress}
      style={[
        styles.row,
        designPropStyle,
        buttonStyle,
        {backgroundColor: backgroundColorHex},
      ]}>
      {!loading ? (
        <Text
          color={textColor}
          style={[textStyle]}
          variant="text"
          size="md"
          fontWeight="500"
          {...textProps}>
          {text}
        </Text>
      ) : null}
      <Spinner color={textColor} size="small" loading={loading} simple />
      {iconProps && !loading ? (
        <Icon {...iconProps} onPress={onPressButton} />
      ) : null}
    </TouchableOpacity>
  );
}

export default memo(ButtonBasic);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 4,
    paddingVertical: 12,
    height: 48,
  },
});
