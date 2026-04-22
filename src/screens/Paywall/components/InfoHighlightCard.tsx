import React from 'react';
import { Block, Icon, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';

export default function InfoHighlightCard() {
  const { i18n } = useTranslation();

  return (
    <Block
      backgroundColour="primary.500/05"
      borderColor="primary.500/10"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      padding={12}
      borderWidth={1}
      borderRadius={99}
      fill
      marginTop={14}
    >
      <Block
        width={32}
        height={32}
        backgroundColour="primary.500/20"
        borderRadius={99}
        alignItems="center"
        justifyContent="center"
        marginRight={12}
      >
        <Icon name="o:leaf" size={18} color="primary.500" />
      </Block>
      <Text marginLeft={8} size="xs" color="primary.500" fillInRow left>
        {i18n.t('paywall.new.info_card')}
      </Text>
    </Block>
  );
}
