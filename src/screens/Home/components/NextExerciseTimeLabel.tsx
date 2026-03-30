import React, { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import useTranslation from 'helpers/hooks/useTranslation';

type Props = {
  dateStr: string | null;
};

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

export function NextExerciseTimeLabel({ dateStr }: Props) {
  const { i18n } = useTranslation();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(prev => prev + 1);
    }, 20000);

    return () => clearInterval(id);
  }, []);

  const timeLabel = useMemo(() => {
    // tick dependency forces recalculation every 20 seconds
    void tick;
    const minutesUntil = getMinutesUntil(dateStr);
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
  }, [dateStr, i18n, i18n.locale, tick]);

  return <>{timeLabel}</>;
}

