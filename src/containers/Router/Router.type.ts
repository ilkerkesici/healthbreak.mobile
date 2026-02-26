import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SPLASH: undefined;
  HOME: undefined;
  MENU: undefined;
  TABBAR_STACK: undefined;
  ONBOARDING: undefined;
  BROWSER: { uri: string; incognito?: boolean };
  PAYWALL: undefined;
  LANGUAGE_CHANGE: undefined;
  PROMO_CODE: undefined;
  WELCOME: undefined;
  NOTIF_PERMIT: undefined;
  START_PAGE: undefined;
};

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;
