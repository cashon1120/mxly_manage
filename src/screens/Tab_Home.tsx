import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
const Home = () => {
  return (
    <>
      <Header text="首页" disableBack />
      <Text style={styles.container}>Home</Text>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
