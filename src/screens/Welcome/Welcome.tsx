import images from 'assets/images';
import { Block, Button, Icon, Text } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootNavigation } from 'containers/Router/Router.type';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  return (
    <ScreenContainer>
      <Block style={styles.bg}>
        <Image source={images.welcome} width={width} height={height} />
      </Block>
      <Block
        style={[
          styles.container,
          { paddingTop: insets.top || 20, paddingBottom: insets.bottom || 20 },
        ]}
      >
        <Block
          fill
          //   marginLeft={30}
          marginTop={-20}
          //   marginHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        >
          <Image source={images.logo} width={100} height={100} />
          <Text style={styles.title} fontWeight="600" fill center>
            {i18n.t('welcome.title_1')}
          </Text>
          <Text
            // variant="display"
            style={styles.title}
            fill
            center
            fontWeight="600"
            color="primary.400"
          >
            {i18n.t('welcome.title_2')}
          </Text>
          <Text style={styles.title} fill center fontWeight="600">
            {i18n.t('welcome.title_3')}
          </Text>
        </Block>

        <Text center paddingHorizontal={30} marginTop={20} size="md">
          {i18n.t('welcome.subtitle')}
        </Text>
        <Block flex={1} />
        <Button
          fill
          size="lg"
          text={i18n.t('welcome.get_started')}
          onPress={() => navigation.navigate('ONBOARDING')}
        />
        <Block fill flexDirection="row" justifyContent="center" marginTop={20}>
          <Icon name="o:security" color="primary.400" size={12} />
          <Text marginLeft={10} size="sm" color="neutral.700">
            {i18n.t('welcome.expert_approved')}
          </Text>
        </Block>
      </Block>
    </ScreenContainer>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  title: {
    fontSize: 27,
    lineHeight: 38,
  },
});
