import {Block, Icon} from 'components/CoreComponents';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Display from 'components/CoreComponents/Display';

interface Props {
  placeholder?: string;
  autoFocus?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  autoFocus,
  value,
  onChangeText,
  editable = true,
}) => {
  const inputRef = useRef<TextInput>();
  const [placeHolderColor, textColor] = useThemeColor([
    'neutral.600',
    'neutral.950',
  ]);

  const onPressClear = useCallback(() => {
    onChangeText?.('');
    inputRef.current?.clear();
  }, [onChangeText]);

  return (
    <Block
      fill
      height={48}
      justifyContent="center"
      paddingHorizontal={14}
      paddingVertical={10}
      backgroundColour="custom-wb"
      borderRadius={4}
      borderWidth={1}
      borderColor="neutral.300"
      flexDirection="row">
      <Icon marginRight={4} name="o:search-normal" color="neutral.600" />
      <TextInput
        ref={inputRef as any}
        style={[styles.textInput, {color: textColor}]}
        placeholderTextColor={placeHolderColor}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
      />
      <Display show={value}>
        <Block
          style={styles.crossButton}
          backgroundColour="neutral.300"
          marginLeft={8}
          onPress={onPressClear}>
          <Icon name="o:x-mark" size={12} color="neutral.600" />
        </Block>
      </Display>
    </Block>
  );
};
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
    fontSize: 18,
  },
  crossButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SearchBar);
