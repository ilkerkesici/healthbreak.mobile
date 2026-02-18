import React, {forwardRef, useCallback, useMemo} from 'react';

import * as GorhomBottomSheetScope from '@gorhom/bottom-sheet';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {BackdropComponent, BackdropComponentProps} from './BackdropComponent';
import {BottomSheetFooter, FooterComponentProps} from './BottomSheetFooter';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {HandleComponent, HandleComponentProps} from './HandleComponent';

const GorhomBottomSheet = GorhomBottomSheetScope.BottomSheetModal;

/**
 * Props for the `BottomSheet` component, extending `BottomSheetModalProps` from `@gorhom/bottom-sheet`.
 */
export type BottomSheetProps = GorhomBottomSheetScope.BottomSheetModalProps & {
  /**
   * Optional props to customize the `HandleComponent`.
   */
  handleProps?: Partial<HandleComponentProps>;

  /**
   * Optional props to customize the `BottomSheetFooter`.
   */
  footerProps?: Partial<FooterComponentProps>;

  /**
   * Optional props to customize the `BackdropComponent`.
   */
  backdropProps?: Partial<BackdropComponentProps>;
};

/**
 * Ref type for the `BottomSheet`, which corresponds to `BottomSheetModal` from `@gorhom/bottom-sheet`.
 */
export type BottomSheetRefType = GorhomBottomSheetScope.BottomSheetModal;

/**
 * A wrapper around `BottomSheetModal` from `@gorhom/bottom-sheet`, providing default styles
 * and custom components for the handle, footer, and backdrop.
 *
 * - Uses `useThemeColor` for background styling.
 * - Integrates safe area insets for better layout adjustment.
 * - Allows customization of the handle, footer, and backdrop via props.
 *
 * @param {BottomSheetProps} props - The props for the bottom sheet, including customization options.
 * @param {React.Ref<BottomSheetRefType>} ref - The forwarded ref for the `BottomSheetModal`.
 * @returns {JSX.Element} The customized `BottomSheetModal` component.
 */
export const BottomSheet = forwardRef<BottomSheetRefType, BottomSheetProps>(
  (props, ref) => {
    const {handleProps, footerProps, backdropProps, ...rest} = props;
    const [backgroundColor] = useThemeColor(['neutral.200']);
    const insets = useSafeAreaInsets();

    const backgroundStyle = useMemo(
      () => ({backgroundColor}),
      [backgroundColor],
    );

    const handleComponent = useCallback<
      NonNullable<BottomSheetProps['handleComponent']>
    >(
      _props => {
        return <HandleComponent {..._props} {...handleProps} />;
      },
      [handleProps],
    );

    const footerComponent = useCallback<
      NonNullable<BottomSheetProps['footerComponent']>
    >(
      _props => {
        return <BottomSheetFooter {..._props} {...footerProps} />;
      },
      [footerProps],
    );

    const backdropComponent = useCallback<
      NonNullable<BottomSheetProps['backdropComponent']>
    >(
      _props => {
        return <BackdropComponent {..._props} {...backdropProps} />;
      },
      [backdropProps],
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        enablePanDownToClose
        topInset={insets.top}
        backdropComponent={backdropComponent}
        backgroundStyle={backgroundStyle}
        handleComponent={handleComponent}
        footerComponent={footerComponent}
        {...rest}
      />
    );
  },
);
