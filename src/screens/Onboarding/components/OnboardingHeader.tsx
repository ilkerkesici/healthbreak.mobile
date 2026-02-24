import { Block, Icon, Text } from 'components/CoreComponents';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const PROGRESS_HEIGHT = 4;

interface OnboardingHeaderProps {
  currentIndex: number;
  total: number;
  progress: number; // 0..1
  onBack?: () => void;
}

export function OnboardingHeader({
  currentIndex,
  total,
  progress,
  onBack,
}: OnboardingHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} hitSlop={12} style={styles.back}>
            <Icon name="o:arrow_left" size={24} color="neutral.950" />
          </TouchableOpacity>
        ) : (
          <Block width={40} height={40} />
        )}
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
        <Text
          variant="text"
          size="sm"
          color="neutral.600"
          style={styles.counter}
        >
          {currentIndex + 1}/{total}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  back: {
    padding: 4,
  },
  progressTrack: {
    flex: 1,
    height: PROGRESS_HEIGHT,
    borderRadius: PROGRESS_HEIGHT / 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: PROGRESS_HEIGHT / 2,
    backgroundColor: '#14EDB9',
  },
  counter: {
    minWidth: 32,
    textAlign: 'right',
  },
});
