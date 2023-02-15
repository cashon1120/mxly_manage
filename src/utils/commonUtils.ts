import {Dimensions, NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dayjs from 'dayjs';

export const formatDate = (value: number, type = 'YYYY-MM-DD HH:mm:ss') => {
  if (value) {
    return dayjs(value * 1000).format(type);
  }
  return '--';
};

// 获取节点数据?
export const getComponentInfo = (event: any) => {
  let {x, y, width, height} = event.nativeEvent.layout;
  return {
    x,
    y,
    width,
    height,
  };
};

export const saveLoginInfo = (res: any, params: any) => {
  const {token, userName, avatar, permissionMap} = res;
  AsyncStorage.setItem(
    '@user_info',
    JSON.stringify({
      token,
      userName,
      avatar,
      permissionMap,
    }),
  );
  AsyncStorage.setItem('@login_info', JSON.stringify(params));
};

export const setImageSize = (width: number, height: number) => {
  const percent = width / 750;
  const screenWidth = Dimensions.get('window').width;
  const imgHeight = (screenWidth * height) / width;
  return {
    width: screenWidth * percent,
    height: imgHeight * percent,
  };
};

export const getBarHeight = () => {
  return new Promise((resolve: any) => {
    const {StatusBarManager} = NativeModules;
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight: any) => {
        resolve(statusBarHeight.height);
      });
    } else {
      resolve(StatusBarManager.HEIGHT);
    }
  });
};

export const formatNumber = (value: number) => {
  if (value.toString().indexOf('.') > -1) {
    return Number(value.toFixed(2));
  }
  return value;
};
