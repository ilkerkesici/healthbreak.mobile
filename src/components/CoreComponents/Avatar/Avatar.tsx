import React from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';

import Display from '../Display';
import {Icon} from '../Icon';
import Image from '../Image/Image';
import Text from '../Text/Text';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {ColorType} from 'assets/colors';
import {DesignProps, TypographyBaseSize} from 'types/design';
import {designPropToStyle} from 'helpers/utils/design.utils';

interface Props extends DesignProps {
  imageSource?: ImageSourcePropType;
  text?: string;
  size?: number;
  textSize?: TypographyBaseSize;
  textColor?: ColorType;
  iconColor?: ColorType;
}

/**
 * A React functional component representing an Avatar.
 *
 * @param {Props} props - Props for the Avatar component.
 * @param {number} [props.size=46] - The size of the Avatar.
 * @param {string} [props.text] - The text content to be displayed in the Avatar.
 * @param {ImageSourcePropType} [props.imageSource] - The source for the image to be displayed in the Avatar.
 * @param {TypographyBaseSize} [props.textSize='lg'] - The base size of the text in the Avatar.
 * @param {ColorType} [props.backgroundColour='neutral.300'] - The background color of the Avatar.
 * @param {ColorType} [props.textColor='neutral.900'] - The color of the text in the Avatar.
 * @param {ColorType} [props.iconColor='neutral.900'] - The color of the default icon in the Avatar.
 * @param {...DesignProps} [props.rest] - Additional design-related props to customize the Avatar's style.
 *
 * @returns {JSX.Element} The Avatar component.
 */
const Avatar: React.FC<Props> = ({
  size = 46,
  text,
  imageSource,
  textSize = 'lg',
  backgroundColour = 'neutral.300',
  textColor = 'neutral.900',
  iconColor = 'neutral.900',
  ...rest
}: Props): JSX.Element => {
  const [backgroundColorHex] = useThemeColor([backgroundColour]);

  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  const designProps = designPropToStyle(rest);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColorHex},
        sizeStyle,
        designProps,
      ]}>
      <Display show={text}>
        <Text
          variant="subhead"
          size={textSize}
          fontWeight={'500'}
          color={textColor}>
          {text}
        </Text>
      </Display>
      <Display show={!imageSource && !text}>
        <Icon name={'s:user'} color={iconColor} />
      </Display>

      {imageSource ? (
        <Image source={imageSource} style={[sizeStyle, styles.container]} />
      ) : null}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
