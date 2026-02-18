import images from 'assets/images';
import { Block, Text } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { useSplashStore } from 'store/useSplashStore';
import BootSplash from 'react-native-bootsplash';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const DURATION = 2500;
const SCREEN_CLOSE_DURATION = 500;

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 200;

const SplashWidget = () => {
  const [localVisible, setLocalVisible] = useState(true);
  const [companyNameLoadEnd, setCompanyNameLoadEnd] = useState(false);

  const opacity = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  const { visible } = useSplashStore();

  const animatedOpacity = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const animatedScreenOpacity = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const showCompanyName = useCallback(() => {
    opacity.value = withTiming(1, { duration: DURATION });
    setTimeout(() => {
      setCompanyNameLoadEnd(true);
    }, DURATION + 200);
  }, [opacity]);

  const onLoadWidget = useCallback(() => {
    setTimeout(() => BootSplash.hide({ fade: false }), 100);
    setTimeout(() => showCompanyName(), 100);
  }, [showCompanyName]);

  const closeScreen = useCallback(() => {
    screenOpacity.value = withTiming(
      0,
      { duration: SCREEN_CLOSE_DURATION },
      () => {
        runOnJS(setLocalVisible)(false);
      },
    );
  }, [screenOpacity]);

  useEffect(() => {
    if (!visible && companyNameLoadEnd) {
      closeScreen();
    }
  }, [visible, companyNameLoadEnd, closeScreen]);

  if (!localVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: '#000' },
        animatedScreenOpacity,
      ]}
    >
      <Block fill flex={1}>
        {/* <Image
          onLoad={onLoadWidget}
          source={images.app_icon}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          marginBottom={0}
        /> */}
      </Block>
      <Animated.View style={[styles.animatedBottom, animatedOpacity]}>
        <Text variant="text" size="md">
          Better Me AI
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(SplashWidget);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
  },
  animatedBottom: {
    position: 'absolute',
    width,
    bottom: Platform.OS === 'ios' ? 30 : 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
});
