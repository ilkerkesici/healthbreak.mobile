import React from 'react';
import {Insets, StyleSheet, TouchableOpacity, View} from 'react-native';
import iconLookUp from './Icon.library';
import {IconProps} from './Icon.type';
import {designPropToStyle} from 'helpers/utils/design.utils';
import {useThemeColor} from 'helpers/hooks/useThemeColor';

export const Icon: React.FC<IconProps> = props => {
  const {
    onPress,
    clickable = !!onPress,
    testID,
    disabled,
    color,
    strokeColor,
    badge,
    ...rest
  } = props;
  const style = designPropToStyle(props);

  return clickable ? (
    <TouchableOpacity
      testID={testID}
      style={style}
      onPress={onPress}
      hitSlop={hitSlop}
      activeOpacity={1}
      disabled={disabled}>
      <GeneratedIcon color={color} strokeColor={strokeColor} {...rest} />
      {badge ? <Badge /> : null}
    </TouchableOpacity>
  ) : (
    <View testID={testID} style={style}>
      <GeneratedIcon color={color} strokeColor={strokeColor} {...rest} />
      {badge ? <Badge /> : null}
    </View>
  );
};

const GeneratedIcon: React.FC<IconProps> = ({
  color = 'neutral.950',
  strokeColor = 'neutral.700',
  name,
  ...rest
}: IconProps): JSX.Element => {
  const [colorHex, strokeColorHex] = useThemeColor([color, strokeColor]);

  if (!name || !iconLookUp[name]) {
    return <></>;
  }
  const SelectedIcon = iconLookUp[name];
  return (
    <SelectedIcon
      width={rest.width || rest.size}
      height={rest.height || rest.size}
      color={colorHex}
      strokeColor={strokeColorHex}
      {...rest}
    />
  );
};

const Badge = () => {
  const [backgroundColor] = useThemeColor(['red.500']);
  return <View style={[styles.badge, {backgroundColor}]} />;
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 2,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 7,
  },
});
const hitSlop: Insets = {top: 5, bottom: 5, right: 5, left: 5};
