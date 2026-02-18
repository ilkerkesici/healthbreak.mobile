import {Block, Text} from 'components/CoreComponents';
import {useTheme} from 'helpers/hooks/useThemeColor';
import React, {memo} from 'react';

interface Props {
  text: string;
  selected?: boolean;
  size?: 'sm' | 'md';
  onPress?: () => void;
}

const BubbleButton: React.FC<Props> = ({
  text,
  selected,
  size = 'sm',
  onPress,
}) => {
  const {isDarkMode} = useTheme();
  const isSm = size === 'sm';

  return (
    <Block
      paddingHorizontal={isSm ? 10 : 12}
      paddingVertical={isSm ? 2 : 8}
      borderRadius={48}
      onPress={onPress}
      backgroundColour={selected ? 'neutral.950' : 'custom-wb'}>
      <Text
        variant="text"
        size={size}
        fontWeight="500"
        color={
          selected ? 'bw-white' : isDarkMode ? 'neutral.500' : 'neutral.600'
        }>
        {text}
      </Text>
    </Block>
  );
};

export default memo(BubbleButton);
