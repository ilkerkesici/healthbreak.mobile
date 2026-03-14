import { Block, Icon, Text } from 'components/CoreComponents';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const CIRCLE_SIZE = 48;
const ICON_SIZE = 24;

const getGreetingKey = ():
  | 'greeting_morning'
  | 'greeting_noon'
  | 'greeting_evening'
  | 'greeting_night' => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'greeting_morning';
  if (hour >= 12 && hour < 19) return 'greeting_noon';
  if (hour >= 19 && hour < 21) return 'greeting_evening';
  return 'greeting_night';
};

const MOTIVATION_KEYS = Array.from(
  { length: 20 },
  (_, i) => `motivation_${i + 1}` as const,
);

export function HomeHeader() {
  const { i18n } = useTranslation();

  const greetingKey = useMemo(() => getGreetingKey(), []);
  const motivationKey = useMemo(
    () => MOTIVATION_KEYS[Math.floor(Math.random() * MOTIVATION_KEYS.length)],
    [],
  );

  const greeting = i18n.t(`home.header.${greetingKey}`);
  const motivation = i18n.t(`home.header.${motivationKey}`);

  return (
    <Block
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      paddingVertical={16}
    >
      <Block flex={1} marginRight={12}>
        <Text
          variant="title2"
          size="xl"
          color="primary.500"
          fontWeight="600"
          style={styles.greeting}
        >
          {greeting}
        </Text>
        <Text
          variant="text"
          size="sm"
          color="neutral.600"
          style={styles.motivation}
        >
          {motivation}
        </Text>
      </Block>

      <Block
        width={48}
        height={48}
        justifyContent="center"
        alignItems="center"
        backgroundColour="white"
        borderRadius={24}
      >
        <Block
          width={44}
          height={44}
          justifyContent="center"
          alignItems="center"
          backgroundColour="primary.150"
          borderRadius={22}
        >
          <Icon
            name="o:user"
            size={ICON_SIZE}
            color="primary.500"
            strokeWidth={2}
          />
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 4,
  },
  motivation: {
    lineHeight: 20,
  },
  iconCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
