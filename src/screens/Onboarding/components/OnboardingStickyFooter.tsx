import { Block, Icon, Text } from 'components/CoreComponents';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BUTTON_HEIGHT = 52;
const ACCENT_BG = '#056650';

interface OnboardingStickyFooterProps {
  label: string;
  disabled: boolean;
  onPress: () => void;
}

export function OnboardingStickyFooter({
  label,
  disabled,
  onPress,
}: OnboardingStickyFooterProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 16);

  return (
    <View style={[styles.wrapper, { paddingBottom: bottomPadding }]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
        style={[styles.button, disabled && styles.buttonDisabled]}
      >
        <Text variant="headline" size="md" color="white" style={styles.label}>
          {label}
        </Text>
        <Icon name="o:arrow_right" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  button: {
    height: BUTTON_HEIGHT,
    backgroundColor: ACCENT_BG,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {},
});
