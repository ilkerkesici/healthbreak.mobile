import React from 'react';

import useUserInfoHook from './useUserInfoHook';
import {MarginDesignProps} from 'types/design';
import Avatar from 'components/CoreComponents/Avatar';
import {Block, Icon, Text} from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';
import Display from 'components/CoreComponents/Display';

interface Props extends MarginDesignProps {
  pressable?: boolean;
}

const UserInfo: React.FC<Props> = ({pressable = true}) => {
  const {i18n} = useTranslation();
  const {userEmail, avatarText, userName, isLoggedIn, onPress} =
    useUserInfoHook(pressable);
  const renderLeft = () => (
    <Avatar
      text={isLoggedIn && avatarText ? avatarText : undefined}
      marginRight={10}
      backgroundColour="neutral.400"
      iconColor="neutral.600"
    />
  );

  return (
    <Block onPress={onPress} fill padding={15} activeOpacity={1}>
      <Block fill flexDirection="row">
        {renderLeft()}
        <Block fillInRow>
          <Text fill left variant="headline" size="sm" fontWeight="600">
            {isLoggedIn ? userName || '-' : i18n.t('drawer.login')}
          </Text>
          <Text
            marginTop={4}
            fill
            left
            variant="subhead"
            size="xs"
            color="neutral.800">
            {userEmail || i18n.t('drawer.welcome')}
          </Text>
        </Block>
        <Display show={pressable}>
          <Icon name="o:chevron_right" />
        </Display>
      </Block>
    </Block>
  );
};

export default UserInfo;
