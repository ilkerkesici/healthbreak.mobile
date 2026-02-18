import { Block } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import { Dimensions, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import images from 'assets/images';

const { width, height } = Dimensions.get('window');

const BgImage = () => {
  return (
    <Block style={styles.container}>
      <Image source={images.scan_face} width={width} height={height * 0.8} />
    </Block>
  );
};

export default memo(BgImage);

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});
