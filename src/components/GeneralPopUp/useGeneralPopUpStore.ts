import {BasicButtonType} from 'components/CoreComponents/ButtonBasic/types';
import {create} from 'zustand';

export type GeneralPopUpButtonType = 'settings';

export interface GeneralPopUpButtonProps {
  text: string;
  type?: GeneralPopUpButtonType;
  variant?: BasicButtonType;
}

export interface PopUpProps {
  opened?: boolean;
  title?: string;
  subtitle?: string;
  buttons?: GeneralPopUpButtonProps[];
  rotated?: boolean;
  image?: {source: any; width: number; height: number};
  row?: boolean;
}

export interface GeneralPopUpStoreStoreType extends PopUpProps {
  setPopUp: (props: PopUpProps) => void;
}

export const useGeneralPopUpStore = create<GeneralPopUpStoreStoreType>(set => ({
  row: true,
  opened: false,
  setPopUp: (props: PopUpProps) => set(() => ({row: true, ...props})),
}));
