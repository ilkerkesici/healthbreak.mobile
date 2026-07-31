import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {
  getAuth,
  AppleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  getIdToken,
} from '@react-native-firebase/auth';
import useAfterLogin from './useAfterLogin';

const isAndroid = Platform.OS === 'android';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useAppleSignInHook({ onLoginSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

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
      const appleCredential = AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      let id: string | undefined | null;

      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Önce anonim kullanıcı ile linklemeyi dene.
          await linkWithCredential(currentUser, appleCredential);
          id = await getIdToken(auth.currentUser ?? currentUser);
        }
      } catch (linkError: any) {
        // Eğer credential başka bir hesapta ise, direkt signIn ile devam et.
        if (linkError?.code === 'auth/credential-already-in-use') {
          const signInResult = await signInWithCredential(
            auth,
            appleCredential,
          );
          id = await getIdToken(signInResult.user);
        } else {
          throw linkError;
        }
      }

      if (!id) {
        setLoading(false);
        return;
      }
      await runAfterFirebaseLogin(id);
      setLoading(false);
    } catch (error: any) {
      catchFirebaseError(error);
      console.log(error);
    }
  };
  return { loading, signIn };
}
