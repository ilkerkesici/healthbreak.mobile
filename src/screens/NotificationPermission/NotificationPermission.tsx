import images from 'assets/images';
import { Block, Button, Text } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootNavigation } from 'containers/Router/Router.type';
import { useNavigation } from '@react-navigation/native';

const BG_COLOR = '#0d2329';
const ICON_SIZE = 250;

const NotificationPermission = () => {
  const { i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigation>();

  const onTurnOn = useCallback(() => {
    // OneSignal eklendiğinde bildirim izni isteği burada yapılacak.
    navigation.navigate('START_PAGE');
  }, [navigation]);

  const onLater = useCallback(() => {
    // Daha sonra: isteğe göre bir sonraki ekrana geçilebilir.
    navigation.navigate('START_PAGE');
  }, [navigation]);

  return (
    <ScreenContainer safeAreaTop safeAreaBottom={false} backgroundColor="bg-1">
      <Block flex={1} style={styles.container}>
        <Block
          flex={1}
          paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
          justifyContent="center"
          alignItems="center"
          style={[styles.inner, { paddingTop: insets.top || 20 }]}
        >
          <Block alignItems="center" marginBottom={10}>
            <Image
              source={images.notif_permit}
              width={ICON_SIZE}
              height={ICON_SIZE}
              resizeMode="contain"
              marginTop={-40}
            />
          </Block>

          <Block
            alignItems="center"
            marginBottom={16}
            paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
          >
            <Text
              variant="display"
              size="sm"
              color="neutral.950"
              center
              fontWeight="600"
            >
              {i18n.t('notif_permit.title')}
            </Text>
          </Block>

          <Block alignItems="center" marginBottom={40}>
            <Text
              variant="text"
              size="md"
              color="neutral.600"
              center
              style={styles.subtitle}
            >
              {i18n.t('notif_permit.subtitle')}
            </Text>
          </Block>

          <Block flex={1} />

          <Block width="100%" marginBottom={20}>
            <Button
              fill
              text={i18n.t('notif_permit.turn_on')}
              onPress={onTurnOn}
            />
          </Block>

          <Block marginBottom={insets.bottom || 20}>
            <TouchableOpacity onPress={onLater} activeOpacity={0.7}>
              <Text variant="text" size="md" color="neutral.500" center>
                {i18n.t('notif_permit.later')}
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScreenContainer>
  );
};

export default NotificationPermission;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
  },
  inner: {
    flex: 1,
  },
  title: {
    lineHeight: 28,
  },
  subtitle: {
    lineHeight: 22,
  },
});
