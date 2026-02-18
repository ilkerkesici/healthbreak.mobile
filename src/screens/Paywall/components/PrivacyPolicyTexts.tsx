import React, { memo } from 'react';

import { Platform } from 'react-native';

import { Block, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';

const PrivacyPolicyTexts = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const onPressTermsOfUse = () => {
    navigation.navigate('BROWSER', {
      uri: 'https://sites.google.com/view/bettermeai-terms-of-use/ana-sayfa',
    });
  };

  const onPressEula = () => {
    navigation.navigate('BROWSER', {
      uri: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
    });
  };

  const onPressPrivacyPolicy = () => {
    navigation.navigate('BROWSER', {
      uri: 'https://sites.google.com/view/better-me-ai-privacy-policy/ana-sayfa',
    });
  };

  return (
    <Block fill>
      <Text center variant='caption1' size='lg'>
        <Text variant='caption1' size='lg' onPress={onPressPrivacyPolicy} underline>
          {i18n.t('paywall.privacyPolicy')}
        </Text>
        {', '}
        {Platform.OS === 'ios' ? (
          <Text variant='caption1' size='lg' onPress={onPressTermsOfUse} underline>
            {i18n.t('paywall.termsOfService')}
          </Text>
        ) : null}
        {Platform.OS === 'ios' ? ' ' : ''}
        {i18n.t('paywall.and')}{' '}
        {Platform.OS === 'ios' ? (
          <Text variant='caption1' size='lg' onPress={onPressEula} underline>
            {'EULA'}
          </Text>
        ) : (
          <Text variant='caption1' size='lg' onPress={onPressTermsOfUse} underline>
            {i18n.t('paywall.termsOfService')}
          </Text>
        )}
      </Text>
    </Block>
  );
};

export default memo(PrivacyPolicyTexts);
