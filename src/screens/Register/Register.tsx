import {
  Block,
  Button,
  Icon,
  Spinner,
  Text,
  TextInput,
} from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useRegisterHook from './useRegisterHook';
import { SecondaryHeader } from 'components/Header/SecondaryHeader';

export default function Register() {
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const {
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
  } = useRegisterHook();

  return (
    <ScreenContainer bgColor="bg-2">
      <SecondaryHeader back title={i18n.t('register.title')} />
      <Block
        fill
        flex={1}
        paddingBottom={insets.bottom + 10}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        alignItems="flex-start"
      >
        <Text
          marginTop={10}
          marginBottom={30}
          variant="body"
          size="sm"
          color="neutral.700"
          fill
          center
        >
          {i18n.t('register.subtitle')}
        </Text>
        <TextInput
          fill
          label={i18n.t('register.email')}
          keyboardType="email-address"
          autoCapitalize={'none'}
          placeholder={i18n.t('register.enter_email')}
          value={email}
          errorText={emailError}
          onChangeText={onChangeEmail}
        />
        <Block marginTop={20} />
        <TextInput
          fill
          label={i18n.t('register.create_password')}
          secureTextEntry
          placeholder={i18n.t('register.enter_password')}
          value={password}
          errorText={passwordError}
          onChangeText={onChangePassword}
        />
        <Block marginTop={20} />
        <TextInput
          fill
          label={i18n.t('register.confirm_password')}
          secureTextEntry
          placeholder={i18n.t('register.enter_confirm_password')}
          value={confirmPassword}
          errorText={confirmError}
          onChangeText={onChangeConfirmPassword}
        />

        <Block marginTop={24} />
        <Button
          fill
          size="lg"
          text={i18n.t('register.create_account')}
          onPress={onPressSubmit}
          loading={createLoading}
        />

        <Block fill flexDirection="row" marginVertical={20}>
          <Block fillInRow height={2} backgroundColour="neutral.400" />
          <Text variant="caption1" size="xl" marginHorizontal={20}>
            {i18n.t('register.or')}
          </Text>
          <Block fillInRow height={2} backgroundColour="neutral.400" />
        </Block>

        <Block
          fill
          paddingVertical={15}
          borderRadius={99}
          borderWidth={1}
          borderColor="neutral.400"
          backgroundColour="custom-wb"
          flexDirection="row"
          height={56}
          onPress={signInWithGoogle}
        >
          {!googleLoading ? (
            <>
              <Icon name="o:google" size={20} />
              <Text
                variant="caption1"
                size="xl"
                marginLeft={12}
                fontWeight="500"
              >
                {i18n.t('register.sign_up_with_google')}
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
            borderRadius={99}
            borderWidth={1}
            borderColor="neutral.400"
            backgroundColour="custom-wb"
            height={56}
            flexDirection="row"
            onPress={signInWithApple}
          >
            {!appleSignInLoading ? (
              <>
                <Icon name="o:apple" size={20} />
                <Text
                  variant="caption1"
                  size="xl"
                  marginLeft={12}
                  fontWeight="500"
                >
                  {i18n.t('register.sign_up_with_apple')}
                </Text>
              </>
            ) : null}
            <Spinner loading={appleSignInLoading} size={'small'} />
          </Block>
        </Display>
        <Block flex={1} />
        <Text color="neutral.600" variant="caption1" size="xl" fill center>
          {`${i18n.t('register.have_account')} `}
          <Text
            onPress={goToLogin}
            color="primary.500"
            variant="caption1"
            size="xl"
          >
            {i18n.t('register.go_to_login')}
          </Text>
        </Text>
      </Block>
    </ScreenContainer>
  );
}

