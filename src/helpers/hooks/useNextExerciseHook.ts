import { useCallback } from 'react';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import { useNextExerciseStore } from 'store/useNextExerciseStore';

export default function useNextExercise() {
  const { nextExercise, setNextExercise } = useNextExerciseStore();

  const getNextExercise = useCallback(async () => {
    const result = await APIEndpointHelper.getNextExercise();
    console.log('nextExercise', result);
    if (result) {
      setNextExercise(result);
    }

    return result;
  }, [setNextExercise]);

  return {
    nextExercise,
    getNextExercise,
  };
}
