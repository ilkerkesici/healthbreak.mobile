import React from 'react';

import {RouteProp} from '@react-navigation/native';
import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import BrowserWidget from 'components/BrowserWidget/BrowserWidget';
import {RootStackParamList} from 'containers/Router/Router.type';

type StackRouteProp = RouteProp<RootStackParamList, 'BROWSER'>;

interface Props {
  route: StackRouteProp;
}

const Browser: React.FC<Props> = ({route}) => {
  const {uri, incognito} = route.params;

  return (
    <ScreenContainer>
      <BrowserWidget uri={uri} incognito={incognito} />
    </ScreenContainer>
  );
};

export default Browser;
