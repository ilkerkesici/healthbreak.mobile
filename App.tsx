import SplashWidget from 'components/SplashWidget/SplashWidget';
import Toast from 'components/Toast/Toast';
import Router from 'containers/Router/Router';
import React, { useEffect } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AnalyticHelper from 'containers/analytic/AnalyticHelper';

const App = () => {
  useEffect(() => {
    AnalyticHelper.init();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <Router />
            <Toast />
            <SplashWidget />
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default App;
