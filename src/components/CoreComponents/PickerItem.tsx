import React, {memo} from 'react';
import Block from './Block';
import Text from './Text/Text';
import {Icon} from './Icon';

interface Props {
  placeholder: string;
  value?: string;
  onPress: () => void;
}

const PickerItem = ({placeholder, value, onPress}: Props) => {
  return (
    <Block
      backgroundColour="custom-wn"
      fill
      borderRadius={4}
      borderWidth={1}
      borderColor="neutral.400"
      flexDirection="row"
      onPress={onPress}
      paddingHorizontal={14}
      paddingVertical={8}>
      <Text
        color={value ? 'neutral.950' : 'neutral.600'}
        fillInRow
        marginRight={8}
        size="lg">
        {!value ? placeholder : value}
      </Text>
      <Icon name="o:chevron_down" size={20} color="neutral.600" />
    </Block>
  );
};

export default memo(PickerItem);
