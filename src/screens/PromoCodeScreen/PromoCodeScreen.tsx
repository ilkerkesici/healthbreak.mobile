import { Block, Button, Text, TextInput } from 'components/CoreComponents';
import HeaderV2 from 'components/HeaderV2';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { RootNavigation } from 'containers/Router/Router.type';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import useToastHook from 'helpers/hooks/useToastHook';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import usePremiumHook from 'helpers/hooks/usePremiumHook';

const PROM_CODE = 'om]4L!@VYD860';

const PromoCodeScreen = () => {
  const [promoCode, setPromoCode] = useState('');
  const { i18n } = useTranslation();
  const { showToast } = useToastHook();
  const navigation = useNavigation<RootNavigation>();
  const { changePremiumStatus } = usePremiumHook();

  const onPressApply = () => {
    if (promoCode === PROM_CODE) {
      changePremiumStatus(true);
      showToast(
        i18n.t('promo_code.promo_code_applied_successfully'),
        'success',
      );
      navigation.goBack();
    } else {
      showToast(i18n.t('promo_code.promo_code_not_found'), 'error');
    }
  };
  return (
    <ScreenContainer safeAreaTop>
      <Block
        fill
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        justifyContent="flex-start"
      >
        <HeaderV2 title={i18n.t('promo_code.title')} back />
        <Text size="sm" fill left marginBottom={20}>
          {i18n.t('promo_code.description')}
        </Text>
        <TextInput
          fill
          placeholder={i18n.t('promo_code.enter_promo_code')}
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <Block marginTop={20} />
        <Button fill text={i18n.t('promo_code.apply')} onPress={onPressApply} />
      </Block>
    </ScreenContainer>
  );
};

export default PromoCodeScreen;
