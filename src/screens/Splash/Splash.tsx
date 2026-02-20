/* eslint-disable react-hooks/exhaustive-deps */
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import React, { memo, useCallback, useEffect } from 'react';
import { useAppInitStore } from 'store/useAppInitStore';
import { useAppSettingStore } from 'store/useAppSettingStore';
import { useSplashStore } from 'store/useSplashStore';
// import usePremiumHook from 'helpers/hooks/usePremiumHook';
import useAuthHook from 'helpers/hooks/useAuthHook';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useAnonymousLoginHook from 'helpers/hooks/auth/useAnonymousLoginHook';
// import OneSignalHelper from 'helpers/OneSignalHelper';
import useTranslation from 'helpers/hooks/useTranslation';
import { requestTrackingTransparency } from 'helpers/PermissionHelper';

const Splash = () => {
  const { hasHydrated: hydratedApp, token, setProfile } = useAppInitStore();
  const { hasHydrated: hydratedSetting } = useAppSettingStore();

  // const { getAppSubscriptions, checkIsPremium } = usePremiumHook();
  const { getUser } = useAuthHook();
  const { signIn } = useAnonymousLoginHook({});
  const { initTranslation } = useTranslation();

  const closeSplash = useSplashStore(state => state.closeSplash);
  const navigation = useNavigation<RootNavigation>();

  const goToHome = useCallback(() => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'HOME', params: {} }],
    });
    navigation.dispatch(action);
  }, [navigation]);

  const goToOnboarding = useCallback(() => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'WELCOME', params: {} }],
    });
    navigation.dispatch(action);
  }, [navigation]);

  const initProject = useCallback(async () => {
    await initTranslation();
    // getAppSubscriptions();
    requestTrackingTransparency();
    // await OneSignalHelper.init();

    if (!token) {
      await signIn();
    }

    // const profile = await LooksGoodApi.getProfile();

    // setProfile(profile);

    // if (!profile) {
    //   goToOnboarding();
    //   closeSplash();
    //   return;
    // }
    const userInfo = await getUser();
    if (userInfo) {
      // checkIsPremium(userInfo);
      // await OneSignalHelper.login(userInfo.uid);
    }

    goToOnboarding();
    // goToHome();
    closeSplash();
  }, [token, goToHome, goToOnboarding, closeSplash]);

  useEffect(() => {
    if (hydratedApp && hydratedSetting) {
      initProject();
    }
  }, [hydratedApp, hydratedSetting]);

  return (
    <ScreenContainer safeAreaTop>{/* <Text>Splash</Text> */}</ScreenContainer>
  );
};

export default memo(Splash);
