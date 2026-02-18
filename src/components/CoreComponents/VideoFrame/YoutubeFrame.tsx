import {Block} from 'components/CoreComponents';
import React, {memo, useCallback, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import YoutubePlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';

interface Props {
  url: string;
  videoId?: string;
  autoPlay?: boolean;
}

const YoutubeFrame: React.FC<Props> = ({url, videoId, autoPlay = false}) => {
  const [playing, setPlaying] = useState(autoPlay);

  const {width} = useWindowDimensions();

  const VIDEO_WIDTH = width;
  const VIDEO_HEIGHT = VIDEO_WIDTH * (9 / 16);

  const onStateChange = useCallback((state: PLAYER_STATES) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const domain = videoId ? null : extractDomain(url);

  if ((!domain || domain !== 'www.youtube.com') && !videoId) {
    return <></>;
  }

  const youtubeVideoID = videoId ? videoId : extractYouTubeVideoID(url);

  if (!youtubeVideoID) {
    return <></>;
  }

  return (
    <Block width={VIDEO_WIDTH} height={VIDEO_HEIGHT} marginVertical={24}>
      <YoutubePlayer
        height={VIDEO_HEIGHT}
        play={playing}
        videoId={youtubeVideoID}
        onChangeState={onStateChange}
      />
    </Block>
  );
};

function extractDomain(url: string) {
  const match = url.match(/^https?:\/\/([^/]+)/);
  return match ? match[1] : null;
}

function extractYouTubeVideoID(url: string) {
  try {
    // YouTube URL'lerindeki `v` parametresini almak için regex
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }

    // Eğer URL "youtu.be/XXXX" formatındaysa pathname'den al
    const shortLinkMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    return shortLinkMatch ? shortLinkMatch[1] : null;
  } catch (error) {
    return null;
  }
}

export default memo(YoutubeFrame);
