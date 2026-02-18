/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../Router.type';

import Tabbar from 'components/Tabbar/Tabbar';
import Home from 'screens/Home/Home';
import Menu from 'screens/Menu/Menu';
import Tasks from 'screens/Tasks/Tasks';

const Tab = createBottomTabNavigator<RootStackParamList>();
const tabOptions = {
  headerShown: false,
  tabBarStyle: {
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
};

const screenOptions = { headerShown: false };

const TabbarStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      backBehavior="none"
      screenOptions={tabOptions}
      tabBar={(props: BottomTabBarProps) => <Tabbar {...props} />}
    >
      <Tab.Screen options={screenOptions} name="HOME" component={Home} />
      <Tab.Screen options={screenOptions} name="TASKS" component={Tasks} />
      <Tab.Screen options={screenOptions} name="MENU" component={Menu} />
    </Tab.Navigator>
  );
};

export default TabbarStack;
