import { useCallback, useEffect, useState } from 'react';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import type { ExerciseHistoryResponse } from 'types/models';

export default function useExerciseHistory() {
  const [history, setHistory] = useState<ExerciseHistoryResponse | null>(null);

  const getExerciseHistory = useCallback(async () => {
    const result = await APIEndpointHelper.getExerciseHistory();
    console.log('exercise history', result);
    if (result) {
      setHistory(result);
    }
    return result;
  }, []);

  useEffect(() => {
    getExerciseHistory();
  }, [getExerciseHistory]);

  return {
    history,
    getExerciseHistory,
  };
}
