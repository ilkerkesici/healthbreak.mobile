import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Icon, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';

type Props = {
  title: string;
  durationSeconds: number;
  onComplete: () => void;
  onPlay?: () => void;
  onPause?: () => void;
};

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(clamped / 60);
  const ss = clamped % 60;
  return `${mm}:${String(ss).padStart(2, '0')}`;
}

export function BottomProgress({
  title,
  durationSeconds,
  onComplete,
  onPlay,
  onPause,
}: Props) {
  const { i18n } = useTranslation();
  const [remaining, setRemaining] = useState(durationSeconds);
  const [paused, setPaused] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    setRemaining(durationSeconds);
    setPaused(false);
    completedRef.current = false;
  }, [durationSeconds]);

  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }

    const id = setInterval(() => {
      setRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [paused, remaining, onComplete]);

  const onTogglePause = useCallback(() => {
    setPaused(prev => {
      const next = !prev;
      if (next) onPause?.();
      else onPlay?.();
      return next;
    });
  }, [onPause, onPlay]);

  const timeLabel = useMemo(() => formatTime(remaining), [remaining]);
  const progress = useMemo(() => {
    if (durationSeconds <= 0) return 1;
    return Math.min(
      1,
      Math.max(0, (durationSeconds - remaining) / durationSeconds),
    );
  }, [durationSeconds, remaining]);

  return (
    <Block
      paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      paddingTop={18}
      paddingBottom={18}
      backgroundColour="white"
      style={styles.container}
    >
      <Block fill flexDirection="row">
        <Block fillInRow>
          <Text fill left size="lg" fontWeight="700" color="primary.500">
            {title}
          </Text>

          <Text fill left marginTop={8} size="sm" color="neutral.600">
            {paused
              ? i18n.t('exercise.progress.paused')
              : i18n.t('exercise.progress.running')}
          </Text>
        </Block>
        <Text
          size="sm"
          variant="display"
          fontWeight="700"
          color="neutral.950"
          style={styles.time}
        >
          {timeLabel}
        </Text>
      </Block>
      <Block marginTop={14} style={styles.progressTrack}>
        <Block
          backgroundColour="primary.500"
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
        />
      </Block>

      <Block flex={1} justifyContent="center" marginTop={16}>
        <TouchableOpacity
          onPress={onTogglePause}
          activeOpacity={0.7}
          style={styles.pauseToggle}
          accessibilityRole="button"
          accessibilityLabel={
            paused
              ? i18n.t('exercise.a11y.play')
              : i18n.t('exercise.a11y.pause')
          }
        >
          <Icon
            name={paused ? 'o:play' : 'o:pause'}
            size={32}
            color="primary.500"
          />
        </TouchableOpacity>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(5, 102, 80, 0.12)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  time: {
    textAlign: 'center',
  },
  pauseToggle: {
    alignSelf: 'center',
    marginTop: 14,
    padding: 24,
    borderRadius: 999,
    backgroundColor: 'rgba(5, 102, 80, 0.08)',
  },
});
