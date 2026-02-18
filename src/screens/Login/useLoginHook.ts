import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootNavigation} from 'containers/Router/Router.type';
import useAppleSignInHook from 'helpers/hooks/auth/useAppleSignInHook';
import useEmailPasswordSignInHook from 'helpers/hooks/auth/useEmailPasswordSignInHook';
import useGoogleSignInHook from 'helpers/hooks/auth/useGoogleSignInHook';
import useTranslation from 'helpers/hooks/useTranslation';
import {useState} from 'react';

export default function useLoginHook() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation<RootNavigation>();

  const onLoginSuccess = () => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{name: 'DRAWER_STACK'}],
    });
    navigation.dispatch(action);
  };

  const goToRegister = () => {
    navigation.navigate('REGISTER');
  };

  const goToForgotPassword = () => {
    navigation.navigate('FORGOT_PASSWORD');
  };

  const {signIn: signInWithGoogle, loading: googleLoading} =
    useGoogleSignInHook({onLoginSuccess});

  const {signIn: signInWithEmailPassword, loading: signInLoading} =
    useEmailPasswordSignInHook({
      onLoginSuccess,
    });

  const {signIn: signInWithApple, loading: appleSignInLoading} =
    useAppleSignInHook({
      onLoginSuccess,
    });

  const {i18n} = useTranslation();

  const onChangeEmail = (text: string) => {
    if (emailError) {
      setEmailError('');
    }
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    if (passwordError) {
      setPasswordError('');
    }
    setPassword(text);
  };

  const submitPreCheck = () => {
    if (!email) {
      setEmailError(i18n.t('login.invalid_email'));
      return false;
    }
    if (!password || password.length <= 5) {
      setPasswordError(i18n.t('login.password_error'));
      return false;
    }
    return true;
  };

  const onPressSubmit = async () => {
    const isValid = submitPreCheck();
    if (!isValid) {
      return;
    }
    await signInWithEmailPassword(email, password);
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    googleLoading,
    signInLoading,
    appleSignInLoading,
    onChangeEmail,
    onChangePassword,
    onPressSubmit,
    signInWithGoogle,
    goToRegister,
    goToForgotPassword,
    signInWithApple,
  };
}
