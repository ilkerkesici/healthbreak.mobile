import { Block, Text } from 'components/CoreComponents';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingQuestion } from '../Onboarding.types';
import { OnboardingOptionItem } from './OnboardingOptionItem';

interface OnboardingQuestionSlideProps {
  question: OnboardingQuestion;
  selectedIds: string[];
  onToggleOption: (optionId: string) => void;
  /** 3. soru grid, diğerleri list */
  useGridLayout?: boolean;
}

export function OnboardingQuestionSlide({
  question,
  selectedIds,
  onToggleOption,
  useGridLayout = false,
}: OnboardingQuestionSlideProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {question.stepLabel ? (
        <Text
          variant="subhead"
          size="sm"
          color="neutral.600"
          style={styles.stepLabel}
        >
          {question.stepLabel}
        </Text>
      ) : null}
      <Text
        variant="title2"
        size="xl"
        color="neutral.950"
        style={styles.question}
      >
        {question.question}
      </Text>
      <Text
        variant="text"
        size="md"
        color="neutral.600"
        style={styles.subtitle}
      >
        {question.subtitle}
      </Text>

      {useGridLayout ? (
        <View style={styles.grid}>
          {question.options.map(opt => (
            <OnboardingOptionItem
              key={opt.id}
              option={opt}
              selected={selectedIds.includes(opt.id)}
              onToggle={() => onToggleOption(opt.id)}
              layout="grid"
            />
          ))}
        </View>
      ) : (
        <View style={styles.options}>
          {question.options.map(opt => (
            <OnboardingOptionItem
              key={opt.id}
              option={opt}
              selected={selectedIds.includes(opt.id)}
              onToggle={() => onToggleOption(opt.id)}
              layout="list"
            />
          ))}
        </View>
      )}

      {question.footerText ? (
        <Text
          variant="footnote"
          size="lg"
          color="neutral.600"
          style={styles.footer}
        >
          {question.footerText}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  stepLabel: {
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  question: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 20,
  },
  options: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  footer: {
    marginTop: 8,
  },
});
