/* eslint-disable react-hooks/exhaustive-deps */

import useAuthHook from './useAuthHook';

import { Platform } from 'react-native';
import { SubsPackage, User } from 'types/models';
import {
  checkSubscriptionStatus,
  getAndroidSubscriptions,
  getIOSSubscriptions,
} from 'helpers/utils/premium.utils';
import { ProductPurchase } from 'react-native-iap';
import { useCallback, useEffect, useMemo } from 'react';
import { usePremiumStore } from 'store/usePremiumStore';

export const BASE_PACKAGES = [
  { sku: 'com.better.ai.weekly.1', key: 'packages.1week' },
  { sku: 'com.better.ai.weekly.2', key: 'packages.1week' },
];

export default function usePremiumHook() {
  const {
    isPremium,
    premiumData,
    premiumPackages,
    setPremium,
    setPremiumPackages,
  } = usePremiumStore();
  const { user } = useAuthHook();

  const changePremiumStatus = useCallback(
    (status: boolean, data?: ProductPurchase) => {
      setPremium(status, data || null);
    },
    [setPremium],
  );

  const getAppSubscriptions = useCallback(async () => {
    let subs: SubsPackage[] = [];
    if (Platform.OS === 'android') {
      subs = await getAndroidSubscriptions(BASE_PACKAGES.map(item => item.sku));
    } else {
      subs = await getIOSSubscriptions(BASE_PACKAGES.map(item => item.sku));
    }

    if (subs.length > 0) {
      setPremiumPackages(subs);
    }
  }, [setPremiumPackages]);

  const getSubscription = useCallback(async (sku: string) => {
    let sub: SubsPackage | null = null;
    if (Platform.OS === 'android') {
      const androidSub = await getAndroidSubscriptions([sku]);
      if (androidSub[0]) {
        sub = androidSub[0];
      }
    } else if (Platform.OS === 'ios') {
      const iosSub = await getIOSSubscriptions([sku]);
      if (iosSub[0]) {
        sub = iosSub[0];
      }
    }

    return sub;
  }, []);

  const checkIsPremium = useCallback(
    async (propUser?: User, isPremiumFromStripeArg?: boolean) => {
      if (isPremiumFromStripeArg) {
        changePremiumStatus(true, {} as any);
        return true;
      }
      if (propUser?.premium === 1) {
        changePremiumStatus(true, {} as any);
        return true;
      }
      if (propUser?.premium === 2) { // trial
        changePremiumStatus(false, {} as any);
        return false;
      }
      if (user?.premium === 1) {
        changePremiumStatus(true, {} as any);
        return true;
      }
      const subscription = await checkSubscriptionStatus();
      console.log('🌴 : ', subscription);
      if (subscription) {
        changePremiumStatus(true, subscription as any);
      } else {
        changePremiumStatus(false);
      }

      return !!subscription;
    },
    [changePremiumStatus],
  );

  useEffect(() => {
    if (user?.p) {
      changePremiumStatus(true, {} as any);
    }
  }, [user]);

  const sortedPremiumPackages = useMemo(() => {
    return BASE_PACKAGES.map(item => {
      const sub = premiumPackages?.find(
        subItem => subItem.data.productId === item.sku,
      );
      return sub;
    });
  }, [premiumPackages]);

  return {
    isPremium: isPremium,
    premiumData,
    premiumPackages: sortedPremiumPackages,
    checkIsPremium,
    changePremiumStatus,
    getSubscription,
    getAppSubscriptions,
  };
}
