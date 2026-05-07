import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';
import { Skeleton } from 'components/CoreComponents/Skeleton';
import { VIDEO_BOTTOM_MARGIN } from '../constants';

const width = Dimensions.get('window').width;
const VIDEO_HEIGHT = width * (16 / 9);

export const DUMMY_VIDEO_URI =
  'https://helpimal-images.s3.eu-central-1.amazonaws.com/dev/hb_v1.mp4';

export type BackgroundVideoHandle = {
  play: () => void;
  pause: () => void;
  restart: () => void;
};

type Props = {
  volume: number;
  uri?: string;
};

export const BackgroundVideo = forwardRef<BackgroundVideoHandle, Props>(
  ({ volume, uri = DUMMY_VIDEO_URI }, ref) => {
    const videoRef = useRef<VideoRef | null>(null);
    const [paused, setPaused] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      setIsReady(false);
    }, [uri]);

    const play = useCallback(() => setPaused(false), []);
    const pause = useCallback(() => setPaused(true), []);
    const restart = useCallback(() => {
      videoRef.current?.seek(0);
      setPaused(false);
    }, []);

    useImperativeHandle(ref, () => ({ play, pause, restart }), [
      pause,
      play,
      restart,
    ]);

    return (
      <View style={styles.fill} pointerEvents="none">
        <Video
          ref={videoRef}
          source={{ uri }}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={paused}
          volume={volume}
          muted={volume === 0}
          onReadyForDisplay={() => setIsReady(true)}
        />
        {!isReady && (
          <View style={styles.skeletonOverlay} pointerEvents="none">
            <Skeleton
              width={width}
              height={VIDEO_HEIGHT}
              backgroundColor="neutral.400"
            />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  fill: {
    position: 'absolute',
    top: -VIDEO_BOTTOM_MARGIN,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    width: width,
    height: VIDEO_HEIGHT,
  },
  skeletonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: VIDEO_HEIGHT,
  },
});
