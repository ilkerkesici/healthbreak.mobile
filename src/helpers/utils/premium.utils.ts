import { i18n } from 'constants/i18n';
import {
  CommonApiHelper,
  RestorePremiumPurchasePayload,
} from 'helpers/api/CommonApiHelper';
import { Platform } from 'react-native';
import {
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  fetchProducts,
  ProductSubscription,
  Purchase,
  requestPurchase,
  clearTransactionIOS,
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
      const result: SubsPackage[] = subscriptions.reduce<SubsPackage[]>(
        (acc, sub) => {
          const foundBasePackage = packages.find(item => item.sku === sub.id);
          if (!foundBasePackage) {
            return acc;
          }

          acc.push({
            data: sub,
            title: i18n.t(foundBasePackage.key || ''),
            currency: sub.currency,
            priceFormatted: sub.displayPrice,
            price: sub.price || 0,
            basePackage: foundBasePackage,
          });

          return acc;
        },
        [],
      );
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
      const result: SubsPackage[] = subscriptions.reduce<SubsPackage[]>(
        (acc, sub) => {
          const foundBasePackage = packages.find(item => item.sku === sub.id);
          if (!foundBasePackage) {
            return acc;
          }

          acc.push({
            data: sub,
            title: i18n.t(foundBasePackage.key || ''),
            currency: sub.currency,
            priceFormatted: sub.displayPrice,
            price: sub.price || 0,
            basePackage: foundBasePackage,
          });

          return acc;
        },
        [],
      );

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

const getLatestRelevantPurchase = (
  purchases: Purchase[],
  productId?: string,
): Purchase | null => {
  const scopedPurchases = productId
    ? purchases.filter(purchase => purchase.productId === productId)
    : purchases;
  const relevantPurchases =
    scopedPurchases.length > 0 ? scopedPurchases : purchases;

  if (relevantPurchases.length === 0) {
    return null;
  }

  return [...relevantPurchases].sort(
    (a, b) => (b.transactionDate || 0) - (a.transactionDate || 0),
  )[0];
};

const mapPurchaseToRestorePayload = (
  purchase: Purchase,
): RestorePremiumPurchasePayload => ({
  platform: Platform.OS === 'ios' ? 'ios' : 'android',
  productId: purchase.productId,
  transactionId: purchase.transactionId ?? purchase.id ?? null,
  originalTransactionId:
    'originalTransactionIdentifierIOS' in purchase
      ? purchase.originalTransactionIdentifierIOS ?? null
      : null,
  purchaseToken: purchase.purchaseToken ?? null,
  currentPlanId: purchase.currentPlanId ?? null,
  transactionDate: purchase.transactionDate ?? null,
});

export const restoreSubscriptionFromPurchases = async (
  purchases: Purchase[],
  productId?: string,
): Promise<boolean> => {
  const purchase = getLatestRelevantPurchase(purchases, productId);
  if (!purchase) {
    return false;
  }
  console.log('Restore Purchase : ', purchase);
  return CommonApiHelper.restorePremiumPurchase(
    mapPurchaseToRestorePayload(purchase),
  );
};

export const restoreSubscription = async (
  productId?: string,
): Promise<boolean> => {
  try {
    const purchases = await getAvailablePurchases();
    if (!purchases.length) {
      return false;
    }

    await finishTransactions(purchases);
    return restoreSubscriptionFromPurchases(purchases, productId);
  } catch (err) {
    return false;
  }
};

const purchaseAndroidPackage = async (
  subPackage: SubsPackage,
  userId: string,
) => {
  const sku = subPackage.data.id;

  try {
    await requestPurchase({
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
    return purchases;
  } catch (err) {
    return null;
  }
};

const purchaseIOSPackage = async (subPackage: SubsPackage, userId: string) => {
  const sku = subPackage.data.id;
  await clearTransactionIOS();
  console.log('sku', sku);
  try {
    await requestPurchase({
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
): Promise<Purchase[] | null> => {
  try {
    if (Platform.OS === 'android') {
      const result = await purchaseAndroidPackage(pkg, uid);
      return result;
    }
    if (Platform.OS === 'ios') {
      const result = await purchaseIOSPackage(pkg, uid);
      return result;
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
