import React from 'react';
import {Text} from 'react-native';

const MyText = (props: any) => {
  return (
    <Text allowFontScaling={false} {...props}>
      {props.children}
    </Text>
  );
};
export default MyText;
