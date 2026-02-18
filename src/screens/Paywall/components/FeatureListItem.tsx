import {Block, Icon, Text} from 'components/CoreComponents';
import React from 'react';

interface Props {
  text: string;
}

export default function FeatureListItem({text}: Props) {
  return (
    <Block fill flexDirection="row">
      <Block
        width={30}
        height={30}
        borderRadius={15}
        backgroundColour="green.100"
        justifyContent="center"
        alignItems="center">
        <Icon name="o:check" size={18} color="green.500" />
      </Block>
      <Text marginLeft={8} fillInRow left variant="text" size="md">
        {text}
      </Text>
    </Block>
  );
}
