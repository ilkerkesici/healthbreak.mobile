import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import useAuthHook from 'helpers/hooks/useAuthHook';
import useAnonymousLoginHook from 'helpers/hooks/auth/useAnonymousLoginHook';
import { useProcessHook } from 'helpers/hooks/useProcessHook';
import useTranslation from 'helpers/hooks/useTranslation';
import { useCallback, useState } from 'react';
import { Alert, Linking } from 'react-native';

export const useMenu = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootNavigation>();
  const { requestImages } = useProcessHook();
  const { signIn, signOut } = useAnonymousLoginHook({});
  const { user } = useAuthHook();

  const { i18n } = useTranslation();

  const onPressLanguage = () => {
    navigation.navigate('LANGUAGE_CHANGE');
  };

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
  const onPressPromoCode = () => {
    navigation.navigate('PROMO_CODE');
  };

  const goToOnboarding = useCallback(() => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'ONBOARDING', params: {} }],
    });
    navigation.dispatch(action);
  }, [navigation]);

  const onPressContact = () => {
    Linking.openURL(
      `mailto:info@venei.co?subject=Contact - Better Me AI&body=${i18n.t(
        'menu.contact_message',
        { token: user?.fb_uuid },
      )}`,
    );
  };

  const onPressDeleteAccount = async () => {
    if (!requestImages?.length) {
      Alert.alert(
        i18n.t('menu.delete_account_error'),
        i18n.t('menu.delete_account_error_description'),
      );
      return;
    }

    Alert.alert(
      i18n.t('menu.delete_account'),
      i18n.t('menu.delete_account_description'),
      [
        {
          text: i18n.t('menu.delete_account_button'),
          onPress: async () => {
            setLoading(true);
            await signOut();
            await signIn();
            goToOnboarding();
            setLoading(false);
          },
        },
        {
          text: i18n.t('menu.cancel'),
        },
      ],
    );
  };

  return {
    onPressPrivacyPolicy,
    onPressTermsOfUse,
    onPressEula,
    onPressDeleteAccount,
    onPressContact,
    onPressLanguage,
    onPressPromoCode,
    loading,
  };
};
