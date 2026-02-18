import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {RootNavigation} from 'containers/Router/Router.type';
import useAuthHook from 'helpers/hooks/useAuthHook';

const useUserInfoHook = (pressable?: boolean) => {
  const [notUsed, setNotUsed] = useState(false);
  const navigation = useNavigation<RootNavigation>();
  const {isLoggedIn, user} = useAuthHook();

  const onPress = () => {
    if (!pressable) {
      return;
    }
    if (!isLoggedIn) {
      navigation.navigate('LOGIN');
    } else {
      navigation.navigate('ACCOUNT');
    }
  };

  const closeModal = () => {
    setNotUsed(false);
  };

  const userEmail = user?.email;
  const userName = user?.fullname;
  const avatarText = `${user?.fullname?.[0] || ''}`;

  return {
    avatarText,
    userEmail,
    userName,
    isLoggedIn,
    notUsed,
    onPress,
    closeModal,
  };
};

export default useUserInfoHook;
