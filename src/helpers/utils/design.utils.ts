import {ViewStyle} from 'react-native';
import {DesignProps, TextDesignProps} from 'types/design';

const combinedStyleMap = {
  fill: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillInRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
} as const;

type CombinedStyleMapType = keyof typeof combinedStyleMap;

export const designPropToStyle = (designProp: DesignProps): ViewStyle => {
  const copyDesignProp: Record<string, unknown> = {
    ...designProp,
  };

  const style = Object.keys(copyDesignProp).reduce((agg, item) => {
    if (designPropValidKeys[item]) {
      return {...agg, [item]: copyDesignProp[item] as ViewStyle};
    }

    const combinedStyle = combinedStyleMap?.[item as CombinedStyleMapType];

    if (combinedStyle) {
      return {...agg, ...combinedStyle};
    }

    return agg;
  }, {} as Record<string, unknown>);

  return style as ViewStyle;
};

export const textDesignPropToStyle = (
  textDesignProp: TextDesignProps,
): ViewStyle => {
  const style: Record<string, string | number | boolean> = {};
  const copyDesignProp: Record<string, string | number | boolean> = {
    ...textDesignProp,
  };
  Object.keys(copyDesignProp).forEach(key => {
    if (!textDesignPropValidKeys[key]) {
      return;
    }
    switch (key) {
      case 'left':
        style.textAlign = 'left';
        break;
      case 'right':
        style.textAlign = 'right';
        break;
      case 'center':
        style.textAlign = 'center';
        break;
      default:
        style[key] = copyDesignProp[key];
        break;
    }
  });
  const defaultDesign = designPropToStyle(textDesignProp);
  return {...defaultDesign, ...(style as ViewStyle)};
};

const designPropValidKeys: Record<string, boolean> = {
  marginTop: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginHorizontal: true,
  marginVertical: true,
  padding: true,
  paddingHorizontal: true,
  paddingVertical: true,
  paddingTop: true,
  paddingBottom: true,
  paddingRight: true,
  paddingLeft: true,
  borderRadius: true,
  justifyContent: true,
  alignItems: true,
  backgroundColor: true,
  color: true,
  width: true,
  height: true,
  flex: true,
  flexDirection: true,
  gap: true,
  minHeight: true,
  borderWidth: true,
  opacity: true,
};

const textDesignPropValidKeys: Record<string, boolean> = {
  right: true,
  left: true,
  center: true,
  color: true,
  fontWeight: true,
};
