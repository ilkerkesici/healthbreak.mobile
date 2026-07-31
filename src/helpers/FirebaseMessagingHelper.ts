import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  getInitialNotification,
  registerDeviceForRemoteMessages,
  isDeviceRegisteredForRemoteMessages,
  type RemoteMessage,
} from '@react-native-firebase/messaging';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import { i18n } from 'constants/i18n';
import { LanguageType } from 'types/setting';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';
import { CommonApiHelper } from './api/CommonApiHelper';

const NOTIFICATION_ASKED_KEY = '@notification_asked';
const FCM_TOKEN_KEY = '@fcm_token';
const FCM_EXTERNAL_ID_KEY = '@fcm_external_id';

type NotificationData = Record<string, string | undefined>;

class FirebaseMessagingController {
  notificationClickedWithoutUrl = false;
  private messaging = getMessaging();
  private currentToken: string | null = null;
  private externalId: string | null = null;
  private unsubscribeTokenRefresh: (() => void) | null = null;
  private unsubscribeForeground: (() => void) | null = null;
  private unsubscribeOpened: (() => void) | null = null;
  private initialized = false;

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    this.externalId = await AsyncStorage.getItem(FCM_EXTERNAL_ID_KEY);

    await this.requestPermissionIfNeeded();
    this.addNotificationOpenedHandlers();
    this.addNotificationForegroundHandler();
    this.listenTokenRefresh();

