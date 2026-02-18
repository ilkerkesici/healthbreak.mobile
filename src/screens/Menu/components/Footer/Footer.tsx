import React from 'react';

import useFooterHook from './useFooterHook';
import {Block, Icon, Text} from 'components/CoreComponents';
import useTranslation from 'helpers/hooks/useTranslation';

const Footer = () => {
  const {i18n} = useTranslation();
  const {openPrivacyPolicy, openTermsOfUse} = useFooterHook();
  return (
    <Block fill>
      <Icon fill name={'o:trade_mark'} colour="neutral.400" />
      <Text
        marginTop={15}
        marginBottom={12}
        variant="subhead"
        size="xs"
        underline
        onPress={openTermsOfUse}
        colour="neutral.700">
        {i18n.t('footer.tems_of_use')}
      </Text>
      <Text
        onPress={openPrivacyPolicy}
        variant="subhead"
        size="xs"
        colour="neutral.700"
        underline>
        {i18n.t('footer.privacy_policy')}
      </Text>
    </Block>
  );
};

export default Footer;
