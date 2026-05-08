import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
// import {APIEndpointHelper} from 'helpers/ApiEndpointHelper';
// import OneSignalHelper from 'helpers/OneSignalHelper';
import { useCallback } from 'react';
import { useAppInitStore } from 'store/useAppInitStore';
import useAnonymousLoginHook from './auth/useAnonymousLoginHook';
import { Alert } from 'react-native';
import { i18n } from 'constants/i18n';

export default function useAuthHook() {
  const { user, setToken, setUser } = useAppInitStore();
  const navigation = useNavigation<RootNavigation>();
  const { signIn, signOut } = useAnonymousLoginHook({});

  const getUser = useCallback(async () => {
    const result = await CommonApiHelper.getUser();
    console.log('user res', result);
    if (result) {
      setUser(result);
    }
    return result;
  }, [setUser]);

  const logout = useCallback(async () => {
    setToken(undefined);
    setUser(undefined);
    await signOut();
    await signIn();

    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'WELCOME' }],
    });
    navigation.dispatch(action);
  }, [navigation, setToken, setUser, signIn, signOut]);

  const onPressDeleteAccount = useCallback(async () => {
    Alert.alert(
      i18n.t('menu.delete_account'),
      i18n.t('menu.delete_account_description'),
      [
        {
          text: i18n.t('menu.cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('menu.delete_account_button'),
          onPress: async () => {
            await logout();
          },
        },
      ],
    );
  }, [logout]);

  return {
    user,
    isLoggedIn: !!user?.email,
    getUser,
    logout,
    onPressDeleteAccount,
  };
}
