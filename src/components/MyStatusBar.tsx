import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export type BarStypeProps = 'light-content' | 'defalut' | 'dark-content';

const MyStatusBar = (props: any) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      backgroundColor="rgba(0,0,0,.0)"
      {...props}
      barStyle={props.barStyle || 'light-content'}
      translucent
    />
  ) : null;
};

export default MyStatusBar;
