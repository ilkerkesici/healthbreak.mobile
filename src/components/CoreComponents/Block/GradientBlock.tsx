import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {designPropToStyle} from 'helpers/utils/design.utils';
import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {BlockProps, DesignProps} from 'types/design';
import LinearGradient from 'react-native-linear-gradient';

export interface Props extends BlockProps, DesignProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  backgroundColorForce?: string;
  gradientColors?: string[];
}

export default function GradientBlock({
  children,
  onPress,
  backgroundColour = 'transparent',
  backgroundColorForce,
  borderColor = 'transparent',
  gradientColors = ['#134C82', '#2ba34f'],
  style,
  ...rest
}: Props) {
  const [backgroundColorHex, borderColorHex] = useThemeColor([
    backgroundColour,
    borderColor,
  ]);
  const designProps = designPropToStyle({
    ...rest,
  });
  const borderStyle = {borderColor: borderColorHex};

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[
          designProps,
          borderStyle,
          {backgroundColor: backgroundColorForce ?? backgroundColorHex},
          shadowStyle,
          style,
        ]}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={shadowStyle}>
      <LinearGradient
        colors={gradientColors}
        style={[
          designProps,
          borderStyle,
          {backgroundColor: backgroundColorForce ?? backgroundColorHex},
          style,
        ]}>
        {children}
      </LinearGradient>
    </View>
  );
}

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};
