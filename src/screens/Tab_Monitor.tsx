import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

const Monitor = () => {
  return (
    <>
      <Header text="实时监控" disableBack />
      <Text style={styles.container}>Monitor</Text>
    </>
  );
};

export default Monitor;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
