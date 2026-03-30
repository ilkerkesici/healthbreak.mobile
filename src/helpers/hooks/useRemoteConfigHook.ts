import { useRemoteConfigStore } from 'screens/remoteConfigStore';
import remoteConfig from '@react-native-firebase/remote-config';
import MixpanelHelper from 'containers/analytic/MixpanelHelper';

export const useRemoteConfigHook = () => {
  const {
    packagesVariantBEnabled,
    remoteConfigReady,
    setPackagesVariantBEnabled,
    setRemoteConfigReady,
  } = useRemoteConfigStore();

  const getRemoteConfig = () => {
    remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: __DEV__ ? 30000 : 30000, // 30s for dev, 1h for prod
    });
    remoteConfig()
      .setDefaults({
        packages_variant_b_enabled: false,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(fetchedRemotely => {
        const parameters = remoteConfig().getAll();
        const asObject: Record<string, string> = {};
        if (parameters) {
          Object.entries(parameters).forEach($ => {
            const [key, entry] = $;
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
      });
  };

  return {
    getRemoteConfig,
    remoteConfigReady,
    packagesVariantBEnabled,
  };
};
