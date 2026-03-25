import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';

export const DUMMY_VIDEO_URI =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

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
          style={styles.fill}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
