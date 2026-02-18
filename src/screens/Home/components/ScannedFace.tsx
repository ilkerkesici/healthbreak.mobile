import { Block, Button, Spinner, Text } from 'components/CoreComponents';
import Image from 'components/CoreComponents/Image/Image';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import useTranslation from 'helpers/hooks/useTranslation';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootNavigation } from 'containers/Router/Router.type';
import { Linking, StyleSheet } from 'react-native';
import { RequestImageResponse } from 'types/models';
import LinearGradient from 'react-native-linear-gradient';
import { DateTime } from 'luxon';
import Progress from 'components/CoreComponents/Progress/Progress';
import { getProgressColor } from 'helpers/utils/utils';
import Display from 'components/CoreComponents/Display';
import { useProcessHook } from 'helpers/hooks/useProcessHook';
import useAuthHook from 'helpers/hooks/useAuthHook';

interface ScanFaceProps {
  height: number;
  width: number;
  requestImage: RequestImageResponse;
}

export const ScannedFace = memo(({ width, requestImage }: ScanFaceProps) => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<RootNavigation>();
  const request = requestImage.requests[0];

  const progressWidth = (width - 60) / 2;
  const status = request.status;
  const interval = useRef<any>(null);

  const { user } = useAuthHook();
  const { getImages } = useProcessHook();

  console.log('user', user);

  const onPressScanFace = useCallback(() => {
    if (request.status === 'error') {
      Linking.openURL(
        `mailto:info@venei.co?subject=Error in analyzing my face&body=${i18n.t(
          'home.analyse_error_message',
          { token: user?.fb_uuid },
        )}`,
      );
      return;
    }
    if (request.status === 'completed' && request.channel) {
      navigation.navigate('FACE_SCAN_RESULTS', {
        channelId: request.channel,
      });
    } else if (request.status === 'error') {
      Linking.openURL(
        `mailto:info@venei.co?subject=Error in analyzing my face&body=${i18n.t(
          'home.analyse_error_message',
          { token: user?.fb_uuid },
        )}`,
      );
    }
  }, [navigation, request, user, i18n]);

  // request.status = 'created';

  const buttonText =
    request.status === 'completed'
      ? i18n.t('home.view_results')
      : request.status === 'error'
      ? i18n.t('home.analyse_again')
      : i18n.t('home.analyzing');

  useEffect(() => {
    if (status === 'created') {
      interval.current = setInterval(() => {
        console.log('getImages');
        getImages();
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [status, getImages]);

  const showButton =
    request.status === 'completed' || request.status === 'error';

  return (
    <Block fill paddingTop={50}>
      <Block
        style={[styles.container, { width }]}
        height={'100%'}
        backgroundColour={'custom-wb'}
      >
        <Image
          source={{ uri: requestImage.requests[0].image }}
          width={width}
          height={'100%' as any}
          borderRadius={20}
        />
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,0.8)',
            'rgba(0,0,0,0.9)',
          ]}
          style={[styles.gradientOverlay, { width }]}
          // locations={[0, 0.5, 0.8, 1]}
        />
        <Block width={width} style={styles.otherView}>
          <Block fill marginTop={30}>
            <Display
              show={
                request.status === 'completed' || request.status === 'error'
              }
            >
              <Text
                variant="headline"
                size="xl"
                fontWeight="600"
                style={styles.text}
                marginBottom={20}
              >
                {DateTime.fromSQL(request.request_created_at).toFormat(
                  'dd MMM yyyy',
                )}
              </Text>
            </Display>
            <Display show={request.status === 'completed'}>
              <Block fill flexDirection="row" paddingHorizontal={20}>
                <Block fillInRow alignItems="flex-start" marginRight={20}>
                  <Text fill left marginBottom={10}>
                    {i18n.t('home.analyse_results.overall')}
                  </Text>
                  <Progress
                    width={progressWidth}
                    currentCount={request.overall}
                    progressColor={getProgressColor(request.overall)}
                    totalCount={100}
                    showCount
                  />
                </Block>
                <Block fillInRow alignItems="flex-start">
                  <Text fill left marginBottom={10}>
                    {i18n.t('home.analyse_results.potential')}
                  </Text>
                  <Progress
                    width={progressWidth}
                    currentCount={request.potential}
                    progressColor={getProgressColor(request.potential)}
                    totalCount={100}
                    showCount
                  />
                </Block>
              </Block>
            </Display>
            <Display show={request.status === 'error'}>
              <Text fill center>
                {i18n.t('home.error_message')}
              </Text>
            </Display>
          </Block>
          <Spinner
            loading={request.status === 'created'}
            fullScreen
            bgColor={'transparent'}
            text={i18n.t('common.analyzing')}
          />
        </Block>
      </Block>

      <Button
        fill
        size="lg"
        text={buttonText}
        paddingHorizontal={DEFAULT_SCREEN_HORIZONTAL_PADDING}
        marginTop={30}
        onPress={onPressScanFace}
        disabled={!showButton}
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
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  otherView: {
    position: 'absolute',
    bottom: 0,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 2,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
  },
});
