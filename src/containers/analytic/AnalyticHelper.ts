import { SubsPackage, User } from 'types/models';
import FacebookSDKHelper from './FacebookSDKHelper';
import FirebaseAnalyticHelper from './FirebaseAnalytic';
import { AnalyticEventTypes } from './types';
import { Purchase } from 'react-native-iap';
import MixpanelHelper from './MixpanelHelper';

class AnalyticController {
  init() {
    FacebookSDKHelper.init();
    FirebaseAnalyticHelper.init();
    MixpanelHelper.init();
  }

  setUser(data: User, isPremium?: boolean) {
    FirebaseAnalyticHelper.setUser(data, isPremium);
    MixpanelHelper.setUser(data, isPremium);
  }

  trackScreen(screenName: string) {
    FirebaseAnalyticHelper.trackScreen(screenName);
    // MixpanelHelper.trackScreen(screenName);
  }

  logEvent(eventName: AnalyticEventTypes, data?: any) {
    console.log('Event Sent: ', { eventName, data });
    FirebaseAnalyticHelper.logEvent(eventName, data);
    MixpanelHelper.logEvent(eventName, data);
    FacebookSDKHelper.logEvent(eventName, data);
  }

  logPurchase(pkc: SubsPackage, purchase: Purchase | Purchase[]) {
    FirebaseAnalyticHelper.logPurchase(pkc, purchase);
    MixpanelHelper.logPurchase(pkc, purchase);
    FacebookSDKHelper.logPurchase(pkc, purchase);
  }
}

const AnalyticHelper = new AnalyticController();

export default AnalyticHelper;
