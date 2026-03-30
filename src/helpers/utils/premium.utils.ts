import { i18n } from 'constants/i18n';
import { Platform } from 'react-native';
import {
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  fetchProducts,
  ProductSubscription,
} from 'react-native-iap';

import { BasePackage, SubsPackage } from 'types/models';

export const initIAPConnection = async () => {
  try {
    await initConnection();
  } catch (err) {
    // Sentry.captureException(err);
    try {
      await initConnection();
    } catch (err) {
      // Sentry.captureException(err);
    }
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
