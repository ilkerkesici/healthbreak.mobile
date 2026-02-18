import { ColorType } from 'assets/colors';
import { Text } from 'components/CoreComponents';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { useThemeColor } from 'helpers/hooks/useThemeColor';
import React, { memo, useCallback } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { useToastStore } from 'store/useToastStore';

const { width } = Dimensions.get('window');

export type ToastType = 'error' | 'success' | 'warning';

export interface IToast {
  type?: ToastType;
  opened: boolean;
  text: string;
}

function Toast() {
  const toastData = useToastStore(state => state.toastData);

  const getBgColor = useCallback((): ColorType => {
    switch (toastData.type) {
      case 'error':
        return 'red.400';
      case 'warning':
        return 'yellow.500';
      case 'success':
        return 'green.500';
    }
    return 'neutral.900';
  }, [toastData.type]);

  const [bgColor] = useThemeColor([getBgColor()]);

  if (!toastData || !toastData.opened) {
    return <></>;
  }

  const containerStyle = {
    top: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor: bgColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text variant="body" size="sm" fontWeight="500" color="white">
        {toastData.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 2 * DEFAULT_SCREEN_HORIZONTAL_PADDING,
    left: 20,
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
    paddingVertical: 14,
    position: 'absolute',
    zIndex: 99,
    borderRadius: 10,
  },
});

export default memo(Toast);
