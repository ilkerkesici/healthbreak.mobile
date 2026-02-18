// import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
// import {AnalyticEventTypes} from 'helpers/analytic/types';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {designPropToStyle} from 'helpers/utils/design.utils';

import React, {memo, useCallback} from 'react';
import {
  LayoutChangeEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BlockProps, DesignProps} from 'types/design';

export interface Props extends BlockProps, DesignProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  onLongPress?: () => void;
  backgroundColorForce?: string;
  activeOpacity?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  // pressEvent?: AnalyticEventTypes;
}

function Block({
  children,
  onPress,
  onLongPress,
  backgroundColour = 'transparent',
  backgroundColorForce,
  borderColor = 'transparent',
  style,
  activeOpacity = 0.5,
  onLayout,
  // pressEvent,
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

  const onPressItem = useCallback(() => {
    onPress?.();
    // if (pressEvent) {
    //   // AnalyticHelper.logEvent(pressEvent);
    // }
  }, [onPress]);

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPressItem}
        onLongPress={onLongPress}
        onLayout={onLayout}
        hitSlop={hitSlop}
        style={[
          designProps,
          borderStyle,
          {backgroundColor: backgroundColorForce ?? backgroundColorHex},
          style,
        ]}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={[
        designProps,
        borderStyle,
        {backgroundColor: backgroundColorForce ?? backgroundColorHex},
        style,
      ]}
      onLayout={onLayout}>
      {children}
    </View>
  );
}

export default memo(Block);

const hitSlop = {bottom: 5, top: 5, right: 5, left: 5};
