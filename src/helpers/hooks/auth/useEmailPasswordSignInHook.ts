import {
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  getIdToken,
} from '@react-native-firebase/auth';
import { useState } from 'react';
import useAfterLogin from './useAfterLogin';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useEmailPasswordSignInHook({ onLoginSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const { runAfterFirebaseLogin, catchFirebaseError } = useAfterLogin({
    onLoginSuccess,
  });

  const signIn = async (email: string, password: string) => {
    console.log('signIn', email, password);
    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(email, password);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }
      const result = await linkWithCredential(currentUser, credential);
      console.log('result', result);
      if (result?.user && !result?.user?.emailVerified) {
        await sendEmailVerification(result.user);
      }
      const id = await getIdToken(auth.currentUser ?? result.user);
      if (!id) {
        setLoading(false);
        return;
      }

      await runAfterFirebaseLogin(id);
    } catch (error: any) {
      console.log('Error : ', error);
      // Eğer e-posta zaten başka bir hesapta kayıtlıysa, link yerine doğrudan signIn dene.
      if (error?.code === 'auth/email-already-in-use') {
        try {
          const signInResult = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const idToken = await getIdToken(signInResult.user);
          await runAfterFirebaseLogin(idToken);
        } catch (innerError: any) {
          console.log('Fallback signIn error: ', innerError);
          catchFirebaseError(innerError);
        }
      } else {
        catchFirebaseError(error);
      }
    }
    setLoading(false);
  };

  const sendPassworReset = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user && !result.user.emailVerified) {
        await sendEmailVerification(result.user);
      }
      const idToken = await getIdToken(result.user);

      await runAfterFirebaseLogin(idToken);
      setLoading(false);
    } catch (error: any) {
      console.log('Error: ', error.code);
      catchFirebaseError(error);
    }
    setLoading(false);
  };

  return { loading, createUser, signIn, sendPassworReset };
}
