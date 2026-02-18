import React from 'react';
import {ViewProps} from 'react-native';

import * as BottomSheetScope from '@gorhom/bottom-sheet';

/**
 * Props for the `BottomSheetFooter` component, extending `BottomSheetFooterProps` from `@gorhom/bottom-sheet`.
 */
export type FooterComponentProps = BottomSheetScope.BottomSheetFooterProps & {
  /**
   * Optional child components to render inside the footer.
   */
  children?: ViewProps['children'];
};

/**
 * A wrapper around `BottomSheetFooter` from `@gorhom/bottom-sheet`, adding a default bottom safe area view.
 *
 * - Supports `children` for adding custom content inside the footer.
 * - Includes `DefaultedBottomSafeView` for better bottom padding.
 *
 * @param {FooterComponentProps} props - The props for the footer component.
 * @returns {JSX.Element} The customized `BottomSheetFooter` component.
 */
export const BottomSheetFooter = (props: FooterComponentProps): JSX.Element => {
  return (
    <BottomSheetScope.BottomSheetFooter {...props}>
      {props.children}
    </BottomSheetScope.BottomSheetFooter>
  );
};
