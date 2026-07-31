import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  getIdToken,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import useAfterLogin from './useAfterLogin';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios'
      ? '698171505477-ek3lq5mu94pitvsvbhpklpukro4sn6jq.apps.googleusercontent.com'
      : '698171505477-l5m9ugt1oitoj9ome514l65og9lbfnm2.apps.googleusercontent.com',
  offlineAccess: true,
});

interface Props {
  onLoginSuccess?: () => void;
}

export default function useGoogleSignInHook({ onLoginSuccess }: Props) {
  const [hasPlayServices, setHasPlayServices] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const { catchFirebaseError, runAfterFirebaseLogin } = useAfterLogin({
    onLoginSuccess,
  });

  const checkPlayServicesExist = async () => {
    try {
      const result = await GoogleSignin.hasPlayServices();
      setHasPlayServices(result);
    } catch {
      setHasPlayServices(false);
    }
  };

  const signIn = async () => {
    if (!hasPlayServices || loading) {
      return;
    }
    let idToken;
    setLoading(true);
    try {
      const isSignedIn = GoogleSignin.hasPreviousSignIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      let userInfo;
      try {
        userInfo = await GoogleSignin.signIn();
      } catch {
        setLoading(false);
        return;
      }

      idToken = userInfo?.data?.idToken;

      if (!idToken) {
        setLoading(false);
        return;
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);

      let id: string | undefined | null;

      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Önce anonim kullanıcı ile linklemeyi dene.
          await linkWithCredential(currentUser, googleCredential);
          id = await getIdToken(auth.currentUser ?? currentUser);
        }
      } catch (linkError: any) {
        // Eğer credential başka bir hesapta ise, direkt signIn ile devam et.
        if (linkError?.code === 'auth/credential-already-in-use') {
          const signInResult = await signInWithCredential(
            auth,
            googleCredential,
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
      console.log('Error: ', error);
      catchFirebaseError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPlayServicesExist();
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, () => null);
    return subscriber;
  }, [auth]);

  return { signIn, loading };
}
