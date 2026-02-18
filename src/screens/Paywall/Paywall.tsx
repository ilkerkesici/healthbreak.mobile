import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, Platform, ScrollView, StyleSheet } from 'react-native';
import { useThemeColor } from 'helpers/hooks/useThemeColor';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import Image from 'components/CoreComponents/Image/Image';
import images from 'assets/images';
import FeatureListItem from './components/FeatureListItem';
import usePremiumHook from 'helpers/hooks/usePremiumHook';
import PrivacyPolicyTexts from './components/PrivacyPolicyTexts';
import Display from 'components/CoreComponents/Display';
import {
  requestPurchase,
  validateIOSReceiptLocal,
} from 'helpers/utils/premium.utils';
import useAuthHook from 'helpers/hooks/useAuthHook';
import { SubsPackage } from 'types/models';
import { SubscriptionPurchase } from 'react-native-iap';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';

const { width } = Dimensions.get('window');

const LEAF_RATIO = 2868 / 1080;

const Paywall = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthHook();
  const [backgroundColor] = useThemeColor(['custom-wb', 'primary.500']);
  const navigation = useNavigation<RootNavigation>();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { premiumPackages, changePremiumStatus } = usePremiumHook();

  const onSuccessSubscription = async (
    pkc: SubsPackage,
    purchase: SubscriptionPurchase | SubscriptionPurchase[],
  ) => {
    if (Platform.OS === 'ios' && purchase) {
      const thePurchase = Array.isArray(purchase) ? purchase[0] : purchase;
      const result = await validateIOSReceiptLocal(
        thePurchase.transactionReceipt,
      );

      if (result) {
        changePremiumStatus(true);
        // AnalyticHelper.logPurchase(pkc, purchase);
        navigation.goBack();
      }
      return;
    }
    if (
      (purchase && Array.isArray(purchase) && purchase[0].purchaseToken) ||
      (purchase && !Array.isArray(purchase) && purchase.purchaseToken)
    ) {
      const token = Array.isArray(purchase)
        ? purchase?.[0]?.purchaseToken
        : purchase.purchaseToken;
      changePremiumStatus(true);

      // AnalyticHelper.logPurchase(pkc, purchase);
      if (token) {
        CommonApiHelper.sendAndroidPayment(
          token ?? '',
          pkc?.data?.productId ?? '',
        );
      }
      navigation.goBack();
    }
  };

  const onPressPay = async () => {
    if (!premiumPackages?.[0] || !user?.uid) {
      return;
    }

    setLoading(true);
    const purchase = await requestPurchase(premiumPackages?.[0], user?.uid);
    if (purchase) {
      await onSuccessSubscription(premiumPackages?.[0], purchase);
    }
    setLoading(false);
  };

  return (
    <Block fill flex={1} backgroundColour="black">
      <LinearGradient
        colors={['transparent', backgroundColor, backgroundColor]}
        style={styles.gradient}
      />
      <Block style={styles.imageWrapper}>
        <Image source={images.paywall} width={width} height={width} />
      </Block>
      <Block style={[styles.absolute, { paddingTop: insets.top || 20 }]}>
        <Block
          fill
          flex={1}
          justifyContent="flex-start"
          paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        >
          <Block fill alignItems="flex-start">
            <Icon
              name="o:x-mark"
              size={24}
              onPress={() => navigation.goBack()}
            />
          </Block>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Text
              variant="largeTitle"
              fontWeight="600"
              fill
              center
              marginTop={200}
            >
              {i18n.t('paywall.get_your_ratings')}
            </Text>

            <Block height={30} />
            <FeatureListItem text={i18n.t('paywall.advantages.face_scan')} />
            <Block height={10} />
            <FeatureListItem text={i18n.t('paywall.advantages.skin_tips')} />
            <Block height={10} />
            <FeatureListItem
              text={i18n.t('paywall.advantages.daily_reminders')}
            />
            <Block height={10} />
            <FeatureListItem text={i18n.t('paywall.advantages.you')} />

            <Block fill marginTop={40}>
              <Block width={width - 60} height={(width - 60) / LEAF_RATIO}>
                <Image
                  source={images.leaf}
                  width={width - 60}
                  height={(width - 60) / LEAF_RATIO}
                />
                <Block style={styles.absoluteLeaf}>
                  <Text size="lg" fontWeight="600">
                    {i18n.t('paywall.popular_app')}
                  </Text>
                </Block>
              </Block>
            </Block>

            <Text size="xs" fontWeight="400" marginVertical={30}>
              {premiumPackages?.[0]?.title}
            </Text>
            <PrivacyPolicyTexts />

            <Display show={Platform.OS === 'ios'}>
              <Text fill center size="xs" fontWeight="400" marginVertical={30}>
                Restore
              </Text>
            </Display>
          </ScrollView>
          <Block
            fill
            paddingBottom={insets.bottom || 20}
            marginTop={20}
            flexDirection="row"
          >
            <Block fillInRow alignItems="flex-start">
              <Text size="sm" fontWeight="600">
                {i18n.t('paywall.weekly_access')}
              </Text>
              <Text size="sm">
                {i18n.t('paywall.weekly_price', {
                  price: premiumPackages?.[0]?.priceFormatted,
                })}
              </Text>
            </Block>
            <Button
              fillInRow
              size="lg"
              text={i18n.t('paywall.pay')}
              onPress={onPressPay}
              loading={loading}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  imageWrapper: {
    width,
    height: width,
    position: 'absolute',
    top: 60,
    zIndex: 1,
  },
  absoluteLeaf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
