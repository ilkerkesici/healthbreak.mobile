import React, {memo} from 'react';
import {Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Text, {CustomTextProps} from './Text';
import {ColorType} from 'assets/colors';
import {FontWeightType} from 'assets/typography';
import {RootNavigation} from 'containers/Router/Router.type';
import {TypographyBaseSize, TypographyVariants} from 'types/design';

export interface LinkedItem {
  text: string;
  link?: string;
  inAppWebview?: boolean;
  screen?: string;
  textProps?: {
    variant?: TypographyVariants;
    size?: TypographyBaseSize;
    color?: ColorType;
    fontWeight?: FontWeightType;
  };
}

export interface LinkedTextProps extends CustomTextProps {
  linked?: LinkedItem[];
}

const LinkedText: React.FC<LinkedTextProps> = ({
  children,
  linked = [],
  ...rest
}) => {
  const navigation = useNavigation<RootNavigation>();

  const navigateToScreen = (screen?: string) => {
    if (!screen) {
      return;
    }
    navigation.navigate(screen as any);
  };

  const onPressLink = (
    link?: string,
    screen?: string,
    inAppWebview?: boolean,
  ) => {
    navigateToScreen(screen);
    if (!link) {
      return;
    }
    if (inAppWebview) {
      // navigation.navigate('WEBVIEW', { uri: link });
      return;
    }
    Linking.canOpenURL(link)
      .then(result => {
        if (result) {
          Linking.openURL(link);
        } else {
          Alert.alert('', 'This URL cannot open.');
        }
      })
      .catch(() => {
        Alert.alert('', 'This URL cannot open.');
      });
  };

  if (typeof children !== 'string' || linked.length === 0) {
    return <Text {...rest}>{children}</Text>;
  }

  // Tüm `linked.text` değerlerini içeren regex oluştur
  const linkedTexts = linked.map(item => item.text).join('|');
  const regex = new RegExp(`(${linkedTexts})`, 'gi');

  // Çocuk metni parçalarına ayır
  const parts = children.split(regex);

  return (
    <Text {...rest}>
      {parts.map((part, index) => {
        const matchedItem = linked.find(
          item => item.text.toLowerCase() === part.toLowerCase(),
        );

        return matchedItem ? (
          <Text
            key={index}
            onPress={() =>
              onPressLink(
                matchedItem.link,
                matchedItem.screen,
                matchedItem.inAppWebview,
              )
            }
            {...rest}
            color={'primary.500'}
            {...matchedItem.textProps}
            underline>
            {part}
          </Text>
        ) : (
          part
        );
      })}
    </Text>
  );
};

export default memo(LinkedText);
