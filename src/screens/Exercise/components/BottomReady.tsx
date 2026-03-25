import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Button, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';

type Props = {
  title: string;
  description?: string | null;
  durationLabel: string;
  onPressStart: () => void;
};

export function BottomReady({
  title,
  description,
  durationLabel,
  onPressStart,
}: Props) {
  const { i18n } = useTranslation();
  return (
    <Block
      paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      paddingTop={18}
      paddingBottom={18}
      backgroundColour="white"
      style={styles.container}
    >
      <Block
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text size="lg" fontWeight="700" color="primary.500">
          {title}
        </Text>

        <Block
          paddingHorizontal={10}
          paddingVertical={6}
          backgroundColour="primary.50"
          style={styles.pill}
        >
          <Text size="xs" fontWeight="600" color="primary.500">
            {durationLabel}
          </Text>
        </Block>
      </Block>

      {!!description && (
        <Text marginTop={8} size="sm" color="neutral.600">
          {description}
        </Text>
      )}

      <Block flex={1} justifyContent="flex-end" marginTop={16}>
        <Button
          size="lg"
          text={i18n.t('exercise.ready.start')}
          rightIcon="o:play"
          onPress={onPressStart}
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  pill: {
    borderRadius: 999,
  },
});
