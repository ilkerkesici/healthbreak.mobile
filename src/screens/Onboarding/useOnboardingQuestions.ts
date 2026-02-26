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
      { id: '2-4', icon: 'o:pie_quarter' },
      { id: '4-6', icon: 'o:pie_half' },
      { id: '6-8', icon: 'o:pie_three_quarter' },
      { id: '8+', icon: 'o:pie_full' },
    ],
  },
  {
    id: 'sitting',
    options: [
      { id: 'under-30', icon: 'o:pie_quarter' },
      { id: '30-60', icon: 'o:pie_half' },
      { id: '1-2', icon: 'o:pie_three_quarter' },
      { id: '2+', icon: 'o:pie_full' },
    ],
  },
  {
    id: 'areas',
    options: [
      { id: 'eyes', icon: 'o:eye' },
      { id: 'neck', icon: 'o:neck' },
      { id: 'lower-back', icon: 'o:lower_back' },
      { id: 'upper-back', icon: 'o:upper_back' },
      { id: 'wrist', icon: 'o:wrist' },
      { id: 'none', icon: 's:check' },
    ],
  },
  {
    id: 'work_hours',
    options: [
      { id: 'morning', icon: 'o:sunrise' },
      { id: 'noon', icon: 'o:sun' },
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
