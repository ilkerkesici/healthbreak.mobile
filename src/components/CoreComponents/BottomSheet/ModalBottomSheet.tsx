import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {Platform, ViewStyle} from 'react-native';

import {BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {BottomSheet, BottomSheetProps, BottomSheetRefType} from './BottomSheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HandleComponentProps} from './HandleComponent';
import {PaddingDesignProps, SizeDesignProps} from 'types/design';
import {useModalContextBridges} from './useModalContextBriges';

/**
 * Props for `ModalBottomSheet`, extending padding and size design properties.
 */
export interface ModalBottomSheetProps
  extends PaddingDesignProps,
    SizeDesignProps {
  /**
   * Controls whether the bottom sheet is visible.
   */
  isVisible?: boolean;

  /**
   * @deprecated Migrate to `ModalState` and `useModalState` conjunction.
   * Callback triggered when the modal is dismissed.
   */
  onClose?: (active?: false) => void;

  /**
   * Callback triggered when the modal is fully hidden (dismissed).
   */
  onModalHide?: () => void;

  /**
   * Callback triggered when the modal is fully shown (presented).
   */
  onModalShow?: () => void;

  /**
   * Children to render inside the bottom sheet.
   */
  children?: React.ReactNode;

  /**
   * Title text displayed in the handle component.
   */
  title?: HandleComponentProps['title'];

  /**
   * Custom render function for the title.
   */
  renderTitle?: HandleComponentProps['renderTitle'];

  /**
   * Subtitle text displayed below the title.
   */
  subtitle?: HandleComponentProps['subtitle'];

  /**
   * Style object for customizing the container view.
   */
  containerStyle?: ViewStyle;

  /**
   * Animation source for full-screen transitions.
   */
  fullScreenAnimationSource?: any;

  /**
   * Determines whether full-screen animation should be shown.
   */
  showFullScreenAnimation?: boolean;

  /**
   * Callback triggered when the full-screen animation finishes.
   */
  onFullScreenAnimationFinish?: () => void;

  /**
   * Additional props to customize the underlying `BottomSheet` component.
   */
  sheetProps?: Partial<BottomSheetProps>;
}

export const ModalBottomSheet = forwardRef<
  BottomSheetRefType,
  ModalBottomSheetProps
>(
  (
    {
      isVisible,
      title,
      children,
      subtitle,
      onClose,
      onModalHide,
      renderTitle,
      sheetProps,
      onModalShow,
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheetRefType>(null);
    const {top: topInset} = useSafeAreaInsets();

    useImperativeHandle(ref, () => bottomSheetRef.current!, [bottomSheetRef]);

    useEffect(() => {
      if (isVisible) {
        bottomSheetRef.current?.present();
      } else {
        bottomSheetRef.current?.dismiss();
      }
    }, [isVisible]);

    const handleProps = useMemo(
      () => ({
        title,
        subtitle,
        renderTitle,
      }),
      [renderTitle, subtitle, title],
    );

    const onChange = useCallback<
      NonNullable<BottomSheetModalProps['onChange']>
    >(
      index => {
        if (index < 0) {
          // Closed
          onModalHide?.();
        } else {
          // Opened
          onModalShow?.();
        }
      },
      [onModalHide, onModalShow],
    );

    const {renderUnderProviders} = useModalContextBridges();

    return (
      <BottomSheet
        ref={bottomSheetRef}
        handleProps={handleProps}
        keyboardBlurBehavior="restore"
        topInset={topInset}
        onChange={onChange}
        onDismiss={onClose}
        android_keyboardInputMode="adjustResize"
        enableContentPanningGesture={Platform.OS !== 'android'}
        {...sheetProps}>
        {renderUnderProviders(children)}
      </BottomSheet>
    );
  },
);
