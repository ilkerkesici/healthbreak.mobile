import React, {useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import {Header} from './Header';
import {HeaderProps} from './Header.type';
import {DesignProps} from 'types/design';
import {useThemeColor} from 'helpers/hooks/useThemeColor';

interface Props extends DesignProps {
  headerProps?: HeaderProps;
  scrollviewProps?: ScrollViewProps;
  children?: JSX.Element | JSX.Element[];
}

export default function HeaderWithScrollView({
  headerProps,
  scrollviewProps,
  children,
  backgroundColor = 'neutral.200',
}: Props) {
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);
  const [bgColor] = useThemeColor([backgroundColor]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.y > 0 && !showHeaderShadow) {
        setShowHeaderShadow(true);
      } else if (e.nativeEvent.contentOffset.y <= 0 && showHeaderShadow) {
        setShowHeaderShadow(false);
      }
    },
    [showHeaderShadow, setShowHeaderShadow],
  );
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Header showHeaderShadow={showHeaderShadow} {...headerProps} />
      <ScrollView
        style={styles.container}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollviewProps}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
