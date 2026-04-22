import React, { useMemo, useState } from 'react';
import { Animated, Dimensions, Platform, StyleSheet } from 'react-native';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import images from 'assets/images';
import useTranslation from 'helpers/hooks/useTranslation';
import usePremiumHook from 'helpers/hooks/usePremiumHook';
import PrivacyPolicyTexts from './components/PrivacyPolicyTexts';
import { requestPurchaseSubscription } from 'helpers/utils/premium.utils';
import useAuthHook from 'helpers/hooks/useAuthHook';
import { SubsPackage } from 'types/models';
import { Purchase } from 'react-native-iap';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import Packages from './components/Packages';
import Benefits from './components/Benefits';
import InfoHighlightCard from './components/InfoHighlightCard';
import PaywallHeroBackground from './components/PaywallHeroBackground';

const Paywall = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthHook();
  const navigation = useNavigation<RootNavigation>();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { premiumPackages, changePremiumStatus } = usePremiumHook();
  const [scrollY] = useState(() => new Animated.Value(0));
  const [selectedPackage, setSelectedPackage] = useState<SubsPackage | null>(
    null,
  );

  const activePackage = useMemo(
    () => selectedPackage ?? premiumPackages?.find(Boolean) ?? null,
    [premiumPackages, selectedPackage],
  );
  const heroHeight = useMemo(
    () => Dimensions.get('window').width * (3 / 4),
    [],
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
    const purchase = await requestPurchaseSubscription(
      activePackage,
      user?.uid,
    );
    if (purchase) {
      await onSuccessSubscription(activePackage, purchase);
    }
    setLoading(false);
  };

  return (
    <Block fill flex={1} backgroundColour="bg-2">
      <Block
        style={styles.closeButtonContainer}
        paddingTop={(insets.top || 0) + 8}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Block
          width={34}
          height={34}
          borderRadius={17}
          alignItems="center"
          justifyContent="center"
          backgroundColour="neutral.200"
          borderWidth={1}
          borderColor="neutral.400/30"
        >
          <Icon
            name="o:x-mark"
            size={18}
            color="neutral.700"
            onPress={() => navigation.goBack()}
          />
        </Block>
      </Block>

      <Block style={styles.heroContainer}>
        <PaywallHeroBackground scrollY={scrollY} imageSource={images.paywall} />
      </Block>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: heroHeight },
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <Text
          variant="title2"
          size="3xl"
          fontWeight="700"
          color="neutral.950"
          fill
          left
          paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
          marginTop={-40}
        >
          {i18n.t('paywall.new.headline')}
        </Text>

        <Block paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING} fill>
          <Text marginTop={12} size="sm" color="neutral.500" marginBottom={12}>
            {i18n.t('paywall.new.subtitle')}
          </Text>

          <InfoHighlightCard />
          <Block marginTop={24} />

          <Packages
            packages={premiumPackages}
            selectedPackage={activePackage}
            onSelect={setSelectedPackage}
          />
          <Benefits />
        </Block>
        <Text fill center marginTop={8} size="xs" color="neutral.500">
          {i18n.t('paywall.new.cancel_anytime')}
        </Text>
        <Block marginTop={10}>
          <PrivacyPolicyTexts />
        </Block>
        {Platform.OS === 'ios' ? (
          <Text fill center size="xs" color="neutral.500" marginTop={8}>
            {i18n.t('paywall.new.restore')}
          </Text>
        ) : null}
      </Animated.ScrollView>

      <Block
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingBottom={(insets.bottom || 0) + 10}
        paddingTop={8}
        fill
      >
        <Button
          fill
          size="lg"
          text={i18n.t('paywall.new.cta')}
          onPress={onPressPay}
          loading={loading}
          disabled={!activePackage || loading}
        />
      </Block>
    </Block>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'red',
  },
  scrollContent: {
    paddingBottom: 8,
  },
});
