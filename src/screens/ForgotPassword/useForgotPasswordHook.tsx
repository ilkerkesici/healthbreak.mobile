import {useNavigation} from '@react-navigation/native';
import {RootNavigation} from 'containers/Router/Router.type';
import useEmailPasswordSignInHook from 'helpers/hooks/auth/useEmailPasswordSignInHook';
import useToastHook from 'helpers/hooks/useToastHook';
import useTranslation from 'helpers/hooks/useTranslation';
import {useState} from 'react';

export default function useForgotPasswordHook() {
  const [email, setEmail] = useState('');

  const {i18n} = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const {sendPassworReset, loading} = useEmailPasswordSignInHook({});
  const {showToast} = useToastHook(5000);

  const onPressSubmit = async () => {
    if (!email) {
      return;
    }

    await sendPassworReset(email);
    navigation.goBack();
    showToast(i18n.t('forgot_password.reset_link_message'), 'success');
  };

  const buttonDisabled = !email;
  return {email, buttonDisabled, loading, setEmail, onPressSubmit};
}
