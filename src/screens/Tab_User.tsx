import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../components/Button';
import Header from '../components/Header';
import http from '../utils/http';

const User = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('加载中');
  const handleLogOut = () => {
    setLoading(true);
    setLoadingText('正在退出');
    http.postRequest({url: 'app/v1.0/user/logout'}).finally(() => {
      setLoading(false);
      AsyncStorage.removeItem('@user_info');
      AsyncStorage.removeItem('@login_info');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    });
  };
  const handleConfirmLogOut = () => {
    Alert.alert('确定要退出当前账号吗?', '退出后需要重新登录', [
      {text: '取消'},
      {text: '确认', onPress: handleLogOut},
    ]);
  };
  return (
    <>
      <Header text="个人中心" disableBack />
      <View style={styles.logoutWrapper}>
        <MyButton
          title="退出登录"
          type="primary-line"
          onPress={handleConfirmLogOut}
        />
      </View>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  logoutWrapper: {
    padding: 20,
  },
});
