import React, { useMemo } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { Block, Button, Text } from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import { useThemeColor } from 'helpers/hooks/useThemeColor';
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
  const [boldColor] = useThemeColor(['neutral.950']);

  const descriptionNodes = useMemo(() => {
    if (!description) return null;
    const parts = description.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <RNText
            key={`b-${index}`}
            style={[styles.bold, { color: boldColor }]}
          >
            {part.slice(2, -2)}
          </RNText>
        );
      }
      return part;
    });
  }, [description, boldColor]);
  return (
    <Block
      paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
      paddingTop={4}
      paddingBottom={18}
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

      {!!descriptionNodes && (
        <Text marginTop={8} size="sm" color="neutral.600">
          {descriptionNodes}
        </Text>
      )}

      <Block marginTop={16}>
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
  pill: {
    borderRadius: 999,
  },
  bold: {
    fontWeight: '700',
  },
});
