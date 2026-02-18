import {IToast} from 'components/Toast/Toast';
import {create} from 'zustand';

export interface ToastStoreType {
  toastData: IToast;
  setToastData: (theme: IToast) => void;
}

export const useToastStore = create<ToastStoreType>()(set => ({
  toastData: {
    text: '',
    opened: false,
  },
  setToastData: (toastData: IToast) => set({toastData: {...toastData}}),
}));
