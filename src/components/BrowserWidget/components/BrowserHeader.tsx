import React from 'react';

import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, Icon, Text} from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';

interface Props {
  title?: string;
  onPressClose?: () => void;
  onPressRefresh?: () => void;
}

const BrowserHeader: React.FC<Props> = ({
  title,
  onPressClose,
  onPressRefresh,
}) => {
  const insets = useSafeAreaInsets();
  const {i18n} = useTranslation();
  return (
    <Block
      paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      paddingTop={insets.top}
      paddingVertical={10}
      backgroundColour="custom-wb"
      flexDirection="row">
      <Block onPress={onPressClose} width={90} fill alignItems="flex-start">
        <Text variant="body" size="lg" colour="primary.500">
          {i18n.t('common.close')}
        </Text>
      </Block>
      <Block flexDirection="row" fillInRow>
        <Text numberOfLines={1} variant="body" size="lg" fontWeight="600">
          {title}
        </Text>
      </Block>
      <Block width={90} fill alignItems="flex-end">
        <Icon
          onPress={onPressRefresh}
          size={24}
          name="o:arrow_path"
          color="primary.500"
        />
      </Block>
    </Block>
  );
};

export default BrowserHeader;
