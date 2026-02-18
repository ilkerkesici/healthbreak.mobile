import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import useAfterLogin from './useAfterLogin';
// import SessionHelper from '../helpers/SessionHelper';

const isAndroid = Platform.OS === 'android';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useAppleSignInHook({ onLoginSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const { catchFirebaseError, runAfterFirebaseLogin } = useAfterLogin({
    onLoginSuccess,
  });

  const signIn = async () => {
    if (isAndroid) {
      return;
    }
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthRequestResponse.identityToken) {
        Alert.alert('', 'Bir hata oluştu!');
        setLoading(false);
        return;
      }
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      await auth().currentUser?.linkWithCredential(appleCredential);
      const id = await auth().currentUser?.getIdToken();

      if (!id) {
        setLoading(false);
        return;
      }
      await runAfterFirebaseLogin(id);
      setLoading(false);
    } catch (error) {
      catchFirebaseError(error);
      console.log(error);
    }
  };
  return { loading, signIn };
}
