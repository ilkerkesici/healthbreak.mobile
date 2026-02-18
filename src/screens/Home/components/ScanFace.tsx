import { Block, Button } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { memo, useCallback } from 'react';
import { useAppInitStore } from 'store/useAppInitStore';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { StyleSheet } from 'react-native';
import images from 'assets/images';
import useToastHook from 'helpers/hooks/useToastHook';
import usePremiumHook from 'helpers/hooks/usePremiumHook';

interface ScanFaceProps {
  height: number;
  width: number;
  isExistLastWeek: boolean;
}

export const ScanFace = memo(({ width, isExistLastWeek }: ScanFaceProps) => {
  const profile = useAppInitStore(s => s.profile);
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();

  const { showToast } = useToastHook();
  const { isPremium } = usePremiumHook();

  const onPressScanFace = useCallback(() => {
    if (!isPremium) {
      navigation.navigate('PAYWALL');
      return;
    }

    if (isExistLastWeek) {
      showToast(i18n.t('home.too_many_analyzes'), 'error');
      return;
    }
    navigation.navigate('SCAN_FACE');
  }, [navigation, i18n, isExistLastWeek, showToast, isPremium]);

  return (
    <Block fill paddingTop={50}>
      <Block
        style={[styles.container, { width }]}
        height={'100%'}
        backgroundColour={'custom-wb'}
      >
        <Image
          source={
            profile?.gender === 'f' ? images.scan_face_woman : images.scan_face
          }
          width={width}
          height={'100%'}
          borderRadius={20}
        />
      </Block>
      <Button
        fill
        size="lg"
        text={i18n.t('home.scan_face')}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        marginTop={30}
        onPress={onPressScanFace}
      />
    </Block>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: '#FF00FF',
  },
});
