import React, {memo} from 'react';
import Block from './Block';
import {Icon, IconProps} from './Icon';
import Display from './Display';
import Text from './Text/Text';
import {ColorType} from 'assets/colors';

export interface ListItemProps {
  leftIcon?: IconProps;
  text: string;
  textColor?: ColorType;
  rightIcon?: IconProps;
  onPress?: () => void;
  renderRight?: () => React.ReactNode;
  extraData?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  leftIcon,
  text,
  rightIcon,
  textColor = 'neutral.800',
  onPress,
  renderRight,
}) => {
  return (
    <Block fill flexDirection="row" padding={16} onPress={onPress}>
      <Display show={leftIcon}>
        <Icon marginRight={12} color="neutral.800" {...leftIcon} />
      </Display>
      <Text
        fillInRow
        variant="text"
        size="md"
        fontWeight="500"
        color={textColor}>
        {text}
      </Text>
      <Display show={rightIcon}>
        <Icon size={20} color="neutral.800" {...rightIcon} />
      </Display>
      {renderRight ? renderRight() : null}
    </Block>
  );
};

export default memo(ListItem);
