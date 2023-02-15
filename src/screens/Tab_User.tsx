import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
const User = () => {
  return (
    <>
      <Header text="个人中心" disableBack />
      <Text style={styles.container}>User</Text>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
