import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {DesignProps} from 'types/design';
import {designPropToStyle} from 'helpers/utils/design.utils';

interface Props extends DesignProps {}

const Divider: React.FC<Props> = (props: Props) => {
  const designProps = designPropToStyle(props);
  const [backgroundColor] = useThemeColor([
    props.backgroundColour || 'neutral.300',
  ]);

  return (
    <View
      style={[
        {backgroundColor: backgroundColor},
        styles.container,
        designProps,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    alignSelf: 'stretch',
  },
});

export default Divider;
