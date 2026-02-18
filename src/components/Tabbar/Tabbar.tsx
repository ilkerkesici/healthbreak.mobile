import React, { memo, useCallback, useMemo } from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block, Icon, IconType, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING, TABBAR_HEIGHT } from 'constants/design';
import { useThemeColor } from 'helpers/hooks/useThemeColor';
import { ColorType } from 'assets/colors';
// import {hapticFeedbackLight} from 'helpers/utils/utils';

const Tabbar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const [borderColor, borderFD] = useThemeColor([
    'neutral.300',
    'neutral.500-f',
  ]);

  // const isForceDark = useMemo(
  //   () => state.routeNames[state.index] === 'VIDEO_FEED',
  //   [state],
  // );

  const isForceDark = false;

  const currenScreen = state.routeNames[state.index];

  const tabData: {
    icon: IconType;
    screenName: string;
    modal?: boolean;
    text: string;
  }[] = [
    {
      screenName: 'HOME',
      icon: currenScreen === 'HOME' ? 's:home' : 'o:home',
      text: i18n.t('common.home'),
    },
    {
      screenName: 'TASKS',
      icon: 'o:analysis',
      text: i18n.t('common.tasks'),
    },
    // {
    //   screenName: 'DISCOVER',
    //   icon: 'o:search-normal',
    //   text: i18n.t('common.discover'),
    // },
    // {
    //   screenName: 'PLAY',
    //   icon: currenScreen === 'PLAY' ? 's:puzzle' : 'o:puzzle',
    //   text: i18n.t('common.play'),
    // },
    {
      screenName: 'MENU',
      icon: 'o:menu',
      text: i18n.t('common.menu'),
    },
  ];

  const onPressTab = useCallback(
    (route: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route);
      }
    },
    [navigation],
  );

  const containerStyle = useMemo(
    () => ({
      borderTopWidth: 1,
      borderTopColor: isForceDark ? borderFD : borderColor,
    }),
    [borderColor, borderFD, isForceDark],
  );

  return (
    <Block fill>
      <Block
        flexDirection="row"
        fill
        backgroundColour={'custom-wb'}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        paddingTop={14}
        paddingBottom={insets.bottom || 12}
        style={containerStyle}
        height={TABBAR_HEIGHT + insets.bottom || 12}
      >
        {tabData.map(
          (
            route: {
              icon: IconType;
              screenName: string;
              modal?: boolean;
              text: string;
            },
            index: number,
          ) => {
            const isFocused =
              state.routeNames[state.index] === route.screenName;
            const onPress = () => {
              onPressTab(route.screenName, isFocused);
            };

            const color: ColorType = isFocused ? 'neutral.950' : 'neutral.500';

            return (
              <Block key={index} fillInRow onPress={onPress} activeOpacity={1}>
                <Icon
                  key={index}
                  color={color}
                  strokeColor={isForceDark ? 'custom-wn-fd' : 'custom-wb'}
                  name={route.icon}
                  marginBottom={6}
                  size={24}
                />
                <Text
                  variant="subhead"
                  size="xs"
                  fontWeight={isFocused ? '600' : '400'}
                  color={color}
                  fill
                  center
                >
                  {route.text}
                </Text>
              </Block>
            );
          },
        )}
      </Block>
    </Block>
  );
};

export default memo(Tabbar);
