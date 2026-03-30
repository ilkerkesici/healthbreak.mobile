import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomReady } from './BottomReady';
import { BottomProgress } from './BottomProgress';
import useTranslation from 'helpers/hooks/useTranslation';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';

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
  const { i18n } = useTranslation();

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
  }, [onStart]);

  return (
    <View style={styles.root}>
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
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
  },
});
