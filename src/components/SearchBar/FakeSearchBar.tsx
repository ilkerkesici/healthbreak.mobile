import {Block, Icon, Text} from 'components/CoreComponents';
import React, {memo} from 'react';

interface Props {
  placeholder?: string;
  onPress?: () => void;
}

const FakeSearchBar: React.FC<Props> = ({placeholder, onPress}) => {
  return (
    <Block
      fill
      height={48}
      justifyContent="center"
      paddingHorizontal={14}
      paddingVertical={10}
      backgroundColour="custom-wb"
      borderRadius={4}
      borderWidth={1}
      borderColor="neutral.300"
      flexDirection="row"
      onPress={onPress}>
      <Icon marginRight={4} name="o:search-normal" color="neutral.600" />
      <Text variant="text" size="lg" color="neutral.600" fillInRow>
        {placeholder}
      </Text>
    </Block>
  );
};

export default memo(FakeSearchBar);
