import {ProductPurchase} from 'react-native-iap';
import {SubsPackage} from 'types/models';
import {create} from 'zustand';

interface PremiumStore {
  isPremium: boolean;
  premiumData: ProductPurchase | null;
  setPremium: (isPremium: boolean, premiumData: ProductPurchase | null) => void;

  premiumPackages: SubsPackage[];
  setPremiumPackages: (premiumPackages: SubsPackage[]) => void;
}

export const usePremiumStore = create<PremiumStore>(set => ({
  isPremium: false,
  premiumData: null,
  setPremium: (isPremium: boolean, premiumData: ProductPurchase | null) =>
    set({isPremium, premiumData}),

  premiumPackages: [],
  setPremiumPackages: (premiumPackages: SubsPackage[]) =>
    set({premiumPackages}),
}));
