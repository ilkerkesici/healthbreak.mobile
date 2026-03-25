import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from 'containers/Router/Router.type';
import { BackgroundVideo, type BackgroundVideoHandle } from './components/BackgroundVideo';
import { Bottom } from './components/Bottom';
import useTranslation from 'helpers/hooks/useTranslation';
import { ExerciseHeader } from './components/ExerciseHeader';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import useNextExercise from 'helpers/hooks/useNextExerciseHook';

type ExerciseRoute = RouteProp<RootStackParamList, 'EXERCISE'>;

export default function Exercise() {
  const route = useRoute<ExerciseRoute>();
  const navigation = useNavigation<RootNavigation>();
  const { exercise } = route.params;
  const videoRef = useRef<BackgroundVideoHandle | null>(null);
  const { i18n } = useTranslation();
  const [muted, setMuted] = useState(false);
  const volume = useMemo(() => (muted ? 0 : 0.5), [muted]);
  const { getNextExercise } = useNextExercise();

  const onComplete = useCallback(async () => {
    videoRef.current?.pause();
    try {
      await APIEndpointHelper.completeExercise(exercise.schedule.id);
    } finally {
      await getNextExercise();
      navigation.navigate('FEEDBACK', {
        exercise,
        exercise_id: exercise.exercise.id,
      });
    }
  }, [exercise, getNextExercise, navigation]);

  return (
    <ScreenContainer bgColor="bg-2">
      <View style={styles.stack}>
        <View style={styles.videoLayer}>
          <BackgroundVideo ref={videoRef} volume={volume} />
        </View>
        <View style={styles.contentLayer}>
          <ExerciseHeader
            muted={muted}
            onToggleMute={() => setMuted(v => !v)}
          />

          <Bottom
            title={exercise?.exercise?.title ?? i18n.t('exercise.default_title')}
            description={exercise?.exercise?.description}
            durationSeconds={60}
            onComplete={onComplete}
            onStart={() => videoRef.current?.restart()}
            onPlay={() => videoRef.current?.play()}
            onPause={() => videoRef.current?.pause()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  videoLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  contentLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});
