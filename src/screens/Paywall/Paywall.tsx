import React, { useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import usePremiumHook from 'helpers/hooks/usePremiumHook';
import PrivacyPolicyTexts from './components/PrivacyPolicyTexts';
import { requestPurchaseSubscription } from 'helpers/utils/premium.utils';
import useAuthHook from 'helpers/hooks/useAuthHook';
import { SubsPackage } from 'types/models';
import { Purchase } from 'react-native-iap';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import Packages from './components/Packages';

const Paywall = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthHook();
  const navigation = useNavigation<RootNavigation>();
  const insets = useSafeAreaInsets();
  const { i18n, language } = useTranslation();
  const { premiumPackages, changePremiumStatus } = usePremiumHook();
  const [selectedPackage, setSelectedPackage] = useState<SubsPackage | null>(
    null,
  );

  const activePackage = useMemo(
    () => selectedPackage ?? premiumPackages?.find(Boolean) ?? null,
    [premiumPackages, selectedPackage],
  );

  const onSuccessSubscription = async (
    pkc: SubsPackage,
    purchase: Purchase | Purchase[],
  ) => {
    // if (Platform.OS === 'ios' && purchase) {
    //   const thePurchase = Array.isArray(purchase) ? purchase[0] : purchase;
    //   const result = await validateIOSReceiptLocal(
    //     thePurchase.transactionReceipt,
    //   );
    //   if (result) {
    //     changePremiumStatus(true);
    //     // AnalyticHelper.logPurchase(pkc, purchase);
    //     navigation.goBack();
    //   }
    //   return;
    // }
    // if (
    //   (purchase && Array.isArray(purchase) && purchase[0].purchaseToken) ||
    //   (purchase && !Array.isArray(purchase) && purchase.purchaseToken)
    // ) {
    //   const token = Array.isArray(purchase)
    //     ? purchase?.[0]?.purchaseToken
    //     : purchase.purchaseToken;
    //   changePremiumStatus(true);
    //   navigation.goBack();
    // }
  };

  const onPressPay = async () => {
    if (!activePackage || !user?.uid) {
      return;
    }

    setLoading(true);
    const purchase = await requestPurchaseSubscription(activePackage, user?.uid);
    if (purchase) {
      await onSuccessSubscription(activePackage, purchase);
    }
    setLoading(false);
  };

  return (
    <Block fill flex={1} backgroundColour="bg-2">
      <Block
        paddingTop={(insets.top || 0) + 8}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        flexDirection="row"
        justifyContent="flex-end"
      >
        <Text size="sm" color="neutral.500" onPress={() => navigation.goBack()}>
          {language === 'tr' ? 'Atla' : 'Skip'}
        </Text>
      </Block>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Block paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}>
          <Text
            variant="title2"
            size="3xl"
            fontWeight="700"
            color="neutral.950"
          >
            {language === 'tr'
              ? 'Daha fazla\nsağlıklı mola'
              : 'More healthy breaks'}
          </Text>
          <Text marginTop={8} size="sm" color="neutral.500">
            {language === 'tr'
              ? 'Masa başında çalışırken enerjini koru ve bedenine hak ettiği özeni göster.'
              : 'Stay energetic while you work and give your body the care it deserves.'}
          </Text>

          <Block style={styles.infoCard} marginTop={14}>
            <Icon name="o:clock" size={18} color="primary.500" />
            <Text marginLeft={8} size="xs" color="neutral.700">
              {language === 'tr'
                ? 'Sınırlı profesyonelleri tarafından onaylanmış egzersiz programları.'
                : 'Expert approved guided break programs.'}
            </Text>
          </Block>

          <Block marginTop={16}>
            <Block flexDirection="row" alignItems="center" marginBottom={10}>
              <Icon name="o:lineup" size={16} color="primary.500" />
              <Text marginLeft={10} size="sm" color="neutral.700">
                {language === 'tr'
                  ? 'Sınırsız egzersiz'
                  : 'Unlimited exercise programs'}
              </Text>
            </Block>
            <Block flexDirection="row" alignItems="center" marginBottom={10}>
              <Icon name="o:clock" size={16} color="primary.500" />
              <Text marginLeft={10} size="sm" color="neutral.700">
                {language === 'tr'
                  ? 'Kişiselleştirilmiş hatırlatmalar'
                  : 'Personalized reminders'}
              </Text>
            </Block>
            <Block flexDirection="row" alignItems="center" marginBottom={10}>
              <Icon name="o:star" size={16} color="primary.500" />
              <Text marginLeft={10} size="sm" color="neutral.700">
                {language === 'tr'
                  ? 'Detaylı gelişim takibi'
                  : 'Detailed progress insights'}
              </Text>
            </Block>
          </Block>

          <Packages
            packages={premiumPackages}
            selectedPackage={activePackage}
            onSelect={setSelectedPackage}
          />
        </Block>
      </ScrollView>

      <Block
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingBottom={(insets.bottom || 0) + 10}
        paddingTop={8}
      >
        <Button
          fill
          size="lg"
          text={language === 'tr' ? "Premium'a geç" : 'Go Premium'}
          onPress={onPressPay}
          loading={loading}
          disabled={!activePackage || loading}
        />
        <Text fill center marginTop={8} size="xs" color="neutral.500">
          {language === 'tr'
            ? 'İstediğin zaman iptal edebilirsin.'
            : 'Cancel anytime.'}
        </Text>
        <Block marginTop={10}>
          <PrivacyPolicyTexts />
        </Block>
        {Platform.OS === 'ios' ? (
          <Text fill center size="xs" color="neutral.500" marginTop={8}>
            Restore
          </Text>
        ) : null}
      </Block>
    </Block>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8E6E2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#EAF4F1',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
