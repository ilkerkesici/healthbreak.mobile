import { ColorType } from 'assets/colors';
import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Text from '../Text/Text';
import { useThemeColor } from 'helpers/hooks/useThemeColor';

interface ProgressProps {
  totalCount: number;
  currentCount: number;
  height?: number;
  backgroundColor?: ColorType;
  progressColor?: ColorType;
  showPercentage?: boolean;
  showCount?: boolean;
  width?: number;
}

const Progress: React.FC<ProgressProps> = ({
  totalCount,
  currentCount,
  height = 8,
  backgroundColor = 'neutral.800',
  progressColor = 'primary.500',
  showPercentage = false,
  showCount = false,
  width = 100,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressPercentage = Math.min((currentCount / totalCount) * 100, 100);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progressPercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentCount, totalCount, progressPercentage, animatedValue]);

  const interpolatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const [backgroundColorHex, progressColorHex] = useThemeColor([
    backgroundColor,
    progressColor,
  ]);

  return (
    <View style={[styles.container, { width }]}>
      <View
        style={[
          styles.progressContainer,
          { height, backgroundColor: backgroundColorHex },
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: interpolatedWidth,
              height,
              backgroundColor: progressColorHex,
            },
          ]}
        />
      </View>

      {(showPercentage || showCount) && (
        <View style={styles.infoContainer}>
          {showCount && (
            <Text style={styles.countText}>
              {currentCount} / {totalCount}
            </Text>
          )}
          {showPercentage && (
            <Text style={styles.percentageText}>
              {Math.round(progressPercentage)}%
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  progressContainer: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  countText: {
    fontSize: 14,
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default memo(Progress);
