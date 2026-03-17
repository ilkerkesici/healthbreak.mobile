import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import useAppleSignInHook from 'helpers/hooks/auth/useAppleSignInHook';
import useEmailPasswordSignInHook from 'helpers/hooks/auth/useEmailPasswordSignInHook';
import useGoogleSignInHook from 'helpers/hooks/auth/useGoogleSignInHook';
import useTranslation from 'helpers/hooks/useTranslation';
import { useState } from 'react';

export default function useRegisterHook() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const navigation = useNavigation<RootNavigation>();

  const onLoginSuccess = () => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: 'HOME' }],
    });
    navigation.dispatch(action);
  };

  const goToLogin = () => {
    navigation.navigate('LOGIN');
  };

  const { signIn: signInWithGoogle, loading: googleLoading } =
    useGoogleSignInHook({ onLoginSuccess });

  const { createUser, loading: createLoading } = useEmailPasswordSignInHook({
    onLoginSuccess,
  });

  const { signIn: signInWithApple, loading: appleSignInLoading } =
    useAppleSignInHook({
      onLoginSuccess,
    });

  const { i18n } = useTranslation();

  const onChangeEmail = (text: string) => {
    if (emailError) setEmailError('');
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    if (passwordError) setPasswordError('');
    setPassword(text);
  };

  const onChangeConfirmPassword = (text: string) => {
    if (confirmError) setConfirmError('');
    setConfirmPassword(text);
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
    if (password !== confirmPassword) {
      setConfirmError(i18n.t('register.password_dont_match'));
      return false;
    }
    return true;
  };

  const onPressSubmit = async () => {
    const isValid = submitPreCheck();
    if (!isValid) {
      return;
    }
    await createUser(email, password);
  };

  return {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmError,
    googleLoading,
    createLoading,
    appleSignInLoading,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    onPressSubmit,
    signInWithGoogle,
    goToLogin,
    signInWithApple,
  };
}

