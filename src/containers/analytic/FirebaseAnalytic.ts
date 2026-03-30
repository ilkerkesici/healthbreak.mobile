// ⬇️ ESKİ:
// import analytics from '@react-native-firebase/analytics';

// ⬇️ YENİ (modular API)
import {
  getAnalytics,
  logEvent as logAnalyticsEvent,
  logScreenView as logAnalyticsScreenView,
  logPurchase as logAnalyticsPurchase,
  setAnalyticsCollectionEnabled,
  setUserId as analyticsSetUserId,
  setUserProperties as analyticsSetUserProperties,
} from '@react-native-firebase/analytics';

import { SubsPackage, User } from 'types/models';
import { AnalyticEventTypes } from './types';

import { Purchase } from 'react-native-iap';
import { getActualPriceFromString } from 'helpers/utils/premium.utils';

const debugMode = false;

class FirebaseAnalyticController {
  // Tek bir analytics instance'ı tutalım
  private analytics = getAnalytics();

  init() {
    // analytics().setAnalyticsCollectionEnabled(true);
    setAnalyticsCollectionEnabled(this.analytics, true);
  }

  setUser(data: User, isPremium?: boolean) {
    if (data.uid) {
      // analytics().setUserId(data.random_id);
      analyticsSetUserId(this.analytics, data.uid);
    }

    // analytics().setUserProperties({...});
    analyticsSetUserProperties(this.analytics, {
      fb_uuid: data.fb_uuid || null,
      fullname: data.name || null,
      email: data.email || null,
      isLoggedIn: data.email ? 'true' : 'false',
      isPremium:
        isPremium === true ? 'true' : isPremium === false ? 'false' : null,
      id: data.id ? data.id.toString() : null,
    });
  }

  async trackScreen(screenName: string) {
    // await analytics().logScreenView({...});
    await logAnalyticsScreenView(this.analytics, {
      screen_name: screenName,
      screen_class: screenName,
    });
  }

  async logEvent(eventName: AnalyticEventTypes, data: any) {
    // await analytics().logEvent(eventName, data);
    await logAnalyticsEvent(this.analytics, eventName, data);
  }

  async logPurchase(pkc: SubsPackage, purchaseData: Purchase | Purchase[]) {
    const purchase = Array.isArray(purchaseData)
      ? purchaseData[0]
      : purchaseData;

    const sendData = {
      transaction_id: purchase.transactionId,
      value: getActualPriceFromString(pkc.price), // total amount
      currency: pkc.currency,
      items: [
        {
          item_id: pkc.data?.id || '',
          item_name: pkc.title,
          price: getActualPriceFromString(pkc.price),
        },
      ],
    };

    if (debugMode) {
      console.log(sendData);
      return;
    }

    // await analytics().logPurchase(sendData);
    await logAnalyticsPurchase(this.analytics, sendData as any);
  }
}

const FirebaseAnalyticHelper = new FirebaseAnalyticController();

export default FirebaseAnalyticHelper;
