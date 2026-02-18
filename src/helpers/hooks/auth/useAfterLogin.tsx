import useTranslation from '../useTranslation';
import useToastHook from '../useToastHook';
import { CommonApiHelper } from 'helpers/api/CommonApiHelper';
import { useAppInitStore } from 'store/useAppInitStore';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useAfterLogin({ onLoginSuccess }: Props) {
  const { i18n } = useTranslation();
  const { showToast } = useToastHook();
  const setUserInfo = useAppInitStore(state => state.setUserInfo);
  // const {checkIsPremium} = usePremiumHook();

  const runAfterFirebaseLogin = async (id: string) => {
    const result: any = await CommonApiHelper.loginFirebase(id);
    if (result && result.token && result.fbData) {
      setUserInfo(result.token, result.fbData);
      onLoginSuccess?.();
      return result;
    } else {
      showToast(result?.message || i18n.t('errors.unexpected_issue'), 'error');
    }
  };

  const catchFirebaseError = (error: any) => {
    if (error.code === 'auth/user-not-found') {
      showToast(i18n.t('errors.user-not-found'), 'error');
    } else if (error.code === 'auth/invalid-email') {
      showToast(i18n.t('errors.invalid-email'), 'error');
    } else if (error.code === 'auth/invalid-credential') {
      showToast(i18n.t('errors.invalid-email-or-password'), 'error');
    } else if (error.code === 'auth/email-already-in-use') {
      showToast(i18n.t('errors.email-already-in-use'), 'error');
    } else if (error.code === 'auth/internal-error') {
      showToast(i18n.t('errors.internal-error'), 'error');
    } else {
      showToast(i18n.t('errors.unexpected'), 'error');
    }
  };
  return { runAfterFirebaseLogin, catchFirebaseError };
}
