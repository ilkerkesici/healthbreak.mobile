import { useCallback, useEffect, useState } from 'react';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import type { WeeklyRhythmResponse } from 'types/models';

export default function useWeeklyRhythm() {
  const [weeklyRhythm, setWeeklyRhythm] =
    useState<WeeklyRhythmResponse | null>(null);

  const getWeeklyRhythm = useCallback(async () => {
    const result = await APIEndpointHelper.getWeeklyRhythm();
    if (result) {
      setWeeklyRhythm(result);
    }
    return result;
  }, []);

  useEffect(() => {
    getWeeklyRhythm();
  }, [getWeeklyRhythm]);

  return {
    weeklyRhythm,
    getWeeklyRhythm,
  };
}
