import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
const Report = () => {
  return (
    <>
      <Header text="统计报表" disableBack />
      <Text style={styles.container}>Report</Text>
    </>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
