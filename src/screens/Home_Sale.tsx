import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import HeaderDate from '../components/HeaderDate';
import globalStyle from '../globalStyle';
import Header from '../components/Header';
import Percent from '../components/Percent';

const OrderPreview = (props: any) => {
  return (
    <View style={styles.wrapper}>
      <Header
        text="总销售明细"
        navigation={props.navigation}
        rightElement={<HeaderDate />}
      />
      <View style={globalStyle.flex_1}>
        <ScrollView style={{height: '100%'}}>
          <View style={globalStyle.topBox}>
            <View style={globalStyle.flexBox}>
              <Text style={globalStyle.text1}>总销售额</Text>
              <Text style={globalStyle.text2}>共309订单</Text>
            </View>
            <Text style={globalStyle.text3}>7040</Text>
          </View>
          <View style={styles.container}>
            <Percent />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
  },
});

export default OrderPreview;
