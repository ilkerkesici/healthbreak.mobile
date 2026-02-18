import {ColorType} from 'assets/colors';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import React, {memo, useEffect, useMemo, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {DesignProps} from 'types/design';

export interface SkeletonProps extends DesignProps {
  variant?: 'circle' | 'box';
  width: number | string;
  height?: number;
  backgroundColor?: ColorType;
}
const Skeleton: React.FC<SkeletonProps> = ({
  backgroundColor = 'neutral.400',
  variant,
  width,
  height = 20,
  ...rest
}) => {
  const [backgroundColorHex] = useThemeColor([backgroundColor]);
  const opacity = useRef(new Animated.Value(0.4));

  let borderRadius = 4;
  if (variant === 'circle') {
    borderRadius = height / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 400,
        }),
      ]),
    ).start();
  }, [opacity]);

  const style = useMemo(
    () => [
      {
        opacity: opacity.current,
        height,
        width,
        borderRadius,
        backgroundColor: backgroundColorHex,
      } as ViewStyle,
    ],
    [opacity, backgroundColorHex, borderRadius, height, width],
  );

  return <Animated.View {...rest} style={style} />;
};

export default memo(Skeleton);
