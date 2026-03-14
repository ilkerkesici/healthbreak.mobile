import { Block, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import useWeeklyRhythm from 'helpers/hooks/useWeeklyRhythmHook';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CARD_BORDER = '#0566500D';
const CARD_BG = 'rgba(255,255,255,0.9)';
const TRACK_COLOR = '#0566501A';
const PROGRESS_COLOR = '#056650';
const SIZE = 64;
const STROKE = 6;
const R = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function WeeklyRhythm() {
  const { weeklyRhythm } = useWeeklyRhythm();
  const { i18n } = useTranslation();

  if (!weeklyRhythm) {
    return null;
  }

  const { daysWithBreaks, totalDays } = weeklyRhythm;
  const progress = totalDays > 0 ? daysWithBreaks / totalDays : 0;
  const strokeDashArray = `${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  return (
    <Block
      marginTop={16}
      padding={16}
      style={[styles.card, { backgroundColor: CARD_BG }]}
    >
      <View style={styles.row}>
        <View style={styles.circleWrap}>
          <Svg width={SIZE} height={SIZE} style={styles.svg}>
            <Circle
              cx={CX}
              cy={CY}
              r={R}
              stroke={TRACK_COLOR}
              strokeWidth={STROKE}
              fill="none"
            />
            <Circle
              cx={CX}
              cy={CY}
              r={R}
              stroke={PROGRESS_COLOR}
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={strokeDashArray}
              strokeLinecap="round"
              transform={`rotate(-90, ${CX}, ${CY})`}
            />
          </Svg>
          <View style={styles.centerLabel}>
            <Text
              variant="text"
              size="sm"
              fontWeight="600"
              style={styles.ratioText}
            >
              {daysWithBreaks}/{totalDays}
            </Text>
          </View>
        </View>
        <Block flex={1} marginLeft={16} justifyContent="center">
          <Text
            variant="text"
            size="md"
            fontWeight="600"
            color="primary.500"
            style={styles.title}
          >
            {i18n.t('home.weekly_rhythm.title')}
          </Text>
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.description}
          >
            {i18n.t('home.weekly_rhythm.days_description', {
              count: daysWithBreaks,
            })}
          </Text>
          <Text
            variant="caption1"
            size="xs"
            color="neutral.500"
            style={styles.encouragement}
          >
            {i18n.t('home.weekly_rhythm.encouragement')}
          </Text>
        </Block>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleWrap: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerLabel: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioText: {
    color: PROGRESS_COLOR,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 2,
  },
  encouragement: {},
});
