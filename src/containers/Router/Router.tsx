import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { RootStackParamList } from './Router.type';
import Splash from 'screens/Splash/Splash';
import Onboarding from 'screens/Onboarding/Onboarding';
import Browser from 'screens/Browser/Browser';
import Paywall from 'screens/Paywall/Paywall';
import LanguageChange from 'screens/LanguageChange/LanguageChange';
import PromoCodeScreen from 'screens/PromoCodeScreen/PromoCodeScreen';
import Home from 'screens/Home/Home';
import Welcome from 'screens/Welcome/Welcome';
import StartPage from 'screens/StartPage/StartPage';
import NotificationPermission from 'screens/NotificationPermission/NotificationPermission';

const MainNavigator = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'white',
  },
  animationTypeForReplace: 'push',
};

export default function Router() {
  const routeNameRef = React.useRef(null);
  const navigationRef = React.useRef<any>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          // AnalyticHelper.trackScreen(currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <MainNavigator.Navigator initialRouteName="SPLASH">
        <MainNavigator.Screen
          options={screenOptions}
          name="SPLASH"
          component={Splash}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="HOME"
          component={Home}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="ONBOARDING"
          component={Onboarding}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="WELCOME"
          component={Welcome}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="START_PAGE"
          component={StartPage}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="NOTIF_PERMIT"
          component={NotificationPermission}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="BROWSER"
          component={Browser}
        />
        <MainNavigator.Screen
          options={{ ...screenOptions, presentation: 'fullScreenModal' }}
          name="PAYWALL"
          component={Paywall}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="LANGUAGE_CHANGE"
          component={LanguageChange}
        />
        <MainNavigator.Screen
          options={screenOptions}
          name="PROMO_CODE"
          component={PromoCodeScreen}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}
