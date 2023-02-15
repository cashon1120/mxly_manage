import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useStore} from '../models/global';
import TopTitle from '../components/TopTitle';
import LinearGradientButton from '../components/LinearGradientButton';
import MyImage from '../components/MyImage';
import MyStatusBar from '../components/MyStatusBar';
import Loading from '../components/Loading';
import http from '../utils/http';
import {saveLoginInfo} from '../utils/commonUtils';

type Params = 'userName' | 'password';

interface IProps {
  navigation: any;
}

const Login = (props: IProps) => {
  const store = useStore('rootStore');
  const {navigation} = props;
  const [showPwd, setShowPwd] = useState(false);

  const [formValue, setFormVaue] = useState({
    userName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleSetFormValue = (value: string, key: Params) => {
    formValue[key] = value;
    setFormVaue({...formValue});
  };
  const handleSubmit = () => {
    if (loading) {
      return;
    }
    if (!formValue.userName) {
      Toast.show('请输入账号', {
        position: Toast.positions.CENTER,
      });
      return;
    }
    if (!formValue.password) {
      Toast.show('请输入密码', {
        position: Toast.positions.CENTER,
      });
      return;
    }
    setLoading(true);
    http
      .postRequest({url: 'mp/v1.0/user/login', params: formValue})
      .then((res: any) => {
        switch (res.errorCode) {
          case 0:
            store.setToken(res.result.token);
            saveLoginInfo(res.result, formValue);
            navigation.replace('Root');
            break;
          case 1:
            Alert.alert('账号或密码错误', '', [{text: '确认'}]);
            break;
          default:
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <MyStatusBar />
      <LinearGradient
        colors={['#F88F5B', '#DA4D34']}
        style={styles.linearGradient}>
        <TopTitle title="萌熊乐园" />
        <View style={styles.container}>
          <MyImage name="login_bg" width={609} height={708} />
          <View style={styles.form}>
            <View style={styles.formItem}>
              <MyImage name="icon_account" width={34} height={34} />
              <TextInput
                style={styles.input}
                value={formValue.userName}
                onChange={e =>
                  handleSetFormValue(e.nativeEvent.text, 'userName')
                }
                placeholder="请输入账号"
              />
            </View>
            <View style={styles.formItem}>
              <MyImage name="icon_pwd" width={34} height={34} />
              <TextInput
                style={styles.input}
                value={formValue.password}
                secureTextEntry={!showPwd}
                onChange={e =>
                  handleSetFormValue(e.nativeEvent.text, 'password')
                }
                placeholder="请输入密码"
              />
              <View style={styles.icon}>
                <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                  {!showPwd ? (
                    <MyImage name="pwd_hide" width={40} height={40} />
                  ) : (
                    <MyImage name="pwd_show" width={42} height={42} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.button}>
              <LinearGradientButton onPress={handleSubmit} title="登录" />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <MyImage name="login_body_bg" width={750} height={367} />
        </View>
        <Loading visible={loading} />
      </LinearGradient>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    top: -60,
    zIndex: 10,
    position: 'relative',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  form: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
  },
  formItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  input: {
    fontSize: 16,
    width: '100%',
    paddingLeft: 15,
  },
  icon: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 35,
  },
  button: {
    marginTop: 30,
  },
});
