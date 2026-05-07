import { Block, Button, Icon, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import useNextExercise from 'helpers/hooks/useNextExerciseHook';
import useToastHook from 'helpers/hooks/useToastHook';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const CARD_BORDER = '#0566500D';
const CARD_BG = 'rgba(255,255,255,0.9)';

export function PlanNextExercise() {
  const { i18n } = useTranslation();
  const { scheduleNextExercise } = useNextExercise();
  const { showToast } = useToastHook();
  const [loading, setLoading] = useState(false);

  const onPressPlan = async () => {
    if (loading) return;

    setLoading(true);
    AnalyticHelper.logEvent('home_plan_next_exercise_clicked', {});

    const result = await scheduleNextExercise();

    if (!result) {
      showToast(i18n.t('home.plan_next_exercise.error'), 'error');
    }

    setLoading(false);
  };

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
        {i18n.t('home.plan_next_exercise.label')}
      </Text>

      <Block flexDirection="row" alignItems="center" marginBottom={12}>
        <Icon name="o:calendar" size={20} color="primary.500" />
        <Text
          size="lg"
          color="neutral.950"
          fontWeight="600"
          marginLeft={8}
          fillInRow
          left
        >
          {i18n.t('home.plan_next_exercise.title')}
        </Text>
      </Block>

      <Text size="sm" color="neutral.500" marginBottom={20}>
        {i18n.t('home.plan_next_exercise.subtitle')}
      </Text>

      <Button
        fill
        size="lg"
        text={i18n.t('home.plan_next_exercise.cta')}
        rightIcon="o:chevron_right"
        loading={loading}
        disabled={loading}
        onPress={onPressPlan}
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
});
