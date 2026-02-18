import {designPropToStyle} from 'helpers/utils/design.utils';
import React, {useMemo, useState} from 'react';
import {
  Dimensions,
  ImageProps,
  ImageSourcePropType,
  ImageURISource,
  Image as RNImage,
  View,
  ViewStyle,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {DesignProps} from 'types/design';
import {SvgUri} from 'react-native-svg'; // Eğer react-native-svg kütüphanesini kullanıyorsanız

const {width} = Dimensions.get('window');

interface Props extends ImageProps, DesignProps {
  source: {uri: string} | ImageSourcePropType;
  fullWidthContain?: boolean;
  left?: boolean;
  onLoad?: () => void;
}

const Image: React.FC<Props> = props => {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const propStyle = designPropToStyle(props);
  const style: any = {...propStyle, ...(props.style as any)};

  const RATIO =
    dimensions.width && dimensions.height
      ? dimensions.width / dimensions.height
      : 1;
  const FULL_WIDTH = (props.width as number) || width;
  const HEIGHT = FULL_WIDTH / RATIO;

  const fullWidthStyle = {width: FULL_WIDTH, height: HEIGHT};

  if (!(props.source as ImageURISource).uri) {
    return <RNImage style={style} {...props} />;
  }

  if (isSvgUrl((props.source as ImageURISource).uri)) {
    return (
      <SvgImage
        uri={(props.source as ImageURISource).uri as string}
        width={props.width || 0}
        height={props.height || 0}
        left={props.left}
      />
    );
  }

  return (
    <FastImage
      style={[
        propStyle as any,
        props.style as any,
        props.fullWidthContain ? fullWidthStyle : {},
      ]}
      source={{
        uri: (props.source as ImageURISource).uri,
        priority: FastImage.priority.normal,
      }}
      onLoad={e => {
        setDimensions({
          width: e.nativeEvent.width,
          height: e.nativeEvent.height,
        });
        props?.onLoad?.();
      }}
      resizeMode={(props.resizeMode as any) || undefined}
    />
  );
};

interface SvgImageProps {
  uri: string;
  width: number;
  height: number;
  left?: boolean;
}

const SvgImage: React.FC<SvgImageProps> = ({uri, width, left, height}) => {
  const viewStyle: ViewStyle = useMemo(
    () => ({
      width,
      height,
      justifyContent: 'center',
      alignItems: left ? 'flex-start' : 'center',
    }),
    [left, width, height],
  );

  return (
    <View style={viewStyle}>
      <SvgUri
        uri={uri as any}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet" // resizeMode="contain" etkisi sağlar
      />
    </View>
  );
};

const isSvgUrl = (url?: string): boolean => {
  if (!url) {
    return false;
  }
  return url.toLowerCase().endsWith('.svg');
};

export default Image;
