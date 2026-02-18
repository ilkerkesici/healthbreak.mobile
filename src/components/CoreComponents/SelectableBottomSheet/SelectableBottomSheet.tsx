import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import SelectableListItem from './SelectableListItem';
import TextInput from '../TextInput/TextInput';
import Block from '../Block';
import {ModalBottomSheet} from '../BottomSheet/ModalBottomSheet';
import {BottomSheetView} from '../BottomSheet';
import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import ButtonBasic from '../ButtonBasic/ButtonBasic';
import Text from '../Text/Text';
import useTranslation from 'helpers/hooks/useTranslation';

export interface ISelectableItem {
  key: string;
  description?: string;
  value: string;
}

interface Props {
  onClose?: () => void;
  onSelect?: (data: ISelectableItem) => void;
  title?: string;
  data: ISelectableItem[];
  visible?: boolean;
  selected?: ISelectableItem | ISelectableItem[] | null;
  selectedItems?: ISelectableItem[];
  multiSelect?: boolean;
  search?: boolean;
  height?: number;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    alignSelf: 'stretch',
    paddingBottom: 0,
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
  },
  flexStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

function SelectableBottomSheet({
  title,
  data,
  visible,
  selected,
  search,
  onClose,
  onSelect,
  height = 470,
}: Props) {
  const [searchText, setSearchText] = useState('');
  const [bgColor] = useThemeColor(['neutral.200']);
  const {i18n} = useTranslation();

  const isSelected = useCallback(
    (item: ISelectableItem) => {
      if (!selected) {
        return false;
      }
      if (Array.isArray(selected)) {
        for (let i = 0; i < selected.length; i++) {
          if (selected[i].key === item.key) {
            return true;
          }
        }
      } else if (!Array.isArray(selected) && selected.key === item.key) {
        return true;
      }
      return false;
    },
    [selected],
  );
  const searchedData =
    search && searchText
      ? data.filter(item =>
          item.value
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()),
        )
      : data;

  const renderItems = useCallback(
    ({item}: {item: ISelectableItem}) => {
      const onPress = () => {
        onSelect && onSelect(item);
      };

      const isLastItem = item.key === searchedData[searchedData.length - 1].key;

      return (
        <>
          <SelectableListItem
            selected={isSelected(item)}
            onPress={onPress}
            text={item.value}
            description={item.description}
          />
          {!isLastItem ? (
            <Block height={1} backgroundColour="neutral.300" fill />
          ) : null}
        </>
      );
    },
    [isSelected, onSelect, searchedData],
  );

  const renderHeader = useCallback(() => {
    return (
      <>
        {search ? (
          <>
            <Block marginTop={10} />
            <TextInput
              placeholder={i18n.t('home.search')}
              onChangeText={setSearchText}
              value={searchText}
              marginHorizontal={20}
            />
            <Block marginTop={20} />
          </>
        ) : null}
      </>
    );
  }, [search, searchText, i18n]);

  const renderFooter = useCallback(() => {
    return <Block marginTop={30} />;
  }, []);

  return (
    <ModalBottomSheet isVisible={visible} onClose={onClose}>
      <BottomSheetView
        style={[styles.container, {height, backgroundColor: bgColor}]}>
        <Text
          fill
          center
          size="lg"
          fontWeight="500"
          marginBottom={16}
          marginTop={-16}>
          {title}
        </Text>
        <Block
          fill
          flex={1}
          backgroundColour="bw-white"
          borderWidth={1}
          borderColor="neutral.400"
          borderRadius={4}>
          <FlatList
            data={searchedData}
            renderItem={renderItems}
            keyExtractor={keyExtractor}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            style={styles.flexStyle}
          />
        </Block>
        <ButtonBasic
          marginTop={24}
          marginBottom={30}
          fill
          text={i18n.t('common.continue')}
          onPress={onClose}
        />
      </BottomSheetView>
    </ModalBottomSheet>
  );
}

const keyExtractor = (item: {key: string; value: string}) => item.value;

export default memo(SelectableBottomSheet);
