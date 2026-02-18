import React, {ComponentProps, useMemo} from 'react';
import {StyleSheet} from 'react-native';

import * as GorhomBottomSheetScope from '@gorhom/bottom-sheet';

/**
 * Props for the `BackdropComponent`, extending the properties of `BottomSheetBackdrop`
 */
export type BackdropComponentProps = ComponentProps<
  typeof GorhomBottomSheetScope.BottomSheetBackdrop
>;

/**
 * A wrapper around `BottomSheetBackdrop` from `@gorhom/bottom-sheet` that applies
 * default background styling using the theme's neutral color.
 *
 * @param {BackdropComponentProps} props - Props extending `BottomSheetBackdrop` component.
 * @returns {JSX.Element} The customized `BottomSheetBackdrop` component.
 */
export const BackdropComponent = (
  props: BackdropComponentProps,
): JSX.Element => {
  // const [modalBgColor] = useThemeColor(["n"]);

  const style = useMemo(
    () =>
      StyleSheet.compose(props.style, {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }),
    [props.style],
  );

  return (
    <GorhomBottomSheetScope.BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      style={style}
    />
  );
};
