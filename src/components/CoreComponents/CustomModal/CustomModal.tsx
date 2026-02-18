import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {designPropToStyle} from 'helpers/utils/design.utils';
import React, {memo} from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PaddingDesignProps, SizeDesignProps} from 'types/design';
import Modal from 'react-native-modal';
import styles from './CustomModal.styles';
import Text from '../Text/Text';

export interface CustomModalProps extends PaddingDesignProps, SizeDesignProps {
  isVisible?: boolean;
  onClose?: () => void;
  onModalHide?: () => void;
  onModalShow?: () => void;
  children?: React.ReactNode;
  title?: string;
  swipeable?: boolean;
  propagateSwipe?: boolean;
  testID?: string;
  containerStyle?: ViewStyle;
  avoidKeyboard?: boolean;
  subtitle?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  avoidKeyboard = true,
  isVisible,
  containerStyle,
  title,
  children,
  propagateSwipe = true,
  subtitle,
  onClose,
  ...rest
}) => {
  let [backgroundColor, gestureColor, modalBgColor] = useThemeColor([
    'custom-wb',
    'custom-wn',
    'neutral.900',
  ]);

  const designToProps = designPropToStyle(rest);
  const safeAreaInsets = useSafeAreaInsets();
  const containerPadding = {
    paddingBottom: safeAreaInsets?.bottom,
    ...designToProps,
  };
  const modalStyle: ViewStyle = {
    justifyContent: 'flex-end',
    marginTop: safeAreaInsets?.top,
    marginLeft: safeAreaInsets?.left,
    marginRight: safeAreaInsets?.right,
    marginBottom: 0,
  };

  const onCloseModal = () => {
    onClose?.();
  };

  return (
    <Modal
      backdropColor={`${modalBgColor}`}
      avoidKeyboard={avoidKeyboard}
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      backdropOpacity={0.3}
      onModalHide={onCloseModal}
      onSwipeComplete={onCloseModal}
      propagateSwipe={propagateSwipe}
      swipeDirection="down"
      style={modalStyle}>
      {propagateSwipe ? (
        <View style={styles.gestureContainer}>
          <View
            style={[{...styles.gestureItem, backgroundColor: gestureColor}]}
          />
        </View>
      ) : null}
      <View
        style={[
          {...styles.container, backgroundColor},
          containerPadding,
          containerStyle,
        ]}>
        {title ? (
          <View style={styles.headerContainer}>
            <Text
              variant="headline"
              size="sm"
              fontWeight={'600'}
              colour={'neutral.900'}>
              {title}
            </Text>
          </View>
        ) : null}
        {subtitle ? (
          <Text variant="caption1" size="lg" colour="neutral.800" margin={20}>
            {subtitle}
          </Text>
        ) : null}
        {children}
      </View>
    </Modal>
  );
};

export default memo(CustomModal);
