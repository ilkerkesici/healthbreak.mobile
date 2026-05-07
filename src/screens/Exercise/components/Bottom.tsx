import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomReady } from './BottomReady';
import { BottomProgress } from './BottomProgress';
import useTranslation from 'helpers/hooks/useTranslation';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';
import { BOTTOM_HEIGHT } from '../constants';

type Props = {
  exerciseId: number;
  scheduleId: number;
  title: string;
  description?: string | null;
  durationSeconds?: number;
  onComplete: () => void;
  onStart?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
};

export function Bottom({
  exerciseId,
  scheduleId,
  title,
  description,
  durationSeconds = 60,
  onComplete,
  onStart,
  onPlay,
  onPause,
}: Props) {
  const [mode, setMode] = useState<'ready' | 'progress'>('ready');
  const [contentHeight, setContentHeight] = useState(BOTTOM_HEIGHT);
  const { i18n } = useTranslation();
  const sheetRef = useRef<BottomSheet>(null);
  const didExpandOnMount = useRef(false);
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => {
    const expanded = contentHeight + insets.bottom;
    if (expanded <= BOTTOM_HEIGHT + 1) {
      return [BOTTOM_HEIGHT];
    }
    return [BOTTOM_HEIGHT, expanded];
  }, [contentHeight, insets.bottom]);

  const durationLabel = useMemo(() => {
    const minutes = Math.max(1, Math.round(durationSeconds / 60));
    return i18n.t('common.n_min', { min: minutes });
  }, [durationSeconds, i18n]);

  const onPressStart = useCallback(() => {
    AnalyticHelper.logEvent('exercise_started', {
      exercise_id: exerciseId,
      schedule_id: scheduleId,
    });
    setMode('progress');
    onStart?.();
    sheetRef.current?.snapToIndex(0);
  }, [exerciseId, scheduleId, onStart]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.height;
    setContentHeight(prev => (Math.abs(prev - next) < 1 ? prev : next));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (didExpandOnMount.current) return;
      didExpandOnMount.current = true;
      sheetRef.current?.snapToIndex(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View
        onLayout={handleContentLayout}
        style={[styles.content, { paddingBottom: insets.bottom }]}
      >
        {mode === 'ready' ? (
          <BottomReady
            title={title}
            description={description}
            durationLabel={durationLabel}
            onPressStart={onPressStart}
          />
        ) : (
          <BottomProgress
            title={title}
            durationSeconds={durationSeconds}
            onComplete={onComplete}
            onPlay={onPlay}
            onPause={onPause}
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  handleIndicator: {
    backgroundColor: 'rgba(5, 102, 80, 0.25)',
    width: 44,
  },
  content: {
    width: '100%',
  },
});
