import React, {memo} from 'react';
import Block from '../Block';

interface Props {
  value: boolean;
  onValueChange?: (status: boolean) => void;
}

const Switch: React.FC<Props> = ({value, onValueChange}) => {
  return (
    <Block
      width={36}
      height={20}
      borderRadius={12}
      backgroundColour={value ? 'green.600' : 'neutral.300'}
      paddingHorizontal={2}
      alignItems={value ? 'flex-end' : 'flex-start'}
      justifyContent="center"
      onPress={() => onValueChange?.(value)}>
      <Block
        backgroundColour="custom-wb"
        width={16}
        height={16}
        borderRadius={8}
      />
    </Block>
  );
};

export default memo(Switch);
