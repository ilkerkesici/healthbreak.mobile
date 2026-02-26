import images from 'assets/images';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import LinkedText from 'components/CoreComponents/Text/LinkedText';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';

const StartPage = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const onPressStart = useCallback(() => {
    // Şimdilik home'a yönlendir, sonra Paywall'a yönlendirilecek.
    navigation.navigate('HOME');
  }, [navigation]);

  return (
    <ScreenContainer safeAreaTop safeAreaBottom>
      <Block fill flex={1} justifyContent="flex-start">
        <Image source={images.start_page} width={320} height={320} />

        <Text variant="display" size="md" color="white" center fontWeight="600">
          {i18n.t('start_page.title')}
        </Text>
        <LinkedText
          center
          marginHorizontal={60}
          marginTop={12}
          marginBottom={32}
          linked={[
            {
              text: i18n.t('start_page.linked'),
              textProps: {
                color: 'secondary.500',
                underline: false,
              },
            },
          ]}
        >
          {i18n.t('start_page.subtitle')}
        </LinkedText>

        <Block
          flexDirection="row"
          justifyContent="center"
          marginBottom={32}
          gap={12}
        >
          <Block style={styles.pill}>
            <Icon name="o:clock" size={16} color="secondary.500" />
            <Text variant="text" size="sm" color="white" marginLeft={6}>
              {i18n.t('start_page.duration')}
            </Text>
          </Block>

          <Block style={styles.pill}>
            <Icon name="o:neck" size={16} color="secondary.500" />
            <Text variant="text" size="sm" color="white" marginLeft={6}>
              {i18n.t('start_page.area')}
            </Text>
          </Block>
        </Block>

        <Block flex={1} />

        <Button
          fill
          size="lg"
          text={i18n.t('start_page.cta')}
          rightIcon="o:arrow_right"
          marginHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
          onPress={onPressStart}
        />

        {/* <Block alignItems="center" marginTop={16}>
          <Text variant="text" size="sm" color="neutral.500">
            {i18n.t('start_page.later')}
          </Text>
        </Block> */}
      </Block>
    </ScreenContainer>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});
