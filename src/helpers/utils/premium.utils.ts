import { i18n } from 'constants/i18n';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import { BASE_PACKAGES } from 'helpers/hooks/usePremiumHook';

import { Platform } from 'react-native';
import {
  finishTransaction,
  getAvailablePurchases,
  getSubscriptions,
  requestSubscription,
  SubscriptionAndroid,
  SubscriptionIOS,
} from 'react-native-iap';

import { SubsPackage } from 'types/models';

export const getAndroidSubscriptions = async (
  skus: string[],
): Promise<SubsPackage[]> => {
  try {
    const subscriptions: SubscriptionAndroid[] = (await getSubscriptions({
      skus,
    })) as SubscriptionAndroid[];
    if (Platform.OS === 'android') {
      const result: SubsPackage[] = subscriptions.map(sub => ({
        data: sub,
        title: BASE_PACKAGES.find(item => item.sku === sub.productId)
          ? i18n.t(
              BASE_PACKAGES.find(item => item.sku === sub.productId)?.key || '',
            )
          : sub.title,
        currency:
          sub.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0]
            .priceCurrencyCode,
        priceFormatted:
          sub.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0]
            .formattedPrice,
        price:
          sub.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0]
            .priceAmountMicros,
      }));

      return result;
    }
    return [];
  } catch (err) {
    return [];
    // console.warn(err.code, err.message);
  }
};

export const getIOSSubscriptions = async (
  skus: string[],
): Promise<SubsPackage[]> => {
  try {
    const subscriptions: SubscriptionIOS[] = (await getSubscriptions({
      skus,
    })) as SubscriptionIOS[];
    if (Platform.OS === 'ios') {
      const result: SubsPackage[] = subscriptions.map(sub => ({
        data: sub,
        title: BASE_PACKAGES.find(item => item.sku === sub.productId)
          ? i18n.t(
              BASE_PACKAGES.find(item => item.sku === sub.productId)?.key || '',
              { price: sub.price, currency: sub.currency },
            )
          : sub.title,
        currency: sub.currency,
        priceFormatted: sub.localizedPrice,
        price: sub.price,
      }));

      return result;
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const validateIOSReceiptLocal = async (receipt?: string) => {
  try {
    if (!receipt) {
      return null;
    }
    const result = await CommonApiHelper.verifyIOSReceipt(receipt);
    if (result?.pkc) {
      return result;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const validateAndroidReceiptLocal = async (
  purchaseToken: string,
  productId: string,
) => {
  try {
    if (!purchaseToken) {
      return null;
    }
    const result = await CommonApiHelper.sendAndroidPayment(
      purchaseToken,
      productId,
    );
    if (result?.pkc) {
      return result;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const checkSubscriptionStatus = async () => {
  try {
    const purchases = await getAvailablePurchases();

    if (purchases.length > 0 && Platform.OS === 'android') {
      const purchase = purchases[0];
      if (purchase) {
        try {
          if (!purchase.isAcknowledgedAndroid) {
            await finishTransaction({ purchase });
          }
        } catch (e) {}
      }
      if (
        purchase.purchaseToken &&
        purchase.productId &&
        purchase.packageNameAndroid
      ) {
        validateAndroidReceiptLocal(purchase.purchaseToken, purchase.productId);
      }

      return purchases[0];
    }
    if (purchases.length > 0 && Platform.OS === 'ios') {
      const latestTransactionDate = Math.max(
        ...purchases.map(item => item.transactionDate),
      );
      const lastPurchase = purchases.find(
        item => item.transactionDate === latestTransactionDate,
      );

      const receipt = lastPurchase?.transactionReceipt;
      const result = await validateIOSReceiptLocal(receipt);
      if (result) {
        return result.pkc;
      }
      return null;
    }
    return null;
  } catch (err) {
    console.warn('Error fetching purchases', err);
    return null;
  }
};

const purchaseAndroidPackage = async (
  subPackage: SubscriptionAndroid,
  userId: string,
) => {
  const sku = subPackage.productId;
  const offer = subPackage.subscriptionOfferDetails[0];
  try {
    const purchase = await requestSubscription({
      sku,
      subscriptionOffers: [{ sku, offerToken: offer.offerToken }],
      obfuscatedAccountIdAndroid: userId,
    });
    setTimeout(() => {
      checkSubscriptionStatus();
    }, 1000);
    return purchase;
  } catch (err) {
    return null;
  }
};

const purchaseIOSPackage = async (
  subPackage: SubscriptionIOS,
  userId: string,
) => {
  const sku = subPackage.productId;

  try {
    const purchase = await requestSubscription({
      sku,
      andDangerouslyFinishTransactionAutomaticallyIOS: false,
      appAccountToken: userId,
    });
    if (purchase) {
      await finishTransaction({
        purchase: Array.isArray(purchase) ? purchase[0] : purchase,
      });
    }
    return purchase;
  } catch (err) {
    return null;
  }
};

export const requestPurchase = async (
  subPackage: SubsPackage,
  userId: string,
) => {
  if (Platform.OS === 'android') {
    return await purchaseAndroidPackage(
      subPackage.data as SubscriptionAndroid,
      userId,
    );
  } else if (Platform.OS === 'ios') {
    return await purchaseIOSPackage(subPackage.data as SubscriptionIOS, userId);
  }
  return null;
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
