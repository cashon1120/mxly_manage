/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ToastAndroid, BackHandler} from 'react-native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {BottomTabParamList} from './types';
import BarIcon from './icon';
import Home from '../screens/Tab_Home';
// import Monitor from '../screens/Tab_Monitor';
// import Report from '../screens/Tab_Report';
import User from '../screens/Tab_User';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  let lastBackPressed: number = 0;

  useAndroidBackHandler(() => {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
    } else {
      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出萌熊乐园', 1000);
    }
    return true;
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: options => <BarIcon route={route} options={options} />,
        header: () => <></>,
        tabBarActiveTintColor: '#E75120',
        tabBarLabelStyle: {
          fontSize: 12,
          top: -5,
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: '首页',
        }}
      />
      {/* <BottomTab.Screen
        name="Monitor"
        component={Monitor}
        options={{
          title: '监控',
        }}
      />
      <BottomTab.Screen
        name="Report"
        component={Report}
        options={{
          title: '报表',
        }}
      /> */}
      <BottomTab.Screen
        name="User"
        component={User}
        options={{
          title: '我的',
        }}
      />
    </BottomTab.Navigator>
  );
}
