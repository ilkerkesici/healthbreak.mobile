import React from 'react';
import { Block, Icon, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';

const items = [
  {
    icon: 'o:limitless' as const,
    titleKey: 'paywall.new.benefits.unlimited_exercises.title',
    subtitleKey: 'paywall.new.benefits.unlimited_exercises.subtitle',
  },
  {
    icon: 'o:bell' as const,
    titleKey: 'paywall.new.benefits.personalized_reminders.title',
    subtitleKey: 'paywall.new.benefits.personalized_reminders.subtitle',
  },
  {
    icon: 'o:stats' as const,
    titleKey: 'paywall.new.benefits.progress_insights.title',
    subtitleKey: 'paywall.new.benefits.progress_insights.subtitle',
  },
];

export default function Benefits() {
  const { i18n } = useTranslation();

  return (
    <Block marginTop={16} fill alignItems="flex-start">
      {items.map(item => (
        <Block key={item.titleKey} flexDirection="row" alignItems="center" marginBottom={10}>
          <Icon name={item.icon} size={22} color="primary.500" />
          <Block marginLeft={12}>
            <Text size="md" color="neutral.950">
              {i18n.t(item.titleKey)}
            </Text>
            <Text size="sm" color="neutral.500">
              {i18n.t(item.subtitleKey)}
            </Text>
          </Block>
        </Block>
      ))}
    </Block>
  );
}
