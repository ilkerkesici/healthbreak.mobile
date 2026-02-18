import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';
import {StyleSheet} from 'react-native';

const customModalStyles = StyleSheet.create({
  container: {
    maxHeight: '95%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gestureContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 15,
  },
  gestureItem: {
    width: 61,
    height: 4,
    borderRadius: 2,
  },
  headerContainer: {
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'flex-end',
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
  },
});

export default customModalStyles;
