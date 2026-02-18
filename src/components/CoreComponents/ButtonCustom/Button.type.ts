import {ColorType} from 'assets/colors';
import {IconType} from '../Icon';
import {ButtonBaseSize, ButtonVariant, DesignProps} from 'types/design';
// import {AnalyticEventTypes} from 'helpers/analytic/types';

export interface ButtonProps extends DesignProps {
  size?: ButtonBaseSize;
  variant?: ButtonVariant;
  text?: string;
  disabled?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  icon?: IconType;
  loading?: boolean;
  onPress?: () => void;
  transparent?: boolean;
  forceBgColor?: ColorType;
  // event?: AnalyticEventTypes;
}
