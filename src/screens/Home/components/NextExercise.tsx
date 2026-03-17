import { Block, Button, Icon, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import useNextExercise from 'helpers/hooks/useNextExerciseHook';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ExerciseTarget } from 'types/models';

const CARD_BORDER = '#0566500D';
const CARD_BG = 'rgba(255,255,255,0.9)';
const INNER_CARD_BG = '#FFFFFF';

/** scheduled_at / delayed_at UTC kabul edilir; şu anki UTC zamanına göre kalan dakikayı döner.
 * Eğer hedef zaman geçmişse negatif değer dönebilir.
 */
function getMinutesUntil(dateStr: string | null): number {
  if (!dateStr) return 0;
  const targetUtc = DateTime.fromISO(dateStr.replace(' ', 'T'), {
    zone: 'utc',
  });
  if (!targetUtc.isValid) return 0;
  const nowUtc = DateTime.utc();
  const diffMinutes = targetUtc.diff(nowUtc, 'minutes').minutes;
  return Math.round(diffMinutes);
}

export function NextExercise() {
  const { nextExercise, getNextExercise } = useNextExercise();
  const { i18n } = useTranslation();

  useEffect(() => {
    getNextExercise();
  }, [getNextExercise]);

  const minutesUntil = useMemo(() => {
    if (!nextExercise?.schedule) return 0;
    const at =
      nextExercise.schedule.delayed_at ?? nextExercise.schedule.scheduled_at;
    return getMinutesUntil(at);
  }, [nextExercise?.schedule]);

  const timeLabel = useMemo(() => {
    if (minutesUntil <= 0) {
      return i18n.t('home.next_exercise.now');
    }
    if (minutesUntil >= 60) {
      const hours = Math.floor(minutesUntil / 60);
      const mins = minutesUntil % 60;
      return i18n.t('home.next_exercise.hours_min_later', {
        hours,
        min: mins,
      });
    }
    return i18n.t('home.next_exercise.min_later', { min: minutesUntil });
  }, [minutesUntil, i18n]);

  if (!nextExercise) {
    return null;
  }

  const targetKey = nextExercise.exercise.target as ExerciseTarget | undefined;
  const targetTranslated =
    targetKey && Object.values(ExerciseTarget).includes(targetKey)
      ? i18n.t(`exercise_target.${targetKey}`)
      : nextExercise.exercise.target || '';
  const title =
    targetTranslated ||
    nextExercise.exercise.title ||
    nextExercise.exercise.target;

  return (
    <Block
      marginTop={16}
      padding={16}
      style={[styles.card, { backgroundColor: CARD_BG }]}
    >
      <Text
        variant="caption1"
        size="xs"
        color="primary.500/60"
        style={styles.label}
      >
        {i18n.t('home.next_exercise.next_break')}
      </Text>

      <Block flexDirection="row" alignItems="center" marginBottom={16}>
        <Icon name="o:clock" size={20} color="primary.500" />
        <Text size="lg" color="neutral.950" fontWeight="600" marginLeft={8}>
          {timeLabel}
        </Text>
      </Block>

      <Block flexDirection="row" gap={12} marginBottom={20}>
        <Block flex={1} padding={12} style={styles.innerCard}>
          <Icon name="o:arrow_path" size={18} color="neutral.700" />
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.innerLabel}
          >
            {i18n.t('home.next_exercise.target')}
          </Text>
          <Text
            variant="text"
            size="sm"
            color="neutral.950"
            fontWeight="600"
            numberOfLines={2}
          >
            {title}
          </Text>
        </Block>
        <Block flex={1} padding={12} style={styles.innerCard}>
          <Icon name="o:clock" size={18} color="neutral.700" />
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.innerLabel}
          >
            {i18n.t('home.next_exercise.duration')}
          </Text>
          <Text variant="text" size="sm" color="neutral.950" fontWeight="600">
            {i18n.t('home.next_exercise.duration_1_min')}
          </Text>
        </Block>
      </Block>

      <Button
        fill
        size="lg"
        text={i18n.t('home.next_exercise.take_break_now')}
        rightIcon="o:chevron_right"
        onPress={() => {}}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  label: {
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  innerCard: {
    backgroundColor: INNER_CARD_BG,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  innerLabel: {
    marginTop: 6,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
});
