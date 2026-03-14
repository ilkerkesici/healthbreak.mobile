import { NextExerciseResponse } from 'types/models';

import { create } from 'zustand';

export interface NextExerciseStoreType {
  nextExercise: NextExerciseResponse | undefined;
  setNextExercise: (data?: NextExerciseResponse) => void;
}

export const useNextExerciseStore = create<NextExerciseStoreType>(set => ({
  nextExercise: undefined,
  setNextExercise: (data?: NextExerciseResponse) => set({ nextExercise: data }),
}));
