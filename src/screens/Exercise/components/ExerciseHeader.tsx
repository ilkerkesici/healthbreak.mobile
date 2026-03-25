import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'components/CoreComponents/Icon';
import type { RootNavigation } from 'containers/Router/Router.type';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';

type Props = {
  muted: boolean;
  onToggleMute: () => void;
};

export function ExerciseHeader({ muted, onToggleMute }: Props) {
  const navigation = useNavigation<RootNavigation>();
  const insets = useSafeAreaInsets();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, { paddingTop: insets.top || 20 }]}>
      <View style={styles.pill}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={styles.iconButton}
          accessibilityRole="button"
        >
          <Icon name="o:arrow_left" size={22} color="primary.500" />
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity
          onPress={onToggleMute}
          activeOpacity={0.7}
          style={styles.iconButton}
          accessibilityRole="button"
        >
          <Icon
            name={muted ? 'o:volume_closed' : 'o:volume_open'}
            size={22}
            color="primary.500"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
    zIndex: 5,
  },
  pill: {
    height: 44,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  spacer: {
    flex: 1,
  },
});
