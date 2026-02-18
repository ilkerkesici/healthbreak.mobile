import { Block, Spinner, Text } from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { memo } from 'react';
import { Platform } from 'react-native';
import { useMenu } from './useMenu';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import ListItem from 'components/CoreComponents/ListItem';

const Menu = () => {
  const { i18n } = useTranslation();
  const {
    onPressPrivacyPolicy,
    onPressTermsOfUse,
    onPressEula,
    onPressDeleteAccount,
    onPressLanguage,
    onPressContact,
    onPressPromoCode,
    loading,
  } = useMenu();

  return (
    <ScreenContainer safeAreaBottom safeAreaTop>
      <Block fill flex={1} paddingTop={30} justifyContent="flex-start">
        <Block
          fill
          paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
          marginBottom={40}
        >
          <Text fill left size="xl" variant="headline" fontWeight="600">
            {i18n.t('menu.title')}
          </Text>
          <Text marginTop={10}>{i18n.t('menu.description')}</Text>
        </Block>

        <ListItem
          text={i18n.t('menu.language')}
          onPress={onPressLanguage}
          rightIcon={{ name: 'o:chevron_right' }}
        />
        <ListItem
          text={i18n.t('menu.promo_code')}
          onPress={onPressPromoCode}
          rightIcon={{ name: 'o:chevron_right' }}
        />
        <ListItem
          text={i18n.t('menu.contact')}
          onPress={onPressContact}
          rightIcon={{ name: 'o:chevron_right' }}
        />
        <ListItem
          text={i18n.t('menu.privacy_policy')}
          onPress={onPressPrivacyPolicy}
          rightIcon={{ name: 'o:chevron_right' }}
        />
        <ListItem
          text={i18n.t('menu.terms_of_use')}
          onPress={onPressTermsOfUse}
          rightIcon={{ name: 'o:chevron_right' }}
        />
        <Display show={Platform.OS === 'ios'}>
          <ListItem
            text={i18n.t('menu.eula')}
            onPress={onPressEula}
            rightIcon={{ name: 'o:chevron_right' }}
          />
        </Display>
      </Block>
      {/* <Block fill flexDirection="row">
        <Block fillInRow>
          <Text
            variant="caption1"
            size="xs"
            underline
            onPress={onPressPrivacyPolicy}
          >
            {i18n.t('menu.privacy_policy')}
          </Text>
        </Block>
        <Block fillInRow>
          <Text
            underline
            variant="caption1"
            size="xs"
            onPress={onPressTermsOfUse}
          >
            {i18n.t('menu.terms_of_use')}
          </Text>
        </Block>
      </Block>
      <Display show={Platform.OS === 'ios'}>
        <Block fill marginTop={10}>
          <Text underline variant="caption1" size="xs" onPress={onPressEula}>
            {i18n.t('menu.eula')}
          </Text>
        </Block>
      </Display> */}
      <Text
        fill
        center
        size="xs"
        marginTop={40}
        color="red.500"
        underline
        onPress={onPressDeleteAccount}
      >
        {i18n.t('menu.delete_account')}
      </Text>
      <Spinner loading={loading} />
    </ScreenContainer>
  );
};

export default memo(Menu);
