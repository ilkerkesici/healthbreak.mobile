import React from 'react';
import {Block, Text} from 'components/CoreComponents';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'components/CoreComponents/Icon';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import Display from '../Display';

interface Props {
  text: string;
  description?: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function SelectableListItem({
  selected,
  text,
  description,
  onPress,
}: Props) {
  const [selectedBackground] = useThemeColor(['neutral.100']);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        selected ? {backgroundColor: selectedBackground} : undefined,
      ]}>
      <Block fillInRow>
        <Text
          left
          fill
          fontWeight="500"
          style={[styles.text, selected ? styles.textSelected : undefined]}>
          {text}
        </Text>
        <Display show={description}>
          <Text
            fill
            left
            marginTop={4}
            variant="caption1"
            size="xs"
            color={selected ? 'green.700' : 'neutral.800'}>
            {description}
          </Text>
        </Display>
      </Block>
      {selected ? (
        <Block
          width={20}
          height={20}
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          backgroundColour="green.600">
          <Icon strokeWidth={2} name={'o:check'} color="white" size={12} />
        </Block>
      ) : (
        <Block
          width={20}
          height={20}
          borderWidth={1}
          borderRadius={10}
          borderColor="neutral.400"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingVertical: 12,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  textSelected: {},
});
