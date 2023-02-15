import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from './MyText';

interface IProps {
  onPress: any;
  title?: string;
  radius?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  type?: 'primary' | 'default' | 'primary-line';
  size?: 'large' | 'middle' | 'small' | 'mini-small';
}

const Button = (props: IProps) => {
  const {
    onPress,
    title,
    disabled,
    size = 'middle',
    type,
    loading,
    loadingText = '加载中',
    radius,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{borderRadius: radius ? 20 : 5}}
      disabled={disabled}
      activeOpacity={0.7}>
      <View>
        <Text
          style={[
            styles.wrapper,
            disabled ? styles.disabled : null,
            radius ? styles.raidusWrapper : null,
            styles[type ? type : ''],
            styles[size],
          ]}>
          {loading ? loadingText : `${title || '确认'}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles: any = StyleSheet.create({
  large: {padding: 12, fontSize: 18},
  middle: {padding: 10, fontSize: 16},
  small: {padding: 8, fontSize: 14},
  'mini-small': {padding: 3, fontSize: 12, paddingHorizontal: 10},

  wrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
  },
  default: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#eee',
    borderWidth: 1,
  },
  primary: {
    color: '#fff',
    backgroundColor: '#FF5B38',
  },
  'primary-line': {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF5B38',
    color: '#FF5B38',
  },
  raidusWrapper: {
    borderRadius: 20,
  },

  disabled: {
    opacity: 0.5,
  },
});
