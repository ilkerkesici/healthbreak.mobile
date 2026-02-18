import { Platform } from 'react-native';

import {
  check,
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { i18n } from 'constants/i18n';
import { useGeneralPopUpStore } from 'components/GeneralPopUp/useGeneralPopUpStore';

class PermissionController {
  private async checkIosLocationPermission() {
    try {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async checkAndroidLocationPermission() {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async requestIosLocationPermission() {
    try {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async requestAndroidLocationPermission() {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  private async checkIosCameraPermission(rotated?: boolean) {
    try {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      if (result === RESULTS.BLOCKED) {
        const setPopUp = useGeneralPopUpStore.getState().setPopUp;
        setPopUp({
          opened: true,
          title: i18n.t('permission.camera_alert_title'),
          subtitle: i18n.t('permission.camera_alert_subtitle'),
          buttons: [
            { text: i18n.t('permission.close'), variant: 'bordered' },
            {
              text: i18n.t('permission.settings'),
              type: 'settings',
              variant: 'primary',
            },
          ],
          rotated,
        });
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async checkAndroidCameraPermission(rotated?: boolean) {
    try {
      const result = await check(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      if (result === RESULTS.BLOCKED) {
        const setPopUp = useGeneralPopUpStore.getState().setPopUp;
        setPopUp({
          opened: true,
          title: i18n.t('permission.camera_alert_title'),
          subtitle: i18n.t('permission.camera_alert_subtitle'),
          buttons: [
            { text: i18n.t('permission.close'), variant: 'bordered' },
            {
              text: i18n.t('permission.settings'),
              type: 'settings',
              variant: 'primary',
            },
          ],
          rotated,
        });
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async requestIosCameraPermission() {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      if (result === RESULTS.BLOCKED) {
        return 'blocked';
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async requestAndroidCameraPermission() {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      if (result === RESULTS.BLOCKED) {
        return 'blocked';
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  private async checkIosGaleryPermission() {
    try {
      const result = await checkMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      ]);
      // const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      let response = true;
      let blocked = false;
      Object.keys(result).forEach(key => {
        if (
          result[key] !== RESULTS.GRANTED &&
          result[key] !== RESULTS.LIMITED
        ) {
          response = false;
        }
        if (result[key] === RESULTS.BLOCKED) {
          blocked = true;
        }
      });
      if (blocked) {
        const setPopUp = useGeneralPopUpStore.getState().setPopUp;
        setPopUp({
          opened: true,
          title: i18n.t('permission.gallery_alert_title'),
          subtitle: i18n.t('permission.gallery_alert_subtitle'),
          buttons: [
            { text: i18n.t('permission.close'), variant: 'bordered' },
            {
              text: i18n.t('permission.settings'),
              type: 'settings',
              variant: 'primary',
            },
          ],
          rotated: false,
        });
      }
      return response;
    } catch (err) {
      return false;
    }
  }

  private async checkAndroidGaleryPermission() {
    try {
      if (true) {
        return true;
      }
      const result = await checkMultiple([
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);

      let response = true;
      let blocked = false;
      Object.keys(result).forEach(key => {
        if (result[key] !== RESULTS.GRANTED) {
          response = false;
        }
        if (result[key] === RESULTS.BLOCKED) {
          blocked = true;
        }
      });
      if (blocked) {
        const setPopUp = useGeneralPopUpStore.getState().setPopUp;
        setPopUp({
          opened: true,
          title: i18n.t('permission.gallery_alert_title'),
          subtitle: i18n.t('permission.gallery_alert_subtitle'),
          buttons: [
            { text: i18n.t('permission.close'), variant: 'bordered' },
            {
              text: i18n.t('permission.settings'),
              type: 'settings',
              variant: 'primary',
            },
          ],
          rotated: false,
        });
      }
      return response;
    } catch (err) {
      return false;
    }
  }

  private async requestIosGaleryPermission() {
    try {
      const result = await requestMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      ]);
      // const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      let response = true;
      Object.keys(result).forEach(key => {
        if (result[key] !== RESULTS.GRANTED) {
          response = false;
        }
      });
      return response;
    } catch (err) {
      return false;
    }
  }

  private async requestAndroidGaleryPermission() {
    try {
      let result = await requestMultiple([
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);

      let response = true;
      Object.keys(result).forEach(key => {
        if (result[key] !== RESULTS.GRANTED) {
          response = false;
        }
      });
      return response;
    } catch (err) {
      return false;
    }
  }

  async checkLocationPermission() {
    let result = false;
    if (Platform.OS === 'android') {
      result = await this.checkAndroidLocationPermission();
    } else {
      result = await this.checkIosLocationPermission();
    }
    return result;
  }
  async requestLocationPermission() {
    let result = false;
    if (Platform.OS === 'android') {
      result = await this.requestAndroidLocationPermission();
    } else {
      result = await this.requestIosLocationPermission();
    }
    return result;
  }

  async checkCameraPermission(rotated?: boolean) {
    let result = false;
    if (Platform.OS === 'android') {
      result = await this.checkAndroidCameraPermission(rotated);
    } else {
      result = await this.checkIosCameraPermission(rotated);
    }

    return result;
  }
  async requestCameraPermission() {
    let result: 'blocked' | boolean = false;
    if (Platform.OS === 'android') {
      result = await this.requestAndroidCameraPermission();
    } else {
      result = await this.requestIosCameraPermission();
    }

    return result;
  }

  async checkGaleryPermission() {
    let result = false;
    if (Platform.OS === 'android') {
      result = await this.checkAndroidGaleryPermission();
    } else {
      result = await this.checkIosGaleryPermission();
    }

    return result;
  }
  async requestGaleryPermission() {
    let result = false;
    if (Platform.OS === 'android') {
      result = await this.requestAndroidGaleryPermission();
    } else {
      result = await this.requestIosGaleryPermission();
    }

    return result;
  }
}

const PermissionHelper = new PermissionController();

export default PermissionHelper;

export const requestTrackingTransparency = async () => {
  if (Platform.OS !== 'ios') {
    return;
  }
  try {
    const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    console.log('REsult: ', result);
  } catch (e) {}
};
