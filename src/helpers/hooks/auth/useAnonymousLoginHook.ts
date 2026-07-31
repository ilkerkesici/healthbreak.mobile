import { useState } from 'react';
import {
  getAuth,
  signInAnonymously,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
import useAfterLogin from './useAfterLogin';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useAnonymousLoginHook({ onLoginSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const { runAfterFirebaseLogin, catchFirebaseError } = useAfterLogin({
    onLoginSuccess,
  });

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInAnonymously(auth);
      const id = await response.user.getIdToken();
      if (!id) {
        setLoading(false);
        return;
      }
      await runAfterFirebaseLogin(id);
      setLoading(false);
    } catch (error) {
      console.log('Firebase Error: ', error);
      catchFirebaseError(error);
      console.log(error);
    }
  };
  return { loading, signIn, signOut };
}
