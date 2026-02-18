import { useNavigation } from '@react-navigation/native';
import { Block, Button, Text } from 'components/CoreComponents';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { RootNavigation } from 'containers/Router/Router.type';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BgImage from './components/BgImage';

const Onboarding = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const onPressGetStarted = useCallback(() => {
    navigation.navigate('ONBOARDING_PROFILE');
  }, [navigation]);

  return (
    <ScreenContainer safeAreaBottom safeAreaTop backgroundColor="black">
      <Block
        fill
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingTop={20}
        flex={1}
        alignItems="flex-start"
        style={styles.container}
      >
        <Text style={styles.title} variant="headline" fontWeight="600">
          {i18n.t('onboarding.title')}
        </Text>
        <Text marginTop={10}>{i18n.t('onboarding.description')}</Text>

        <Block flex={1} />
        <Button
          size="lg"
          text={i18n.t('onboarding.get_started')}
          fill
          marginBottom={20}
          onPress={onPressGetStarted}
        />
      </Block>
      <BgImage />
    </ScreenContainer>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  container: { zIndex: 1 },
});
