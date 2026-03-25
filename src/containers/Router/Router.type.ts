import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NextExerciseResponse } from 'types/models';

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
  FEEDBACK:
    | undefined
    | {
        exercise?: NextExerciseResponse;
        exercise_id?: number;
      };
  EXERCISE: { exercise: NextExerciseResponse };
  CONTACT: undefined;
  WELCOME: undefined;
  NOTIF_PERMIT: undefined;
  START_PAGE: undefined;
  LOGIN: undefined;
  REGISTER: undefined;
  FORGOT_PASSWORD: undefined;
};

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;
