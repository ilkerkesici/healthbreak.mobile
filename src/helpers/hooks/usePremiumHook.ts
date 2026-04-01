/* eslint-disable react-hooks/exhaustive-deps */

import useAuthHook from './useAuthHook';

import { Platform } from 'react-native';
import { BasePackage, SubsPackage, User } from 'types/models';
import {
  getAndroidSubscriptions,
  getIOSSubscriptions,
} from 'helpers/utils/premium.utils';
import { useCallback, useEffect, useMemo } from 'react';
import { usePremiumStore } from 'store/usePremiumStore';
import { useRemoteConfigHook } from './useRemoteConfigHook';

export const BASE_PACKAGES_VARIANT_A: BasePackage[] = [
  {
    sku: 'com.healthbreak.1month.999',
    key: 'packages.1month',
    frequent: 'monthly',
    display: true,
  },
  {
    sku: 'com.healthbreak.1year.5999',
    key: 'packages.1year',
    frequent: 'yearly',
    display: true,
  },
];

export const BASE_PACKAGES_VARIANT_B: BasePackage[] = [
  {
    sku: 'com.healthbreak.1month.1299',
    key: 'packages.1month',
    frequent: 'monthly',
    display: true,
  },
  {
    sku: 'com.healthbreak.1year.6999',
    key: 'packages.1year',
    frequent: 'yearly',
    display: true,
  },
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
  const { packagesVariantBEnabled } = useRemoteConfigHook();

  const BASE_PACKAGES = [
    ...BASE_PACKAGES_VARIANT_A,
    ...BASE_PACKAGES_VARIANT_B,
  ];

  const changePremiumStatus = useCallback(
    (status: boolean, data?: any) => {
      setPremium(status, data || null);
    },
    [setPremium],
  );

  const getAppSubscriptions = useCallback(async () => {
    let subs: SubsPackage[] = [];
    if (Platform.OS === 'android') {
      subs = await getAndroidSubscriptions(
        BASE_PACKAGES.map(item => item.sku),
        BASE_PACKAGES,
      );
    } else {
      subs = await getIOSSubscriptions(
        BASE_PACKAGES.map(item => item.sku),
        BASE_PACKAGES,
      );
    }
    console.log('subs', subs);
    if (subs.length > 0) {
      setPremiumPackages(subs);
    }
  }, [setPremiumPackages, BASE_PACKAGES]);

  const getSubscription = useCallback(async (sku: string) => {
    let sub: SubsPackage | null = null;
    if (Platform.OS === 'android') {
      const androidSub = await getAndroidSubscriptions([sku], BASE_PACKAGES);
      if (androidSub[0]) {
        sub = androidSub[0];
      }
    } else if (Platform.OS === 'ios') {
      const iosSub = await getIOSSubscriptions([sku], BASE_PACKAGES);
      if (iosSub[0]) {
        sub = iosSub[0];
      }
    }

    return sub;
  }, []);

  const checkIsPremium = useCallback(
    async (propUser?: User, isPremiumFromStripeArg?: boolean) => {
      // if (isPremiumFromStripeArg) {
      //   changePremiumStatus(true, {} as any);
      //   return true;
      // }
      // if (propUser?.premium === 1) {
      //   changePremiumStatus(true, {} as any);
      //   return true;
      // }
      // if (propUser?.premium === 2) {
      //   // trial
      //   changePremiumStatus(false, {} as any);
      //   return false;
      // }
      // if (user?.premium === 1) {
      //   changePremiumStatus(true, {} as any);
      //   return true;
      // }
      // const subscription = await checkSubscriptionStatus();
      // console.log('🌴 : ', subscription);
      // if (subscription) {
      //   changePremiumStatus(true, subscription as any);
      // } else {
      //   changePremiumStatus(false);
      // }

      // return !!subscription;
      return false;
    },
    [changePremiumStatus],
  );

  useEffect(() => {
    if (user?.p) {
      changePremiumStatus(true, {} as any);
    }
  }, [user]);

  const sortedPremiumPackages = useMemo(() => {
    const shownPackages = packagesVariantBEnabled
      ? BASE_PACKAGES_VARIANT_B
      : BASE_PACKAGES_VARIANT_A;
    return shownPackages.map(item => {
      const sub = premiumPackages?.find(
        subItem => subItem.data.id === item.sku,
      );
      return sub;
    });
  }, [premiumPackages]);

  console.log('sortedPremiumPackages', sortedPremiumPackages);

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
