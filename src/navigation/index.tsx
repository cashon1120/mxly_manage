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
import Home_Sale from '../screens/Home_Sale';
import Home_Money from '../screens/Home_Money';
import Home_Order from '../screens/Home_Order';
import Home_Charge from '../screens/Home_Charge';
import Home_Profit from '../screens/Home_Profit';
import Home_Charge_Detail from '../screens/Home_Charge_Detail';
import Home_Order_Detail from '../screens/Home_Order_Detail';

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
      <Stack.Screen name="Home_Sale" component={Home_Sale} />
      <Stack.Screen name="Home_Money" component={Home_Money} />
      <Stack.Screen name="Home_Order" component={Home_Order} />
      <Stack.Screen name="Home_Charge" component={Home_Charge} />
      <Stack.Screen name="Home_Profit" component={Home_Profit} />
      <Stack.Screen name="Home_Charge_Detail" component={Home_Charge_Detail} />
      <Stack.Screen name="Home_Order_Detail" component={Home_Order_Detail} />
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
