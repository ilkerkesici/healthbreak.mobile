import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const BOTTOM_HEIGHT = height * 0.3;
const VIDEO_AREA_HEIGHT = height - BOTTOM_HEIGHT;

export const VIDEO_HEIGHT = width * (16 / 9);
export const VIDEO_WIDTH = width;

const MAX_DIFF = 50;
const calculateVideoBottomMargin = () => {
  if (
    VIDEO_HEIGHT > VIDEO_AREA_HEIGHT &&
    VIDEO_HEIGHT - VIDEO_AREA_HEIGHT > MAX_DIFF
  ) {
    return VIDEO_HEIGHT - VIDEO_AREA_HEIGHT - MAX_DIFF;
  }
  return 0;
};

export const VIDEO_BOTTOM_MARGIN = calculateVideoBottomMargin();
