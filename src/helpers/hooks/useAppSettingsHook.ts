import { VERSION } from 'constants/app';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import { compareVersions } from 'helpers/utils/utils';
import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import {
  BackendAppSetting,
  useBackendAppSettingsStore,
} from 'store/useBackendAppSettingsStore';

const HB_PAYWALL_UNIT_KEY = 'hb_paywall_unit';

function isBackendAppSettingsArray(
  value: unknown,
): value is BackendAppSetting[] {
  return Array.isArray(value);
}

export default function useAppSettingsHook() {
  const { appSettings, setAppSettings } = useBackendAppSettingsStore();

  const initSettings = useCallback(async () => {
    const result = await CommonApiHelper.getSettings();
    console.log('settings', result);
    if (isBackendAppSettingsArray(result)) {
      setAppSettings(result);
      return result;
    }
    return [];
  }, [setAppSettings]);

  const hbPaywallUnitEnabled = useMemo(() => {
    const settingInfo = appSettings.find(item => item.key === HB_PAYWALL_UNIT_KEY);
    if (!settingInfo) {
      return false;
    }
    const version =
      Platform.OS === 'android' ? settingInfo.android_value : settingInfo.ios_value;
    const compareResult = compareVersions(VERSION, version);
    return compareResult <= 0;
  }, [appSettings]);

  return {
    appSettings,
    hbPaywallUnitEnabled,
    initSettings,
  };
}
