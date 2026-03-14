import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './ScreenContainer.style';
import { DesignProps } from 'types/design';
import { designPropToStyle } from 'helpers/utils/design.utils';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { useTheme, useThemeColor } from 'helpers/hooks/useThemeColor';
//import {useNavigationState} from '@react-navigation/native';
import { ColorType } from 'assets/colors';

interface Props extends DesignProps {
  children?: React.ReactNode;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  defaultPadding?: boolean;
  bgColor?: ColorType;
}

const ScreenContainer: React.FC<Props> = ({
  children,
  defaultPadding,
  paddingHorizontal = defaultPadding ? DEFAULT_SCREEN_HORIZONTAL_PADDING : 0,
  safeAreaBottom = false,
  safeAreaTop = false,
  bgColor = 'bg-1',
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();

  const [backgroundColor] = useThemeColor([bgColor]);
  const designProps = designPropToStyle({ paddingHorizontal, ...rest });
  const propsStyle = {
    paddingTop: safeAreaTop ? insets.top : 0,
    paddingBottom: safeAreaBottom ? insets.bottom : 0,
    backgroundColor,
  };

  return (
    <View style={[styles.container, propsStyle, designProps]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
      />
      {children}
    </View>
  );
};

export default ScreenContainer;