    await this.syncToken();
  }

  private async requestPermissionIfNeeded() {
    const isAskedBefore = await this.isNotificationPermissionAsked();
    if (!isAskedBefore) {
      await requestNotifications(['alert', 'badge', 'sound']);
      await AsyncStorage.setItem(NOTIFICATION_ASKED_KEY, 'true');
    }

    await this.ensureDeviceRegisteredForRemoteMessages();
  }

  private async ensureDeviceRegisteredForRemoteMessages() {
    if (Platform.OS !== 'ios') {
      return;
    }

    // Auto-registration varsayılan olarak açık; zaten kayıtlıysa tekrar deneme.
    if (isDeviceRegisteredForRemoteMessages(this.messaging)) {
      return;
    }

    try {
      await registerDeviceForRemoteMessages(this.messaging);
    } catch (error: any) {
      // ARM64 Simulator'da APNs kaydı ~10s sonra timeout olur; FCM token yine de
      // gelebilir. Physical device'ta gerçek push için simulator kullanma.
      const code = error?.code as string | undefined;
      if (
        code === 'messaging/registration-timeout' ||
        code === 'messaging/registration-superseded'
      ) {
        return;
      }
      console.log('FCM registerDeviceForRemoteMessages error', error);
    }
  }

  private async hasNotificationPermission() {
    const { status } = await checkNotifications();
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  }

  private async isNotificationPermissionAsked() {
    try {
      const result = await AsyncStorage.getItem(NOTIFICATION_ASKED_KEY);
      return !!result;
    } catch (_) {
      return false;
    }
  }

  private getPlatform(): 'ios' | 'android' {
    return Platform.OS === 'ios' ? 'ios' : 'android';
  }

  private getNotificationData(
    remoteMessage: RemoteMessage | null,
  ): NotificationData {
    return (remoteMessage?.data || {}) as NotificationData;
  }

  private handleNotificationOpen(remoteMessage: RemoteMessage | null) {
    if (!remoteMessage) {
      return;
    }

    const data = this.getNotificationData(remoteMessage);
    console.log('data', data);
    console.log('remoteMessage', remoteMessage);
    const url = data.launch_url || data.url || data.link;

    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    } else {
      this.notificationClickedWithoutUrl = true;
    }

    if (data.channel_id) {
      CommonApiHelper.readNotification(data.channel_id);
    }

    AnalyticHelper.logEvent('notification_clicked', {
      url: url || '',
      title: remoteMessage.notification?.title || '',
      body: remoteMessage.notification?.body || '',
      ...data,
    });
  }

  private addNotificationOpenedHandlers() {
    this.unsubscribeOpened?.();

    this.unsubscribeOpened = onNotificationOpenedApp(
      this.messaging,
      message => {
        this.handleNotificationOpen(message);
      },
    );

    getInitialNotification(this.messaging).then(message => {
      this.handleNotificationOpen(message);
    });
  }

  addNotificationForegroundHandler() {
    this.unsubscribeForeground?.();
    this.unsubscribeForeground = onMessage(this.messaging, async () => {
      // Foreground mesaj geldiğinde sistem bildirimi göstermez.
      // Gerekirse burada local notification gösterilebilir.
    });
  }

  private listenTokenRefresh() {
    this.unsubscribeTokenRefresh?.();
    this.unsubscribeTokenRefresh = onTokenRefresh(
      this.messaging,
      async token => {
        this.currentToken = token;
        await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
        await this.registerTokenOnBackend(token);
      },
    );
  }

  async getToken() {
    try {
      const enabled = await this.hasNotificationPermission();
      if (!enabled && Platform.OS === 'ios') {
        return null;
      }

      await this.ensureDeviceRegisteredForRemoteMessages();

      const token = await getToken(this.messaging);
      console.log('FCM token', token);
      this.currentToken = token;
      await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
      return token;
    } catch (error) {
      console.log('FCM getToken error', error);
      return null;
    }
  }

  /**
   * Token'ı alır ve backend'e kaydeder.
   */
  async syncToken() {
    const token = await this.getToken();
    if (!token) {
      return;
    }
    await this.registerTokenOnBackend(token);
  }

  private async registerTokenOnBackend(token: string) {
    if (!this.externalId) {
      return;
    }

    await CommonApiHelper.registerFcmToken({
      token,
      platform: this.getPlatform(),
      language: i18n.locale,
      external_id: this.externalId,
    });
  }

  /**
   * Bildirim izni ister ve token'ı senkronize eder.
   */
  async askPermission() {
    await requestNotifications(['alert', 'badge', 'sound']);
    await AsyncStorage.setItem(NOTIFICATION_ASKED_KEY, 'true');
    await this.ensureDeviceRegisteredForRemoteMessages();
    await this.syncToken();
  }

  /**
   * Dil değişince token kaydını günceller.
   */
  async updateLanguage(lang: LanguageType) {
    await CommonApiHelper.updateFcmTokenLanguage(lang);
  }

  /**
   * Kullanıcıyı FCM token ile eşler.
   * Backend'e external_id ile token gönderilir.
   */
  async login(userId?: string) {
    if (!userId) {
      return;
    }

    if (userId === this.externalId) {
      await this.syncToken();
      return;
    }

    this.externalId = userId;
    await AsyncStorage.setItem(FCM_EXTERNAL_ID_KEY, userId);
    await this.syncToken();
  }

  /**
   * Kullanıcı eşlemesini kaldırır.
   * Token backend'den silinir ve local external_id temizlenir.
   */
  async logout() {
    const token =
      this.currentToken || (await AsyncStorage.getItem(FCM_TOKEN_KEY));

    if (token && this.externalId) {
      await CommonApiHelper.unregisterFcmToken({
        token,
        external_id: this.externalId,
      });
    }

    this.externalId = null;
    await AsyncStorage.removeItem(FCM_EXTERNAL_ID_KEY);

    try {
      await deleteToken(this.messaging);
      this.currentToken = null;
      await AsyncStorage.removeItem(FCM_TOKEN_KEY);
    } catch (error) {
      console.log('FCM deleteToken error', error);
    }
  }

  getCurrentToken() {
    return this.currentToken;
  }

  getExternalId() {
    return this.externalId;
  }
}

const FirebaseMessagingHelper = new FirebaseMessagingController();
export default FirebaseMessagingHelper;
