import { useMemo } from 'react';
import useTranslation from 'helpers/hooks/useTranslation';
import type { IconType } from 'components/CoreComponents/Icon/Icon.type';
import type { OnboardingQuestion } from './Onboarding.types';

/** Sadece id ve icon; metinler i18n'den gelir */
const ONBOARDING_CONFIG: {
  id: string;
  options: { id: string; icon?: IconType }[];
}[] = [
  {
    id: 'habits',
    options: [
      { id: '2-4', icon: 'o:clock' },
      { id: '4-6', icon: 'o:clock' },
      { id: '6-8', icon: 'o:briefcase' },
      { id: '8+', icon: 'o:briefcase' },
    ],
  },
  {
    id: 'sitting',
    options: [
      { id: 'under-30', icon: 'o:clock' },
      { id: '30-60', icon: 'o:clock' },
      { id: '1-2', icon: 'o:clock' },
      { id: '2+', icon: 'o:clock' },
    ],
  },
  {
    id: 'areas',
    options: [
      { id: 'eyes', icon: 'o:eye' },
      { id: 'neck', icon: 'o:user' },
      { id: 'lower-back', icon: 'o:user' },
      { id: 'upper-back', icon: 'o:user' },
      { id: 'wrist', icon: 'o:user' },
      { id: 'none', icon: 's:check' },
    ],
  },
  {
    id: 'work_hours',
    options: [
      { id: 'morning', icon: 'o:moon' },
      { id: 'noon', icon: 'o:clock' },
      { id: 'evening', icon: 'o:moon' },
    ],
  },
];

export function useOnboardingQuestions(): {
  questions: OnboardingQuestion[];
  nextLabel: string;
} {
  const { i18n } = useTranslation();

  const questions = useMemo(() => {
    return ONBOARDING_CONFIG.map(config => {
      const baseKey = `onboarding_questions.${config.id}`;
      const options = config.options.map(opt => ({
        id: opt.id,
        label: i18n.t(`${baseKey}.options.${opt.id}`),
        icon: opt.icon,
      }));
      return {
        id: config.id,
        stepLabel: i18n.t(`${baseKey}.stepLabel`),
        question: i18n.t(`${baseKey}.question`),
        subtitle: i18n.t(`${baseKey}.subtitle`),
        footerText: i18n.t(`${baseKey}.footerText`),
        options,
      };
    });
  }, [i18n]); // i18n-js: locale değişince çeviriler güncellenir

  const nextLabel = i18n.t('onboarding_next');

  return { questions, nextLabel };
}
