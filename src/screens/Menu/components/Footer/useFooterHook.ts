import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {RootNavigation} from 'containers/Router/Router.type';
// import {PRIVACY_POLICY_URL, TERMS_OF_USE_URL} from 'constants/urls';

const useFooterHook = () => {
  const navigation = useNavigation<RootNavigation>();

  const openTermsOfUse = () => {
    // navigation.navigate('WEBVIEW', {uri: TERMS_OF_USE_URL});
  };

  const openPrivacyPolicy = () => {
    // navigation.navigate('WEBVIEW', {uri: PRIVACY_POLICY_URL});
  };

  return {
    openPrivacyPolicy,
    openTermsOfUse,
  };
};

export default useFooterHook;
