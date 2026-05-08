import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  RootNavigation,
  RootStackParamList,
} from 'containers/Router/Router.type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import images from 'assets/images';
import useTranslation from 'helpers/hooks/useTranslation';
import usePremiumHook from 'helpers/hooks/usePremiumHook';
import PrivacyPolicyTexts from './components/PrivacyPolicyTexts';
import {
  checkSubscriptionStatus,
  requestPurchaseSubscription,
} from 'helpers/utils/premium.utils';
import useAuthHook from 'helpers/hooks/useAuthHook';
import { SubsPackage } from 'types/models';
import Packages from './components/Packages';
import Benefits from './components/Benefits';
import InfoHighlightCard from './components/InfoHighlightCard';
import PaywallHeroBackground from './components/PaywallHeroBackground';
import useNextExercise from 'helpers/hooks/useNextExerciseHook';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';
import { useRemoteConfigHook } from 'helpers/hooks/useRemoteConfigHook';

type PaywallRoute = RouteProp<RootStackParamList, 'PAYWALL'>;

const Paywall = () => {
  const [loading, setLoading] = useState(false);
  const [scrollY] = useState(() => new Animated.Value(0));
  const [selectedPackage, setSelectedPackage] = useState<SubsPackage | null>(
    null,
  );

  const { user } = useAuthHook();
  const navigation = useNavigation<RootNavigation>();
  const route = useRoute<PaywallRoute>();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { premiumPackages, changePremiumStatus } = usePremiumHook();
  const { nextExercise } = useNextExercise();
  const { packagesVariantBEnabled } = useRemoteConfigHook();

  const activePackage = useMemo(
    () => selectedPackage ?? premiumPackages?.find(Boolean) ?? null,
    [premiumPackages, selectedPackage],
  );
  const heroHeight = useMemo(
    () => Dimensions.get('window').width * (3 / 4),
    [],
  );

  const onSuccessSubscription = async (pkc: SubsPackage) => {
    changePremiumStatus(true);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HOME' }],
      }),
    );

    const shouldGoToNextExercise = !!route.params?.goToNextExercise;

    if (shouldGoToNextExercise && nextExercise) {
      setTimeout(() => {
        navigation.navigate('EXERCISE', { exercise: nextExercise });
      }, 0);
    }
  };

  const onPressClose = () => {
    if (route.params?.goToNextExercise) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HOME' }],
        }),
      );
      return;
    }
    navigation.goBack();
  };

  const onPressPay = async () => {
    if (!activePackage || !user?.uid) {
      return;
    }

    setLoading(true);
    await requestPurchaseSubscription(activePackage, user?.uid);
    const checkSubscription = await checkSubscriptionStatus();
    console.log('checkSubscription', checkSubscription);
    if (checkSubscription) {
      AnalyticHelper.logEvent('subscription_success', {
        package: activePackage.data?.id,
        price: activePackage.price,
        currency: activePackage.currency,
      });
      AnalyticHelper.logPurchase(activePackage);
      await onSuccessSubscription(activePackage);
    } else {
      Alert.alert('Subscription Failed', 'Please try again later');
      AnalyticHelper.logEvent('subscription_failed', {
        package: activePackage.data?.id,
        price: activePackage.price,
        currency: activePackage.currency,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    AnalyticHelper.logEvent('paywall_seen', {
      packagesVariantBEnabled,
      source: route.params?.source,
    });
  }, []);

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
            onPress={onPressClose}
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
