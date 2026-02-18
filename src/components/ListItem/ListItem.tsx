import {ColorType} from 'assets/colors';
import {Block, Icon, IconType, Text} from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import React from 'react';
import {DesignProps} from 'types/design';

export interface ListItemProps extends DesignProps {
  leftIcon?: IconType;
  rightIcon?: IconType;
  title?: string;
  onPress?: () => void;
  subtitle?: string;
  renderRight?: () => React.ReactNode;
  rightIconColor?: ColorType;
  showLayoutBackground?: boolean;
  testID?: string;
  disabled?: boolean;
  titleRight?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  leftIcon,
  rightIcon,
  rightIconColor,
  title,
  showLayoutBackground,
  renderRight,
  ...rest
}) => {
  return (
    <Block
      fill
      flexDirection="row"
      height={52}
      backgroundColour={showLayoutBackground ? 'neutral.200' : undefined}
      borderRadius={8}
      paddingHorizontal={15}
      marginHorizontal={-15}
      {...rest}>
      <Display show={leftIcon}>
        <Icon name={leftIcon} size={16} marginRight={8} />
      </Display>
      <Block fillInRow>
        <Text variant="subhead" size="md" fill left fontWeight="500">
          {title}
        </Text>
      </Block>
      {renderRight?.()}
      <Display show={rightIcon}>
        <Icon name={rightIcon} size={16} color={rightIconColor} />
      </Display>
    </Block>
  );
};

export default ListItem;
