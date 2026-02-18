import { Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n } from 'constants/i18n';
import { OneSignal } from 'react-native-onesignal';

import { LanguageType } from 'types/setting';
import { ONESIGNAL_APP_ID } from 'constants/app';

class OneSignalController {
  async init() {
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.User.setLanguage(i18n.locale);
    OneSignal.User.pushSubscription.addEventListener('change', event => {
      console.log('Onesignal Event : ', event);
    });
    OneSignal.Notifications.addEventListener('click', data => {
      const url =
        (data.notification.additionalData as any)?.launch_url ||
        data.notification.launchURL;

      if (url) {
        Linking.canOpenURL(url).then(res => {
          if (res) {
            Linking.openURL(url);
          }
        });
      }
    });
    const isAskedBefore = await this.isNotificationPermissionAsked();
    if (!isAskedBefore) {
      OneSignal.Notifications.requestPermission(true);
      await AsyncStorage.setItem('@notification_asked', 'true');
    }
  }

  addNotificationForegroundHandler() {
    OneSignal.Notifications.removeEventListener(
      'foregroundWillDisplay',
      () => null,
    );
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', () => {});
  }

  private async isNotificationPermissionAsked() {
    try {
      const result = await AsyncStorage.getItem('@notification_asked');
      return !!result;
    } catch (_) {
      return false;
    }
  }

  updateLanguage(lang: LanguageType) {
    OneSignal.User.setLanguage(lang);
  }

  async login(userId?: string) {
    if (!userId) {
      return;
    }
    const externalId = await OneSignal.User.getExternalId();
    if (userId === externalId) {
      return;
    }
    if (externalId) {
      OneSignal.logout();
    }
    setTimeout(() => {
      OneSignal.login(userId);
    }, 1000);
  }

  logout() {
    OneSignal.logout();
  }
}

const OneSignalHelper = new OneSignalController();
export default OneSignalHelper;
