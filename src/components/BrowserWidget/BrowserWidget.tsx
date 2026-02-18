import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import WebView, {WebViewNavigation} from 'react-native-webview';

import BrowserBottom from './components/BrowserBottom';
import BrowserHeader from './components/BrowserHeader';
import useTranslation from 'helpers/hooks/useTranslation';
import {useThemeColor} from 'helpers/hooks/useThemeColor';
import {RootNavigation} from 'containers/Router/Router.type';
import Divider from 'components/CoreComponents/Divider/Divider';
import {Block, Spinner} from 'components/CoreComponents';
import Display from 'components/CoreComponents/Display';

interface Props {
  uri: string;
  incognito?: boolean;
  injectedScript?: string;
  onMessage?: () => void;
  showBottom?: boolean;
}

const BrowserWidget: React.FC<Props> = ({
  uri,
  incognito = true,
  injectedScript,
  showBottom = true,
}) => {
  const {i18n} = useTranslation();
  const webviewRef = useRef<WebView>();
  const [backQueue, setBackQueue] = useState<string[]>([]);
  const [forwardQueue, setForwardQueue] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState(uri);
  const [title, setTitle] = useState(i18n.t('common.loading'));
  const [loading, setLoading] = useState(false);

  const [backgroundColor] = useThemeColor(['neutral.200']);

  const navigation = useNavigation<RootNavigation>();

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (currentUrl === event.url) {
      return;
    }
    backQueue.push(currentUrl);
    setBackQueue(backQueue);
    setCurrentUrl(event.url);
  };

  const onPressBack = () => {
    if (backQueue.length === 0) {
      return;
    }
    const newUrl = backQueue[backQueue.length - 1];
    forwardQueue.push(currentUrl);
    setForwardQueue(forwardQueue);
    backQueue.pop();
    setBackQueue(backQueue);
    setCurrentUrl(newUrl);
  };

  const onPressForward = () => {
    if (forwardQueue.length == 0) {
      return;
    }
    const newUrl = forwardQueue[forwardQueue.length - 1];
    backQueue.push(currentUrl);
    setBackQueue(backQueue);
    forwardQueue.pop();
    setForwardQueue(forwardQueue);
    setCurrentUrl(newUrl);
  };

  const onClose = () => {
    navigation.pop();
    setTimeout(() => {
      setBackQueue([]);
      setForwardQueue([]);
      setCurrentUrl(uri);
    }, 200);
  };

  const onPressRefresh = () => {
    webviewRef.current?.reload();
  };

  return (
    <>
      <BrowserHeader
        title={title}
        onPressClose={onClose}
        onPressRefresh={onPressRefresh}
      />
      <Divider />
      <Block flex={1}>
        <WebView
          ref={webviewRef as any}
          source={{uri: currentUrl}}
          injectedJavaScript={
            injectedScript
              ? `${injectedScript}window.ReactNativeWebView.postMessage(document.title);`
              : 'window.ReactNativeWebView.postMessage(document.title);'
          }
          onMessage={(event: any) => setTitle(event.nativeEvent.data)}
          onLoadEnd={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          onError={() => setLoading(false)}
          onNavigationStateChange={onNavigationStateChange}
          incognito={incognito}
          style={[styles.webview, {backgroundColor}]}
        />
        <Spinner fullScreen loading={loading} />
      </Block>
      <Divider backgroundColour={'neutral.400'} />
      <Display show={showBottom}>
        <BrowserBottom
          previousActive={backQueue.length > 0}
          nextActive={forwardQueue.length > 0}
          currentUrl={currentUrl}
          onPressPrevious={onPressBack}
          onPressNext={onPressForward}
          title={title}
        />
      </Display>
    </>
  );
};

export default BrowserWidget;

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
  },
});
