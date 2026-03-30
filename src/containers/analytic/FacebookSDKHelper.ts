import { Settings, AppEventsLogger } from 'react-native-fbsdk-next';
import { Purchase } from 'react-native-iap';
import { SubsPackage } from 'types/models';

class FacebookSDKController {
  init() {
    Settings.setAppID('1974584670095202');
    Settings.initializeSDK();
  }

  logEvent(eventName: string, data: any) {
    AppEventsLogger.logEvent(eventName, data);
  }

  logPurchase(pkc: SubsPackage, purchase: Purchase | Purchase[]) {
    const purchaseData = Array.isArray(purchase) ? purchase[0] : purchase;
    AppEventsLogger.logPurchase(pkc.data?.price || 0, pkc.currency, {
      transaction_id: purchaseData?.transactionId || '',
    });
  }
}

const FacebookSDKHelper = new FacebookSDKController();

export default FacebookSDKHelper;
