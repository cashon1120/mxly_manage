/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  backgroundColor?: string;
  children?: any;
  radius?: boolean;
}

const SafeBottom: React.FC<Props> = props => {
  const insets = useSafeAreaInsets();
  const {backgroundColor, radius} = props;
  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: backgroundColor || '#fff',
        paddingBottom: insets.bottom,
        borderTopLeftRadius: radius ? 12 : 0,
        borderTopRightRadius: radius ? 12 : 0,
      }}>
      {props.children}
    </View>
  );
};

export default React.memo(SafeBottom);
