//import Mixpanel class from the SDK
import { Mixpanel } from 'mixpanel-react-native';
import { Purchase } from 'react-native-iap';
import { SubsPackage, User } from 'types/models';
import { AnalyticEventTypes } from './types';

const trackAutomaticEvents = true; // disable legacy autotrack mobile events

// with the configuration options above
const mixpanel = new Mixpanel(
  'dc7c12389edef770ba56e0869f21e39a',
  trackAutomaticEvents,
);

class MixpanelController {
  init() {
    // mixpanel.setServerURL('https://api-eu.mixpanel.com');
    mixpanel.init(undefined, undefined, 'https://api-eu.mixpanel.com', undefined);
  }

  setUser(data: User, isPremium?: boolean) {
    if (data.uid) {
      //   analytics().setUserId(data.random_id);
      mixpanel.identify(data.uid);
    }
    mixpanel.getPeople().set({
      $first_name: data.name,
      $email: data.email,
      $isPremium: isPremium,
    });
  }

  async trackScreen(_screenName: string) {}

  async logEvent(eventName: AnalyticEventTypes, data: any) {
    mixpanel.track(eventName, data);
  }

  async logPurchase(pkc: SubsPackage, purchaseData: Purchase | Purchase[]) {
    const purchase = Array.isArray(purchaseData)
      ? purchaseData[0]
      : purchaseData;
    mixpanel.track('purchase_completed_success', {
      package: pkc.data?.id,
      price: pkc.price,
      currency: pkc.currency,
      transaction_id: purchase?.transactionId,
    });
    mixpanel.getPeople().set({ isPremium: true });
  }

  addPeopleParameters(parameters: Record<string, string>) {
    mixpanel.getPeople().set(parameters);
  }
}

const MixpanelHelper = new MixpanelController();

export default MixpanelHelper;
