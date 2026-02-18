import React, {useCallback} from 'react';

import {NavigationContext} from '@react-navigation/native';
import {UnderModalContext} from './UnderModalContext';

export const useModalContextBridges = () => {
  const navigation = React.useContext(NavigationContext);

  const renderUnderProviders = useCallback(
    (children: React.ReactNode) => {
      return (
        <UnderModalContext.Provider value={true}>
          <NavigationContext.Provider value={navigation}>
            {children}
          </NavigationContext.Provider>
        </UnderModalContext.Provider>
      );
    },
    [navigation],
  );

  return {renderUnderProviders};
};
