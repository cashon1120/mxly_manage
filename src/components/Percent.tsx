import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyle from '../globalStyle';

interface Props {
  name: string;
  num: number;
  ratio: number;
}

const Percent = (props: Props) => {
  const {name, num, ratio} = props;
  return (
    <View style={styles.container}>
      <View style={globalStyle.flexBox}>
        <Text style={globalStyle.flex_1}>{name}</Text>
        <Text style={styles.text1}>{num}</Text>
        <Text style={styles.text2}>|</Text>
        <Text style={styles.text3}>{ratio}%</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={{...styles.in, width: `${ratio}%`}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  wrapper: {
    backgroundColor: '#ddd',
    borderRadius: 2,
    height: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  text1: {
    color: '#333',
  },
  text2: {
    marginLeft: 15,
    marginRight: 15,
    color: '#999',
  },
  text3: {
    color: '#999',
  },
  in: {
    backgroundColor: '#E75120',
    height: 6,
  },
});

export default Percent;
