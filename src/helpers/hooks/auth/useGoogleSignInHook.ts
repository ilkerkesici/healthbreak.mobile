import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
// import {GOOGLE_ANDROID_CLIENT_ID} from '@env';
import useAfterLogin from './useAfterLogin';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios'
      ? '870170193165-avqlmen4pe78hi266ci8sa18de03qc6j.apps.googleusercontent.com'
      : '870170193165-qkin580gei3aj2escl102fe3ed217r8o.apps.googleusercontent.com',
  offlineAccess: true,
});

interface Props {
  onLoginSuccess?: () => void;
}

export default function useGoogleSignInHook({ onLoginSuccess }: Props) {
  const [hasPlayServices, setHasPlayServices] = useState(true);
  const [loading, setLoading] = useState(false);
  const { catchFirebaseError, runAfterFirebaseLogin } = useAfterLogin({
    onLoginSuccess,
  });

  const checkPlayServicesExist = async () => {
    try {
      const result = await GoogleSignin.hasPlayServices();
      setHasPlayServices(result);
    } catch (e) {
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
      } catch (e) {
        setLoading(false);
        return;
      }

      idToken = userInfo?.data?.idToken;

      if (!idToken) {
        setLoading(false);
        return;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().currentUser?.linkWithCredential(googleCredential);
      const id = await auth().currentUser?.getIdToken();
      // console.log('ID Token: ', id);

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
    const subscriber = auth().onAuthStateChanged(() => null);
    return subscriber; // unsubscribe on unmount
  }, []);

  return { signIn, loading };
}
