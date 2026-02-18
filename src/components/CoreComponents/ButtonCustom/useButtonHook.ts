import {useState} from 'react';

import {ButtonProps} from './Button.type';
// import AnalyticHelper from 'helpers/analytic/AnalyticHelper';

interface ReturnType {
  focused: boolean;
  showGradient: boolean;
  disabledTag: '-disabled' | '';
  onPressIn: () => void;
  onPressOut: () => void;
  onButtonPressed: () => void;
}

const useButtonHook = ({
  variant = 'primary',
  disabled,
  loading,
  // event,
  onPress,
}: ButtonProps): ReturnType => {
  const [focused, setFocused] = useState(false);

  const onPressIn = () => {
    if (disabled) {
      return;
    }
    setFocused(true);
  };
  const onPressOut = () => {
    if (disabled) {
      return;
    }
    setFocused(false);
  };

  const onButtonPressed = () => {
    if (disabled || loading) {
      return;
    }
    onPress?.();
    // if (event) {
    //   AnalyticHelper.logEvent(event);
    // }
  };

  const showGradient =
    (variant === 'primary' ||
      variant === 'bezeled-gray' ||
      variant === 'bezeled-gray-2') &&
    !disabled;
  const disabledTag = disabled ? '-disabled' : '';
  return {
    focused,
    showGradient,
    disabledTag,
    onPressIn,
    onPressOut,
    onButtonPressed,
  };
};

export default useButtonHook;
