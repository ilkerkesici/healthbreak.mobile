import {useCallback, useMemo} from 'react';
import {
  GeneralPopUpButtonType,
  useGeneralPopUpStore,
} from './useGeneralPopUpStore';
import {ViewStyle} from 'react-native';
import {openSettings} from 'react-native-permissions';

export default function useGeneralPopUpHook() {
  const {opened, title, subtitle, buttons, rotated, image, setPopUp} =
    useGeneralPopUpStore();
  const extraStyle: ViewStyle = useMemo(
    () => (rotated ? {transform: [{rotate: '90deg'}]} : {}),
    [rotated],
  );

  const closeButton = useCallback(() => {
    setPopUp({
      title: undefined,
      subtitle: undefined,
      rotated: undefined,
      buttons: undefined,
      opened: false,
    });
  }, [setPopUp]);

  const onPressButton = (type?: GeneralPopUpButtonType) => {
    switch (type) {
      case 'settings':
        openSettings();
        return;
    }
    closeButton();
  };

  return {extraStyle, opened, title, subtitle, buttons, image, onPressButton};
}
