import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import {getBarHeight} from '../utils/commonUtils';
import {useStore} from '../models/global';

// 配置页面
import Login from '../screens/Login';

const RootNavigator = (props: any) => {
  return (
    <Stack.Navigator
      initialRouteName={props.defaultPage}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: 'float',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const Navigation = (props: any) => {
  const stroe = useStore('rootStore');
  getBarHeight().then((res: any) => {
    stroe.setBarHeight(res);
  });
  return (
    <NavigationContainer
      theme={props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator defaultPage={props.defaultPage} />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();
export default Navigation;
