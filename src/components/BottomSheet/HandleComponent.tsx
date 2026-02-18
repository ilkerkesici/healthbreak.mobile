import React, {ComponentProps} from 'react';
import {StyleSheet, View} from 'react-native';

import {BottomSheetHandle} from '@gorhom/bottom-sheet';


import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { Block, Text } from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import { CustomTextProps } from 'components/CoreComponents/Text/Text';

/**
 * Props for the `HandleComponent`, extending `BottomSheetHandle` props.
 */
export type HandleComponentProps = ComponentProps<typeof BottomSheetHandle> & {
  /**
   * Title text to be displayed in the handle.
   */
  title?: CustomTextProps['children'];

  /**
   * Subtitle text to be displayed below the title.
   */
  subtitle?: CustomTextProps['children'];

  /**
   * Optional render function to provide a custom title component.
   */
  renderTitle?: () => React.ReactNode;
};

/**
 * A custom handle component for `BottomSheetHandle`, supporting:
 *
 * - **Title & Subtitle**: Can display a title and subtitle.
 * - **Custom Title Rendering**: Supports `renderTitle` for a fully custom title.
 * - **Animated Indicator**: Uses `react-native-reanimated` to animate opacity based on the sheet's index.
 * - **Themed Styling**: Uses `useThemeColor` for dynamic color theming.
 *
 * @param {HandleComponentProps} props - The props for the handle component.
 * @returns {JSX.Element} The customized `BottomSheetHandle` component.
 */
export const HandleComponent = (props: HandleComponentProps): JSX.Element => {
  const {title, subtitle, renderTitle, children, ...rest} = props;

  return (
    <BottomSheetHandle {...rest} indicatorStyle={indicatorStyle}>
      <Block
        fill
        height={50}
        justifyContent="flex-start"
        marginTop={-40}
        paddingTop={10}
        marginBottom={-20}>
        <Block
          width={40}
          height={3}
          backgroundColour="white"
          borderRadius={1.5}
        />
      </Block>
      <View>
        <Display show={title}>
          <View style={styles.headerContainer}>
            <Text
              variant="text"
              size="lg"
              fontWeight={'600'}
              colour={'neutral.900'}>
              {title}
            </Text>
          </View>
        </Display>

        {renderTitle?.()}
        <Display show={subtitle}>
          <Text variant="caption1" size="lg" colour="neutral.800" margin={20}>
            {subtitle}
          </Text>
        </Display>
        {children}
      </View>
    </BottomSheetHandle>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'flex-end',
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
  },
});

const indicatorStyle = {
  width: 0,
};
