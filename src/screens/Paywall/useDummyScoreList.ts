import useTranslation from 'helpers/hooks/useTranslation';
import { useMemo } from 'react';
import { useAppInitStore } from 'store/useAppInitStore';

export const useDummyScoreList = () => {
  const { i18n } = useTranslation();
  const profile = useAppInitStore(state => state.profile);

  const scoresData = useMemo(() => {
    if (profile?.gender === 'f') {
      return [
        {
          text: i18n.t('home.analyse_results.overall'),
          value: 68,
          index: 2,
          key: 'overall',
        },
        {
          text: i18n.t('home.analyse_results.potential'),
          value: 91,
          index: 3,
          key: 'potential',
        },
        {
          text: i18n.t('home.analyse_results.femininity'),
          value: 70,
          index: 4,
          key: 'femininity',
        },
        {
          text: i18n.t('home.analyse_results.skin_quality'),
          value: 69,
          index: 5,
          key: 'skin_quality',
        },
        {
          text: i18n.t('home.analyse_results.jawline_softness'),
          value: 76,
          index: 6,
          key: 'jawline_softness',
        },
        {
          text: i18n.t('home.analyse_results.cheekbones_harmony'),
          value: 81,
          index: 7,
          key: 'cheekbones_harmony',
        },
      ];
    }
    return [
      {
        text: i18n.t('home.analyse_results.overall'),
        value: 68,
        index: 2,
        key: 'overall',
      },
      {
        text: i18n.t('home.analyse_results.potential'),
        value: 91,
        index: 3,
        key: 'potential',
      },
      {
        text: i18n.t('home.analyse_results.masculinity'),
        value: 70,
        index: 4,
        key: 'masculinity',
      },
      {
        text: i18n.t('home.analyse_results.skin_quality'),
        value: 69,
        index: 5,
        key: 'skin_quality',
      },
      {
        text: i18n.t('home.analyse_results.jawline_definition'),
        value: 76,
        index: 6,
        key: 'jawline_definition',
      },
      {
        text: i18n.t('home.analyse_results.cheekbones_prominence'),
        value: 81,
        index: 7,
        key: 'cheekbones_prominence',
      },
    ];
  }, [i18n, profile?.gender]);

  return { scoresData };
};
