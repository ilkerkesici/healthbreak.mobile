import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';
import { VIDEO_BOTTOM_MARGIN } from '../constants';

const height = Dimensions.get('window').height;
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
        />
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
});
