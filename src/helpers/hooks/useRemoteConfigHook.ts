import { useRemoteConfigStore } from 'screens/remoteConfigStore';
import {
  getRemoteConfig as getFirebaseRemoteConfig,
  fetchAndActivate,
  activate,
  getAll,
} from '@react-native-firebase/remote-config';
import MixpanelHelper from 'containers/analytic/MixpanelHelper';

type RemoteConfigNative = {
  setConfigSettings: (settings: {
    minimumFetchIntervalMillis: number;
  }) => Promise<void>;
  setDefaults: (defaults: Record<string, string | number | boolean>) => Promise<null>;
};

export const useRemoteConfigHook = () => {
  const {
    packagesVariantBEnabled,
    remoteConfigReady,
    setPackagesVariantBEnabled,
    setRemoteConfigReady,
  } = useRemoteConfigStore();

  const getRemoteConfig = async () => {
    const remoteConfig = getFirebaseRemoteConfig();
    const remoteConfigNative = remoteConfig as typeof remoteConfig & RemoteConfigNative;

    // Property setter'lar fire-and-forget; fetch'ten önce native tarafın bitmesini bekle.
    await Promise.all([
      remoteConfigNative.setConfigSettings({
        minimumFetchIntervalMillis: __DEV__ ? 30_000 : 3_600_000,
      }),
      remoteConfigNative.setDefaults({
        packages_variant_b_enabled: false,
      }),
    ]);

    try {
      await fetchAndActivate(remoteConfig);
    } catch (error) {
      // Network / throttle / API hatalarında default + cache değerleriyle devam et.
      console.log('Remote Config fetch failed, using defaults/cache', error);
      try {
        await activate(remoteConfig);
      } catch (_) {
        // ignore
      }
    }

    const parameters = getAll(remoteConfig);
    const asObject: Record<string, string> = {};
    if (parameters) {
      Object.entries(parameters).forEach(([key, entry]) => {
        asObject[key] = entry.asString();
        if (key === 'packages_variant_b_enabled') {
          setPackagesVariantBEnabled(entry.asBoolean());
        }
      });
      MixpanelHelper.addPeopleParameters(asObject);
    }

    setTimeout(() => {
      console.log('remoteConfigReady set', true);
      setRemoteConfigReady(true);
    }, 1000);
  };

  return {
    getRemoteConfig,
    remoteConfigReady,
    packagesVariantBEnabled,
  };
};
