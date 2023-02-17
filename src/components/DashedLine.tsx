import React from 'react';
import {StyleSheet, View} from 'react-native';

const DashedLine = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left} />
      <View style={styles.top} />
      <View style={styles.bottom} />
    </View>
  );
};

export default DashedLine;

const styles: any = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: 'rgba(227, 227, 227, 1)',
    borderStyle: 'dashed',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0.1,
  },
  left: {
    width: 2,
    position: 'absolute',
    left: -1,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  top: {
    height: 2,
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  bottom: {
    height: 2,
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
});
