import {Block, Button, Text, TextInput} from 'components/CoreComponents';
import {DEFAULT_SCREEN_HORIZONTAL_PADDING} from 'constants/design';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useTranslation from 'helpers/hooks/useTranslation';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SecondaryHeader} from 'components/Header/SecondaryHeader';
import useForgotPasswordHook from './useForgotPasswordHook';

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const {i18n} = useTranslation();
  const {email, buttonDisabled, loading, setEmail, onPressSubmit} =
    useForgotPasswordHook();

  return (
    <ScreenContainer>
      <SecondaryHeader back title={i18n.t('forgot_password.title')} />
      <Block
        fill
        flex={1}
        paddingBottom={insets.bottom + 10}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        justifyContent="flex-start">
        <Text
          marginTop={10}
          marginBottom={0}
          variant="body"
          size="sm"
          color="neutral.700"
          fill
          center>
          {i18n.t('forgot_password.subtitle')}
        </Text>
        <Block height={50} />
        <TextInput
          fill
          label={i18n.t('forgot_password.email')}
          keyboardType="email-address"
          autoCapitalize={'none'}
          placeholder={i18n.t('forgot_password.enter_email')}
          value={email}
          onChangeText={setEmail}
        />

        <Button
          fill
          size="md"
          text={i18n.t('forgot_password.reset_password')}
          marginTop={30}
          onPress={onPressSubmit}
          loading={loading}
          disabled={buttonDisabled}
        />
      </Block>
    </ScreenContainer>
  );
}
