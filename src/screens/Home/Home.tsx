import ScreenContainer from 'containers/ScreenContainer/ScreenContainer';
import React, { useState } from 'react';

import { ExerciseHistory } from './components/ExerciseHistory';
import { HomeHeader } from './components/HomeHeader';
import { NextExercise } from './components/NextExercise';
import { TipCard } from './components/TipCard';
import { WeeklyRhythm } from './components/WeeklyRhythm';
import { SettingsModal } from './components/SettingsModal';
import { ScrollView, StyleSheet } from 'react-native';
import { DEFAULT_SCREEN_HORIZONTAL_PADDING } from 'constants/design';
import { Block } from 'components/CoreComponents';

const Home = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <ScreenContainer safeAreaTop bgColor="bg-2">
      <HomeHeader onPressProfile={() => setSettingsVisible(true)} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <NextExercise />
        <WeeklyRhythm />
        <Block fill marginVertical={24}>
          <TipCard />
        </Block>
        <ExerciseHistory />
      </ScrollView>
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </ScreenContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  contentContainer: {
    paddingHorizontal: DEFAULT_SCREEN_HORIZONTAL_PADDING,
    paddingBottom: 42
  },
});
