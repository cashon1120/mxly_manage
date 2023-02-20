import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'mobx-react';
import Navigation from './src/navigation/index';
import rootStore from './src/models/global';
import Loading from './src/components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './src/utils/http';
import {RootSiblingParent} from 'react-native-root-siblings';
import {saveLoginInfo} from './src/utils/commonUtils';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [defaultPage, setDefaultPage] = useState('Root');
  const getStorage = async () => {
    const info = await AsyncStorage.getItem('@user_info');
    const loginInfo = await AsyncStorage.getItem('@login_info');
    const params = JSON.parse(loginInfo || '{}');
    if (info && params && params.userName && params.password) {
      http
        .postRequest({url: 'app/v1.0/user/login', params})
        .then((res: any) => {
          switch (res.errorCode) {
            case 0:
              saveLoginInfo(res.result, params);
              break;
            case 1:
              setDefaultPage('Login');
              break;
            default:
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDefaultPage('Login');
    }
  };

  useEffect(() => {
    getStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading ? (
    <Loading visible={true} />
  ) : (
    <Provider rootStore={rootStore}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <Navigation defaultPage={defaultPage} />
        </RootSiblingParent>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
