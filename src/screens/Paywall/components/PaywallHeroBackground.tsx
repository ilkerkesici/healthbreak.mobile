import React, { ReactNode, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Block } from 'components/CoreComponents';
import { useThemeColor } from 'helpers/hooks/useThemeColor';

interface Props {
  scrollY: Animated.Value;
  imageSource?: ImageSourcePropType;
  children?: ReactNode;
}

const HERO_RATIO = 3 / 4;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = WIDTH * HERO_RATIO;

function addAlphaToHex(hex: string, alphaHex: string) {
  if (!hex.startsWith('#')) {
    return hex;
  }
  if (hex.length === 7) {
    return `${hex}${alphaHex}`;
  }
  return hex;
}

export default function PaywallHeroBackground({
  scrollY,
  imageSource,
  children,
}: Props) {
  const [bgColor] = useThemeColor(['bg-2']);
  const heroHeight = useMemo(
    () => Dimensions.get('window').width * HERO_RATIO,
    [],
  );

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const gradientTransparent = addAlphaToHex(bgColor, '00');

  return (
    <Block height={heroHeight} backgroundColour="bg-2" style={styles.container}>
      {imageSource ? (
        <Animated.Image
          source={imageSource}
          style={[styles.image, { opacity: imageOpacity }]}
          resizeMode="cover"
        />
      ) : null}

      <LinearGradient
        colors={[bgColor, bgColor, gradientTransparent]}
        locations={[0, 0.1, 0.4]}
        start={{ x: 0.4, y: 1 }}
        end={{ x: 0.4, y: 0 }}
        style={styles.gradient}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
