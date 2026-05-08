import { Settings, AppEventsLogger } from 'react-native-fbsdk-next';
import { Purchase } from 'react-native-iap';
import { SubsPackage } from 'types/models';

class FacebookSDKController {
  init() {
    Settings.setAppID('944575138477868');
    Settings.initializeSDK();
  }

  logEvent(eventName: string, data: any) {
    AppEventsLogger.logEvent(eventName, data);
  }

  logPurchase(pkc: SubsPackage) {
    AppEventsLogger.logPurchase(pkc.price || 0, pkc.currency, {});
  }
}

const FacebookSDKHelper = new FacebookSDKController();

export default FacebookSDKHelper;
