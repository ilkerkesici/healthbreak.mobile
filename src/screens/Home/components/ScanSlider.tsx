import { Block } from 'components/CoreComponents';

import {
  DEFAULT_SCREEN_HORIZONTAL_PADDING,
  TABBAR_HEIGHT,
} from 'constants/design';
import React, { memo, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useProcessHook } from 'helpers/hooks/useProcessHook';
import { ScanFace } from './ScanFace';
import Display from 'components/CoreComponents/Display';
import { ScannedFace } from './ScannedFace';
import { RequestImageResponse } from 'types/models';
import { DateTime } from 'luxon';

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width - 2 * DEFAULT_SCREEN_HORIZONTAL_PADDING;
const CARD_HEIGHT = height - TABBAR_HEIGHT;

const ScanSlider = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { bottom } = useSafeAreaInsets();
  const heightWithBottom = CARD_HEIGHT - (bottom || 12) - 240;

  const { requestImages } = useProcessHook();

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const data = useMemo(() => {
    if (!requestImages) {
      return [{ type: 'scan_face' }];
    }
    const mappedData = requestImages?.map(i => ({ type: 'request', data: i }));
    return [...mappedData, { type: 'scan_face' }];
  }, [requestImages]);

  const isExistLastWeek = data
    .filter(i => i.type === 'request')
    .find(
      (i: any) =>
        i.data?.requests?.[0]?.request_created_at &&
        DateTime.fromSQL(i.data.requests[0].request_created_at) >
          DateTime.now().minus({ week: 1 }),
    );
  console.log('Is Exist Last Week : ', isExistLastWeek);

  return (
    <Block fill>
      <Display show={data.length > 1}>
        <Block fill>
          <Pagination.Basic
            progress={progress}
            data={data}
            activeDotStyle={styles.activeDot}
            dotStyle={styles.dot}
            containerStyle={styles.container}
            onPress={onPressPagination}
          />
        </Block>
      </Display>

      <Carousel
        ref={ref}
        width={width}
        height={CARD_HEIGHT - 70}
        data={data}
        onProgressChange={progress}
        loop={false}
        renderItem={({ item }) => (
          <Block width={width} height={heightWithBottom}>
            <Display show={item.type === 'scan_face'}>
              <ScanFace
                height={heightWithBottom}
                width={CARD_WIDTH}
                isExistLastWeek={isExistLastWeek}
              />
            </Display>
            <Display show={item.type === 'request'}>
              <ScannedFace
                height={heightWithBottom}
                width={CARD_WIDTH}
                requestImage={item.data as RequestImageResponse}
              />
            </Display>
          </Block>
        )}
      />
    </Block>
  );
};

export default memo(ScanSlider);

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 50,
  },
  container: { gap: 5, marginTop: 0 },
});
