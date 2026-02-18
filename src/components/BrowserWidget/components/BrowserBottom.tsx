import {Block, Icon} from 'components/CoreComponents';
import React from 'react';
import {Linking} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Share from 'react-native-share';

interface Props {
  currentUrl: string;
  previousActive?: boolean;
  nextActive?: boolean;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  title?: string;
}

const BrowserBottom: React.FC<Props> = ({
  currentUrl,
  previousActive,
  nextActive,
  title,
  onPressNext,
  onPressPrevious,
}) => {
  const insets = useSafeAreaInsets();

  const onPressShare = () => {
    Share.open({message: `${title}\n\n${currentUrl}`})
      .then(() => {})
      .catch(() => {});
  };

  const onPressLinking = () => {
    Linking.openURL(currentUrl);
  };

  return (
    <Block
      paddingHorizontal={24}
      flexDirection="row"
      backgroundColour="custom-wb"
      justifyContent="space-between"
      paddingBottom={insets.bottom}
      padding={10}
      fill>
      <Block
        onPress={previousActive ? onPressPrevious : undefined}
        fill
        width={48}
        height={40}>
        <Icon
          name="o:chevron_left"
          color={previousActive ? 'primary.500' : 'neutral.600'}
        />
      </Block>
      <Block fillInRow />
      <Block
        onPress={nextActive ? onPressNext : undefined}
        fill
        width={48}
        height={40}>
        <Icon
          name="o:chevron_right"
          color={nextActive ? 'primary.500' : 'neutral.600'}
        />
      </Block>
      <Block fillInRow />
      <Block onPress={onPressShare} fill width={48} height={40}>
        <Icon name="o:arrow_up_on_square" color={'primary.500'} />
      </Block>
      <Block fillInRow />
      <Block onPress={onPressLinking} fill width={48} height={40}>
        <Icon name="o:compass" color={'primary.500'} />
      </Block>
    </Block>
  );
};

export default BrowserBottom;
