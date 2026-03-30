import { useNavigation } from '@react-navigation/native';
import { Block } from 'components/CoreComponents';
import { RootNavigation } from 'containers/Router/Router.type';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

import {
  OnboardingHeader,
  OnboardingQuestionSlide,
  OnboardingStickyFooter,
} from './components';
import type { OnboardingAnswers } from './Onboarding.types';
import { useOnboardingQuestions } from './useOnboardingQuestions';
import useProfileHook from 'helpers/hooks/useProfileHook';
import useNextExercise from 'helpers/hooks/useNextExerciseHook';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';

const { width, height } = Dimensions.get('window');

/** Mixpanel’de soru bazlı filtre / breakdown için düz property’ler + tam payload (JSON). */
function buildOnboardingCompleteEventProps(
  items: { questionId: string; selectedLabels: string[] }[],
) {
  const props: Record<string, string | number> = {
    onboarding_question_count: items.length,
    onboarding_payload_json: JSON.stringify(items),
  };
  for (const item of items) {
    const safeId = item.questionId.replace(/[^a-zA-Z0-9_]/g, '_');
    props[`onboarding_q_${safeId}`] = item.selectedLabels.join(',');
  }
  return props;
}

const Onboarding = () => {
  const navigation = useNavigation<RootNavigation>();
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const { questions, nextLabel } = useOnboardingQuestions();
  const { setProfile } = useProfileHook();
  const { getNextExercise } = useNextExercise();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const selectedIds = currentQuestion ? answers[currentQuestion.id] ?? [] : [];
  const hasSelection = selectedIds.length > 0;
  const isLastSlide = currentIndex === total - 1;

  useEffect(() => {
    AnalyticHelper.logEvent('onboarding_started');
  }, [questions]);

  const toggleOption = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? [];
      const next = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: next };
    });
  }, []);

  const handleSubmit = useCallback(
    async (finalAnswers: OnboardingAnswers) => {
      setLoading(true);
      const payload = questions.map(q => ({
        questionId: q.id,
        selectedLabels: finalAnswers[q.id] ?? [],
      }));

      try {
        await setProfile(payload);
        await getNextExercise();
        AnalyticHelper.logEvent(
          'onboarding_complete',
          buildOnboardingCompleteEventProps(payload),
        );
        navigation.navigate('NOTIF_PERMIT');
        // navigation.navigate('ONBOARDING_PROFILE'); // veya sonraki ekran
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    },
    [questions, setProfile, navigation, getNextExercise],
  );

  const goNext = useCallback(() => {
    if (!hasSelection) return;
    if (isLastSlide) {
      handleSubmit(answers);
      return;
    }
    carouselRef.current?.scrollTo({ count: 1, animated: true });
  }, [hasSelection, isLastSlide, answers, handleSubmit]);

  const onBack = useCallback(() => {
    if (currentIndex === 0) {
      navigation.goBack();
      return;
    }
    carouselRef.current?.scrollTo({ count: -1, animated: true });
  }, [currentIndex, navigation]);

  const onSnapToItem = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <ScreenContainer safeAreaTop safeAreaBottom={false} backgroundColor="bg-1">
      <View style={styles.container}>
        <OnboardingHeader
          currentIndex={currentIndex}
          total={total}
          progress={(currentIndex + 1) / total}
          onBack={onBack}
        />

        <Block flex={1} style={styles.carouselWrap}>
          <Carousel
            ref={carouselRef}
            width={width}
            height={height - 180}
            data={questions}
            onProgressChange={progress}
            onSnapToItem={onSnapToItem}
            loop={false}
            enabled={hasSelection}
            scrollAnimationDuration={300}
            renderItem={({ item }) => (
              <OnboardingQuestionSlide
                question={item}
                selectedIds={answers[item.id] ?? []}
                onToggleOption={optionId => toggleOption(item.id, optionId)}
                useGridLayout={item.id === 'areas'}
              />
            )}
          />
        </Block>

        <OnboardingStickyFooter
          label={nextLabel}
          disabled={!hasSelection}
          onPress={goNext}
          loading={loading}
        />
      </View>
    </ScreenContainer>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2329',
  },
  carouselWrap: {
    overflow: 'hidden',
  },
});
