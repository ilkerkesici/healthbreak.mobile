import { ColorType } from 'assets/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import lotties from 'assets/lotties';
import Text from '../Text/Text';

interface Props {
  loading: boolean | null | undefined;
  testID?: string;
  size?: number | 'large' | 'small';
  color?: ColorType;
  simple?: boolean;
  fullScreen?: boolean;
  forceDark?: boolean;
  bgColor?: string;
  text?: string;
}

export default function Spinner({
  loading = false,
  size = 100,
  // color,
  simple,
  bgColor,
  text,
}: Props) {
  const sizeNum = typeof size === 'number' ? size : getSize(size);

  if (loading && simple) {
    return (
      <LottieView
        source={lotties.spinner}
        style={{ width: sizeNum, height: sizeNum }}
        loop
        autoPlay
        speed={2}
      />
    );
  }
  return loading ? (
    <View
      style={[styles.container, bgColor ? { backgroundColor: bgColor } : {}]}
    >
      <LottieView
        style={{ width: sizeNum, height: sizeNum }}
        loop
        autoPlay
        source={lotties.spinner}
        speed={3}
      />
      {text && (
        <Text fill center>
          {text}
        </Text>
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
});

const getSize = (size?: 'small' | 'large') => {
  if (size === 'small') {
    return 24;
  }
  return 80;
};
