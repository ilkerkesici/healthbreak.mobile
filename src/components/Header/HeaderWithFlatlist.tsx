import React, {useCallback, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {Header} from './Header';
import {HeaderProps} from './Header.type';

interface Props {
  headerProps?: HeaderProps;
  renderItem?: ({item, index}: {item: any; index: number}) => JSX.Element;
  keyExtractor?: (item: any, index: number) => string;
  data?: any[];
  extraFlatlistProps?: Partial<FlatListProps<any>>;
}

export default function HeaderWithFlatList({
  headerProps,
  renderItem,
  keyExtractor,
  data,
  extraFlatlistProps,
}: Props) {
  const [showHeaderShadow, setShowHeaderShadow] = useState(false);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.y > 0 && !showHeaderShadow) {
        setShowHeaderShadow(true);
      } else if (e.nativeEvent.contentOffset.y <= 0 && showHeaderShadow) {
        setShowHeaderShadow(false);
      }
    },
    [showHeaderShadow, setShowHeaderShadow],
  );
  return (
    <View style={styles.container}>
      <Header showHeaderShadow={showHeaderShadow} {...headerProps} />
      <FlatList
        style={styles.container}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
        // stickyHeaderIndices={[0]}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={() => null}
        {...extraFlatlistProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
