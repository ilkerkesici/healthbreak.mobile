import React, { ComponentProps, forwardRef } from 'react';

import * as GorhomBottomSheetScope from '@gorhom/bottom-sheet';

/**
 * Props for `BottomSheetFlatlist`, extending `BottomSheetFlatList` props from `@gorhom/bottom-sheet`.
 *
 * @template T - The type of data in the FlatList.
 */
export type BottomSheetFlatlistProps<T> = ComponentProps<typeof GorhomBottomSheetScope.BottomSheetFlatList<T>>;

/**
 * A wrapper around `BottomSheetFlatList` from `@gorhom/bottom-sheet`, providing default styles.
 *
 * - Disables `bounces` by default for better UX in bottom sheets.
 * - Supports generics for strongly typed FlatList data.
 * - Properly forwards the ref to `BottomSheetFlatListMethods`.
 *
 * @template T - The type of data in the FlatList.
 * @param {BottomSheetFlatlistProps<T>} props - Props for the FlatList component.
 * @param {React.Ref<GorhomBottomSheetScope.BottomSheetFlatListMethods>} ref - Forwarded ref for the list methods.
 * @returns {React.ReactElement} The customized `BottomSheetFlatList` component.
 */
export const BottomSheetFlatlist = forwardRef(
  <T,>(props: BottomSheetFlatlistProps<T>, ref: React.Ref<GorhomBottomSheetScope.BottomSheetFlatListMethods>) => {
    return <GorhomBottomSheetScope.BottomSheetFlatList ref={ref} bounces={false} {...props} />;
  },
) as <T>(
  props: BottomSheetFlatlistProps<T> & { ref?: React.Ref<GorhomBottomSheetScope.BottomSheetFlatListMethods> },
) => React.ReactElement;

(BottomSheetFlatlist as any).displayName = 'BottomSheetFlatlist';
