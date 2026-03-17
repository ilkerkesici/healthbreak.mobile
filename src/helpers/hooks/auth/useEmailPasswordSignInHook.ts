import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import useAfterLogin from './useAfterLogin';

interface Props {
  onLoginSuccess?: (redirectToTeamSelection?: boolean) => void;
}

export default function useEmailPasswordSignInHook({ onLoginSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const { runAfterFirebaseLogin, catchFirebaseError } = useAfterLogin({
    onLoginSuccess,
  });

  // const signOut = async () => {
  //   try {
  //     if (auth().currentUser) {
  //       await auth().signOut();
  //     }
  //   } catch (_) {}
  // };

  const signIn = async (email: string, password: string) => {
    console.log('signIn', email, password);
    try {
      setLoading(true);
      const credential = auth.EmailAuthProvider.credential(email, password);
      const result = await auth().currentUser?.linkWithCredential(credential);
      console.log('result', result);
      if (result?.user && !result?.user?.emailVerified) {
        await result?.user?.sendEmailVerification();
      }
      const id = await auth().currentUser?.getIdToken();
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
          const signInResult = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          const idToken = await signInResult.user.getIdToken();
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
      await auth().sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (result.user && !result.user.emailVerified) {
        await result.user.sendEmailVerification();
      }
      const idToken = await result.user.getIdToken();

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
