import {ToastType} from 'components/Toast/Toast';
import {useCallback} from 'react';
import {useToastStore} from 'store/useToastStore';

export default function useToastHook(duration = 3000) {
  const {setToastData} = useToastStore();

  const showToast = useCallback(
    (text: string, type?: ToastType) => {
      setToastData({opened: true, text, type});
      setTimeout(() => {
        setToastData({opened: false, text: '', type: undefined});
      }, duration);
    },
    [duration, setToastData],
  );

  return {showToast};
}
