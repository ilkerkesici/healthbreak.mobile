import React, { ComponentProps } from 'react';

import * as GorhomBottomSheetScope from '@gorhom/bottom-sheet';

/**
 * Props for `BottomSheetView`, extending `BottomSheetView` props from `@gorhom/bottom-sheet`.
 */
export type BottomSheetViewProps = ComponentProps<typeof GorhomBottomSheetScope.BottomSheetView>;

/**
 * A wrapper around `BottomSheetView` from `@gorhom/bottom-sheet`.
 *
 * - Provides a flexible container for content inside a bottom sheet.
 * - Inherits all properties from `BottomSheetView` without modification.
 *
 * @param {BottomSheetViewProps} props - The props for the view component.
 * @returns {JSX.Element} The customized `BottomSheetView` component.
 */
export const BottomSheetView = (props: BottomSheetViewProps): JSX.Element => {
  return <GorhomBottomSheetScope.BottomSheetView {...props} />;
};
