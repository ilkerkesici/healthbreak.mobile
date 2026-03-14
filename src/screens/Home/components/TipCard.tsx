import images from 'assets/images';
import { Block, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CARD_RATIO = 342 / 160;
const BORDER_RADIUS = 20;
const TIP_KEYS = [
  'tip_1',
  'tip_2',
  'tip_3',
  'tip_4',
  'tip_5',
  'tip_6',
  'tip_7',
  'tip_8',
] as const;

const IMAGE_OPACITY = 0.35;

export function TipCard() {
  const { i18n } = useTranslation();

  const tipKey = useMemo(
    () => TIP_KEYS[Math.floor(Math.random() * TIP_KEYS.length)],
    [],
  );
  const tipText = i18n.t(`home.tip.${tipKey}`);

  return (
    <Block borderColor="primary.500/20" style={styles.card}>
      <Image
        source={images.women_stretch}
        style={styles.bgImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text
          variant="caption1"
          size="xs"
          color="primary.500"
          style={styles.label}
        >
          {i18n.t('home.tip.title')}
        </Text>
        <Text
          variant="text"
          size="sm"
          color="primary.500"
          fontWeight="500"
          style={styles.quote}
        >
          "{tipText}"
        </Text>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: CARD_RATIO,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: IMAGE_OPACITY,
    right: -40,
    width: '75%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  quote: {
    lineHeight: 22,
  },
});
