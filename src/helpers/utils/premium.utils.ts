import { i18n } from 'constants/i18n';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import { Platform } from 'react-native';
import {
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  fetchProducts,
  ProductSubscription,
  Purchase,
  requestPurchase,
} from 'react-native-iap';

import { BasePackage, SubsPackage } from 'types/models';

export const initIAPConnection = async () => {
  try {
    await initConnection();
  } catch (err) {
    try {
      await initConnection();
    } catch (err) {}
  }
};

export const getAndroidSubscriptions = async (
  skus: string[],
  packages: BasePackage[],
): Promise<SubsPackage[]> => {
  try {
    const subscriptions = (await fetchProducts({
      skus,
      type: 'subs',
    })) as ProductSubscription[];

    if (Platform.OS === 'android' && subscriptions) {
      const result: SubsPackage[] = subscriptions.map(sub => ({
        data: sub,
        title: packages.find(item => item.sku === sub.id)
          ? i18n.t(packages.find(item => item.sku === sub.id)?.key || '')
          : sub.displayName || '',
        currency: sub.currency,
        priceFormatted: sub.displayPrice,
        price: sub.price || 0,
        basePackage: packages.find(item => item.sku === sub.id),
      }));
      return result;
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const getIOSSubscriptions = async (
  skus: string[],
  packages: BasePackage[],
): Promise<SubsPackage[]> => {
  try {
    // await initConnection();
    const subscriptions = (await fetchProducts({
      skus,
      type: 'subs',
    })) as ProductSubscription[];

    if (Platform.OS === 'ios' && subscriptions) {
      const result: SubsPackage[] = subscriptions.map(sub => {
        const foundBasePackage = packages.find(item => item.sku === sub.id);
        return {
          data: sub,
          title: foundBasePackage
            ? i18n.t(foundBasePackage?.key || '')
            : sub.title || '',
          currency: sub.currency,
          priceFormatted: sub.displayPrice,
          price: sub.price || 0,
          basePackage: foundBasePackage,
        };
      });

      return result;
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const result = await CommonApiHelper.premiumCheck();
    console.log('checkSubscriptionStatus', result);
    return result;
  } catch (err) {
    return false;
  }
};

const finishTransactions = async (purchases: Purchase[]) => {
  for (const purchase of purchases) {
    try {
      await finishTransaction({
        purchase,
      });
    } catch (err) {
      console.log('err', err);
    }
  }
};

const purchaseAndroidPackage = async (
  subPackage: SubsPackage,
  userId: string,
) => {
  const sku = subPackage.data.id;

  try {
    const purchase = await requestPurchase({
      request: {
        android: {
          skus: [sku],
          obfuscatedAccountId: userId,
        },
      },
      type: 'subs',
    });

    await sleep(1000);
    const purchases = await getAvailablePurchases();
    await finishTransactions(purchases);
    const result = await checkSubscriptionStatus();
    return result ? purchases : null;
  } catch (err) {
    return null;
  }
};

const purchaseIOSPackage = async (subPackage: SubsPackage, userId: string) => {
  const sku = subPackage.data.id;
  console.log('sku', sku);
  try {
    const purchase = await requestPurchase({
      request: {
        ios: {
          sku,
          appAccountToken: userId,
          andDangerouslyFinishTransactionAutomatically: false,
        },
      },
      type: 'subs',
    });
    await sleep(1000);
    const purchases = await getAvailablePurchases();

    await finishTransactions(purchases);
    return purchases;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

export const requestPurchaseSubscription = async (
  pkg: SubsPackage,
  uid: string,
): Promise<Purchase | null> => {
  try {
    if (Platform.OS === 'android') {
      await purchaseAndroidPackage(pkg, uid);
    }
    if (Platform.OS === 'ios') {
      await purchaseIOSPackage(pkg, uid);
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const getActualPriceFromString = (price: string) => {
  if (!price) {
    return 0;
  }
  const float = parseFloat(price);
  if (isNaN(float)) {
    return 0;
  }
  if (Platform.OS === 'ios') {
    return float;
  }
  return float / 1000000;
};

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
};
