import React, { ComponentProps } from 'react';

import * as GorhomBottomSheetScope from '@gorhom/bottom-sheet';

/**
 * Props for `BottomSheetScrollView`, extending `BottomSheetScrollView` props from `@gorhom/bottom-sheet`.
 */
export type BottomSheetScrollViewProps = ComponentProps<typeof GorhomBottomSheetScope.BottomSheetScrollView>;

/**
 * A wrapper around `BottomSheetScrollView` from `@gorhom/bottom-sheet`, with default behavior adjustments.
 *
 * - Disables `bounces` by default to provide a smoother scrolling experience inside a bottom sheet.
 *
 * @param {BottomSheetScrollViewProps} props - The props for the scroll view component.
 * @returns {JSX.Element} The customized `BottomSheetScrollView` component.
 */
export const BottomSheetScrollView = (props: BottomSheetScrollViewProps): JSX.Element => {
  return <GorhomBottomSheetScope.BottomSheetScrollView bounces={false} {...props} />;
};
