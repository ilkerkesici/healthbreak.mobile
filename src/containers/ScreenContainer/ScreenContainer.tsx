import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './ScreenContainer.style';
import {DesignProps} from 'types/design';
import {designPropToStyle} from 'helpers/utils/design.utils';
import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';
import {useTheme, useThemeColor} from 'helpers/hooks/useThemeColor';
//import {useNavigationState} from '@react-navigation/native';

interface Props extends DesignProps {
  children?: React.ReactNode;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  defaultPadding?: boolean;
}

const ScreenContainer: React.FC<Props> = ({
  children,
  defaultPadding,
  paddingHorizontal = defaultPadding ? DEFAULT_SCREEN_HORIZONTAL_PADDING : 0,
  safeAreaBottom = false,
  safeAreaTop = false,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  const {isDarkMode} = useTheme();

  //const state = useNavigationState(state => state);
  //const isForceDark = useMemo(
  //  () => state.routeNames[state.index] === 'VIDEO_FEED',
  //  [state],
  //);
  const isForceDark = false;

  const [backgroundColor] = useThemeColor([
    isForceDark ? 'neutral.950-f' : 'neutral.50',
  ]);
  const designProps = designPropToStyle({paddingHorizontal, ...rest});
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
