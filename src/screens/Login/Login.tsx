import {
  Block,
  Button,
  Icon,
  Spinner,
  Text,
  TextInput,
} from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useLoginHook from './useLoginHook';
import {SecondaryHeader} from 'components/Header/SecondaryHeader';
import {useTheme} from 'helpers/hooks/useThemeColor';

export default function Login() {
  const insets = useSafeAreaInsets();
  const {i18n} = useTranslation();
  const {
    email,
    password,
    emailError,
    passwordError,
    googleLoading,
    signInLoading,
    appleSignInLoading,
    goToRegister,
    onChangeEmail,
    onChangePassword,
    onPressSubmit,
    signInWithGoogle,
    goToForgotPassword,
    signInWithApple,
  } = useLoginHook();

  const {isDarkMode} = useTheme();
  return (
    <ScreenContainer>
      <SecondaryHeader back title={i18n.t('login.title')} />
      <Block
        fill
        flex={1}
        paddingBottom={insets.bottom + 10}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        alignItems="flex-start">
        <Text
          marginTop={10}
          marginBottom={30}
          variant="body"
          size="sm"
          color="neutral.700"
          fill
          center>
          {i18n.t('login.subtitle')}
        </Text>
        <TextInput
          fill
          label={i18n.t('login.email')}
          keyboardType="email-address"
          autoCapitalize={'none'}
          placeholder={i18n.t('login.enter_email')}
          value={email}
          errorText={emailError}
          onChangeText={onChangeEmail}
        />
        <Block marginTop={20} />
        <TextInput
          fill
          label={i18n.t('login.password')}
          secureTextEntry
          placeholder={i18n.t('login.enter_password')}
          value={password}
          errorText={passwordError}
          onChangeText={onChangePassword}
        />
        <Block fill marginVertical={14}>
          <Text
            onPress={goToForgotPassword}
            variant="caption1"
            size="xl"
            fill
            right>
            {i18n.t('login.forgot_password')}
          </Text>
        </Block>
        <Button
          fill
          size="md"
          text={i18n.t('login.signin')}
          onPress={onPressSubmit}
          loading={signInLoading}
        />

        <Block fill flexDirection="row" marginVertical={20}>
          <Block fillInRow height={2} backgroundColour="neutral.400" />
          <Text variant="caption1" size="xl" marginHorizontal={20}>
            {i18n.t('login.or')}
          </Text>
          <Block fillInRow height={2} backgroundColour="neutral.400" />
        </Block>

        <Block
          fill
          paddingVertical={15}
          borderRadius={6}
          borderWidth={1}
          borderColor="neutral.400"
          backgroundColour="custom-wb"
          flexDirection="row"
          height={56}
          onPress={signInWithGoogle}>
          {!googleLoading ? (
            <>
              <Icon name="o:google" size={20} />
              <Text
                variant="caption1"
                size="xl"
                marginLeft={12}
                color={!isDarkMode ? 'primary.800' : 'dark.100/50'}
                fontWeight="500">
                {i18n.t('login.sign_in_with_google')}
              </Text>
            </>
          ) : null}
          <Spinner loading={googleLoading} size={'small'} />
        </Block>

        <Display show={Platform.OS === 'ios'}>
          <Block
            fill
            marginTop={20}
            paddingVertical={15}
            borderRadius={6}
            borderWidth={1}
            borderColor="neutral.400"
            backgroundColour="custom-wb"
            height={56}
            flexDirection="row"
            onPress={signInWithApple}>
            {!appleSignInLoading ? (
              <>
                <Icon name="o:apple" size={20} />
                <Text
                  variant="caption1"
                  size="xl"
                  marginLeft={12}
                  color={!isDarkMode ? 'primary.800' : 'dark.100/50'}
                  fontWeight="500">
                  {i18n.t('login.sign_in_with_apple')}
                </Text>
              </>
            ) : null}
            <Spinner loading={appleSignInLoading} size={'small'} />
          </Block>
        </Display>
        <Block flex={1} />
        <Text color="neutral.600" variant="caption1" size="xl" fill center>
          {`${i18n.t('login.no_account')} `}
          <Text
            onPress={goToRegister}
            color="orange.500"
            variant="caption1"
            size="xl">
            {i18n.t('login.register')}
          </Text>
        </Text>
      </Block>
    </ScreenContainer>
  );
}
