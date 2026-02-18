import {CommonActions, useNavigation} from '@react-navigation/native';
import {Block, Icon, Spinner} from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';
import {RootNavigation} from 'containers/Router/Router.type';
import useAppleSignInHook from 'helpers/hooks/auth/useAppleSignInHook';
import useGoogleSignInHook from 'helpers/hooks/auth/useGoogleSignInHook';
import React, {memo, useCallback} from 'react';
import {Platform} from 'react-native';

const SocialLoginRow = () => {
  const navigation = useNavigation<RootNavigation>();

  const onLoginSuccess = useCallback(() => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{name: 'TABBAR_STACK'}],
    });
    navigation.dispatch(action);
  }, [navigation]);

  const {signIn: signInGoogle, loading: loadingGoogle} = useGoogleSignInHook({
    onLoginSuccess,
  });
  const {signIn: signInApple, loading: loadingApple} = useAppleSignInHook({
    onLoginSuccess,
  });

  return (
    <Block fill flexDirection="row">
      <Block
        fillInRow
        marginRight={Platform.OS === 'ios' ? 6 : 0}
        padding={10}
        borderRadius={4}
        borderWidth={1}
        borderColor="neutral.400"
        backgroundColour="custom-wn"
        onPress={signInGoogle}>
        <Display show={!loadingGoogle}>
          <Icon name="o:google" />
        </Display>
        <Spinner simple size="small" loading={loadingGoogle} />
      </Block>
      <Display show={Platform.OS === 'ios'}>
        <Block
          fillInRow
          marginLeft={6}
          padding={10}
          borderRadius={4}
          borderWidth={1}
          borderColor="neutral.400"
          backgroundColour="custom-wn"
          onPress={signInApple}>
          <Display show={!loadingApple}>
            <Icon name="o:apple" color="neutral.950" />
          </Display>
          <Spinner simple size="small" loading={loadingApple} />
        </Block>
      </Display>
    </Block>
  );
};

export default memo(SocialLoginRow);
