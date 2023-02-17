import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import globalStyle from '../globalStyle';
import MyImage from '../components/MyImage';
import Header from '../components/Header';

const Percent = (props: any) => {
  return (
    <>
      <View style={globalStyle.flexBox}>
        <Text style={globalStyle.flex_1}>游乐园项目</Text>
        <Text style={styles.text1}>8000</Text>
        <Text style={styles.text2}>|</Text>
        <Text style={styles.text3}>100%</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={{...styles.in, width: '20%'}} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: 10,
    marginRight: 10,
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
