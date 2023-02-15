import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MyImage from '../components/MyImage';
import Header from '../components/Header';

const OrderPreview = (props: any) => {
  return (
    <View style={styles.wrapper}>
      <Header text="页面标题" navigation={props.navigation} />
      <View style={styles.top}></View>
      <View style={styles.flex_1}>
        <ScrollView style={{height: '100%'}}></ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
  },
  top: {},
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex_1: {
    flex: 1,
  },
});

export default OrderPreview;
