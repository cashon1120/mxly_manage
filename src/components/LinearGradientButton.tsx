import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from './MyText';

interface IProps {
  onPress: any;
  title: string;
}

const LinearGradientButton = (props: IProps) => {
  const {onPress, title} = props;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#F48B57', '#DB5036']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearGradientButton;

const styles: any = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
