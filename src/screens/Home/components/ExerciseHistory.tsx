import { Block, Icon, Text } from 'components/CoreComponents';
import type { IconType } from 'components/CoreComponents/Icon/Icon.type';
import useTranslation from 'helpers/hooks/useTranslation';
import useExerciseHistory from 'helpers/hooks/useExerciseHistoryHook';
import { DateTime } from 'luxon';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExerciseTarget } from 'types/models';

const CARD_BORDER = '#0566500D';
const CARD_BG = 'rgba(255,255,255,0.9)';
const ICON_BG = '#05665014';

/** Onboarding’teki alan ikonlarına göre target -> ikon eşlemesi */
const TARGET_ICON_MAP: Partial<Record<ExerciseTarget, IconType>> = {
  [ExerciseTarget.NECK]: 'o:neck',
  [ExerciseTarget.SHOULDER]: 'o:upper_back',
  [ExerciseTarget.ARM]: 'o:arrow_path',
  [ExerciseTarget.WRIST]: 'o:wrist',
  [ExerciseTarget.BACK]: 'o:lower_back',
  [ExerciseTarget.LEG]: 'o:arrows_up_down',
};

const DEFAULT_ICON: IconType = 'o:arrow_path';

function getIconForTarget(target: string | null): IconType {
  if (!target) return DEFAULT_ICON;
  return TARGET_ICON_MAP[target as ExerciseTarget] ?? DEFAULT_ICON;
}

/** completed_at UTC ISO; "Bugün, 14:20" / "Dün, 15:00" veya tarih döner. time değeri i18n interpolasyonu için t() ile verilmeli. */
function formatCompletedAt(
  completedAt: string | null,
  t: (key: string, opts?: { time?: string }) => string,
): string {
  if (!completedAt) return '';
  const dt = DateTime.fromISO(completedAt.replace(' ', 'T'), {
    zone: 'utc',
  }).toLocal();
  if (!dt.isValid) return '';
  const time = dt.toFormat('HH:mm');
  const today = DateTime.local().startOf('day');
  const yesterday = today.minus({ days: 1 });
  if (dt >= today) return t('home.exercise_history.today_at', { time });
  if (dt >= yesterday && dt < today)
    return t('home.exercise_history.yesterday_at', { time });
  return dt.toFormat('dd MMM, HH:mm');
}

export function ExerciseHistory() {
  const { history } = useExerciseHistory();
  const { i18n } = useTranslation();

  if (!history?.items?.length) {
    return null;
  }

  return (
    <Block
      marginTop={16}
      padding={16}
      style={[styles.card, { backgroundColor: CARD_BG }]}
    >
      <View style={styles.header}>
        <Text
          variant="text"
          size="md"
          fontWeight="600"
          color="primary.500"
          style={styles.title}
        >
          {i18n.t('home.exercise_history.title')}
        </Text>
        <TouchableOpacity
          hitSlop={12}
          onPress={() => {}}
          style={styles.seeAllWrap}
        >
          <Text
            variant="caption1"
            size="xs"
            color="primary.500/60"
            style={styles.seeAll}
          >
            {i18n.t('home.exercise_history.see_all')}
          </Text>
        </TouchableOpacity>
      </View>

      {history.items.map((item, index) => {
        const targetKey = item.exercise.target as ExerciseTarget | undefined;
        const targetTranslated =
          targetKey && Object.values(ExerciseTarget).includes(targetKey)
            ? i18n.t(`exercise_target.${targetKey}`)
            : item.exercise.target || '';
        const displayName =
          item.exercise.title || targetTranslated || item.exercise.target || '';
        const iconName = getIconForTarget(item.exercise.target || null);
        const timeStr = formatCompletedAt(
          item.schedule.completed_at,
          i18n.t.bind(i18n),
        );

        return (
          <View
            key={item.schedule.id}
            style={[
              styles.row,
              index < history.items.length - 1 && styles.rowBorder,
            ]}
          >
            <View style={styles.iconCircle}>
              <Icon name={iconName} size={22} color="primary.500" />
            </View>
            <Block flex={1} marginLeft={12} justifyContent="center">
              <Text
                variant="text"
                size="sm"
                fontWeight="600"
                color="neutral.950"
                numberOfLines={1}
              >
                {displayName}
              </Text>
              <Text
                variant="caption1"
                size="xs"
                color="neutral.500"
                style={styles.time}
              >
                {timeStr}
              </Text>
            </Block>
            <View style={styles.checkWrap}>
              <Icon name="s:check" size={18} color="primary.500" />
            </View>
          </View>
        );
      })}
    </Block>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    flex: 1,
  },
  seeAllWrap: {
    paddingVertical: 4,
    paddingLeft: 8,
  },
  seeAll: {
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9EAEB',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ICON_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    marginTop: 2,
  },
  checkWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ICON_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
