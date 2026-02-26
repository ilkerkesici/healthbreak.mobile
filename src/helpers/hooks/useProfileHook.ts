import { useCallback } from 'react';
import { APIEndpointHelper } from 'helpers/api/ApiEndpointHelper';
import { OnboardingAnswersPayload, OnboardingProfile } from 'types/models';
import { useAppInitStore } from 'store/useAppInitStore';

export default function useProfileHook() {
  const { profile, setProfile } = useAppInitStore();

  const getProfile = useCallback(async () => {
    const result = await APIEndpointHelper.getOnboardingProfile();

    if (result) {
      setProfile(result);
    }

    return result;
  }, [setProfile]);

  const setProfileToBackend = useCallback(
    async (payload: OnboardingAnswersPayload) => {
      const created = await APIEndpointHelper.createOnboardingProfile(payload);

      if (!created) {
        return;
      }

      const latest = await APIEndpointHelper.getOnboardingProfile();

      if (latest) {
        setProfile(latest);
      }

      return latest;
    },
    [setProfile],
  );

  return {
    profile: profile as OnboardingProfile | undefined,
    getProfile,
    setProfile: setProfileToBackend,
  };
}
