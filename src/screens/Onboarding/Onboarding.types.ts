import { IconType } from 'components/CoreComponents/Icon/Icon.type';

export interface OnboardingOption {
  id: string;
  label: string;
  icon?: IconType;
}

export interface OnboardingQuestion {
  id: string;
  stepLabel: string;
  question: string;
  subtitle: string;
  options: OnboardingOption[];
  footerText: string;
}

/** questionId -> seçili option id'leri */
export type OnboardingAnswers = Record<string, string[]>;
