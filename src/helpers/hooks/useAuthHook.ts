import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootNavigation} from 'containers/Router/Router.type';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
// import {APIEndpointHelper} from 'helpers/ApiEndpointHelper';
// import OneSignalHelper from 'helpers/OneSignalHelper';
import {useCallback} from 'react';
import {useAppInitStore} from 'store/useAppInitStore';

export default function useAuthHook() {
  const {user, token, setToken, setUser} = useAppInitStore();
  const navigation = useNavigation<RootNavigation>();

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

    const action = CommonActions.reset({
      index: 0,
      routes: [{name: 'TABBAR_STACK'}],
    });
    navigation.dispatch(action);
  }, [navigation, setToken, setUser]);

  return {
    user,
    isLoggedIn: !!token,
    getUser,
    logout,
  };
}
