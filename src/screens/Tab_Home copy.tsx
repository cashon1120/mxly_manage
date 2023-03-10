import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Animated,
} from 'react-native';
import {
  VictoryLine,
  VictoryTheme,
  VictoryChart,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStatusBar from '../components/MyStatusBar';
import Header from '../components/Header';
import HeaderDate from '../components/HeaderDate';
import Card from '../components/Card';
import Loading from '../components/Loading';
import http from '../utils/http';
import MyImage from '../components/MyImage';
import IndexData from '../components/IndexData';
import globalStyle from '../globalStyle';
import {useStore} from '../models/global';

const getMaxDomain = (value: number) => {
  const str = value.toFixed(0).toString();
  const length = str.length;
  const res = [];
  res[0] = Number(str[0]) + 1;
  for (let i = 0; i < length - 1; i++) {
    res.push(0);
  }
  return Number(res.join(''));
};

const formatDate = (date: string) => {
  const array = date.split('-');
  return `${array[1]}-${array[2]}`;
};

const formatOnlineData = (data: any) => {
  let maxDomain = 10;
  const result: any = [];
  Object.keys(data).forEach((key: string) => {
    const value = data[key];
    result.push({day: formatDate(key), number: value});
    maxDomain = value > maxDomain ? value : maxDomain;
  });
  return {
    data: result,
    maxDomain: getMaxDomain(maxDomain),
  };
};

const Home = (props: any) => {
  const store = useStore('rootStore');
  const [data, setData] = useState({
    consumeTotal: 0,
    consumeTotalRang: 0,
    paidIn: 0,
    paidInRang: 0,
    recharge: 0,
    rechargeRang: 0,
    orderCount: 0,
    orderCountRang: 0,
    profit: 0,
    profitRang: 0,
  });
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [monthOnlineList, setMonthOnlineList] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [maxDomain, setMaxDomain] = useState(10);
  const getStorage = async () => {
    let userInfo: any = await AsyncStorage.getItem('@user_info');
    userInfo = JSON.parse(userInfo || '{}');
    store.setUserInfo(userInfo);
    store.setSearchCompany(userInfo.companyID);
    getData();
  };

  const getData = () => {
    if (!store.searchParams.companyId) {
      return;
    }
    setVisible(true);
    http
      .postRequest({
        url: 'app/v1.0/playOrder/statistics/panel',
        params: {
          companyId: store.searchParams.companyId,
          beginTime: store.searchParams.beginTime.format('YYYY-MM-DD'),
          endTime: store.searchParams.endTime.format('YYYY-MM-DD'),
        },
      })
      .then((res: any) => {
        if (res.errorCode === 0) {
          setData(res.result);
          // const weekList = res.result.datePlayCount;
          // const formatData = formatOnlineData(weekList);
          // setMonthOnlineList(formatData.data);
          // setMaxDomain(formatData.maxDomain);
        }
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  useEffect(() => {
    getStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e: any) => {
    if (e.nativeEvent.contentOffset.y > 90) {
      setHeaderVisible(true);
    } else {
      setHeaderVisible(false);
    }
  };

  const handleDateChange = () => {
    getData();
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = headerVisible ? 1 : 0;
    Animated.timing(fadeAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, headerVisible]);

  const chartLeft: number = maxDomain.toString().length * 10 + 15;
  const maxDomainProps = maxDomain >= 10 ? {maxDomain: {y: maxDomain}} : {};

  const [, fourceUpdate] = useState(0);
  useFocusEffect(
    useCallback(() => {
      fourceUpdate(new Date().getTime());
      return () => {};
    }, []),
  );

  return (
    <View>
      {/* <Header headerText="????????????" /> */}
      <View style={styles.background} />
      <View style={styles.bg}>
        <Header
          showSelectCompany={store.userInfo.companyID === 1}
          text="???????????????"
          rightElement={<HeaderDate callback={handleDateChange} />}
          disableBack
        />
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={100}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              title={'????????????'}
              tintColor={'#fff'}
              titleColor={'#fff'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={styles.scrollViewContent}>
            <MyStatusBar barStyle="light-content" translucent />
            <MyImage
              style={styles.topImage}
              name="home_bg"
              width={750}
              height={406}
            />
            <View style={[styles.wrapper]}>
              <View style={styles.topReport}>
                <View style={globalStyle.flexBox}>
                  <IndexData
                    title="????????????"
                    data={data.consumeTotal}
                    range={data.consumeTotalRang}
                    showLine
                    page="Home_Sale"
                    navigation={props.navigation}
                  />
                  <IndexData
                    title="????????????"
                    page="Home_Money"
                    navigation={props.navigation}
                    data={data.paidIn}
                    range={data.paidInRang}
                  />
                </View>
                <View style={{...globalStyle.flexBox, marginTop: 20}}>
                  <IndexData
                    title="????????????"
                    page="Home_Charge"
                    data={data.recharge}
                    range={data.rechargeRang}
                    showLine
                    navigation={props.navigation}
                  />
                  <IndexData
                    title="?????????"
                    page="Home_Order"
                    data={data.orderCount}
                    range={data.orderCountRang}
                    showLine
                    navigation={props.navigation}
                  />
                  <IndexData
                    title="??????"
                    page="Home_Profit"
                    data={data.profit}
                    range={data.profitRang}
                    navigation={props.navigation}
                  />
                </View>
              </View>
              {/* <Card title="?????????????????????">
                <VictoryChart
                  height={Dimensions.get('window').width / 1.5}
                  theme={VictoryTheme.material}
                  padding={{left: chartLeft, top: 30, right: 60, bottom: 40}}
                  {...maxDomainProps}
                  containerComponent={
                    <VictoryZoomContainer zoomDimension="x" />
                  }>
                  <VictoryLine
                    labelComponent={<VictoryTooltip />}
                    x="day"
                    y="number"
                    style={{data: {stroke: '#EB4F28'}}}
                    data={monthOnlineList}
                  />
                </VictoryChart>
              </Card> */}
            </View>
          </View>
        </ScrollView>
        <Loading visible={visible} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  bg: {
    zIndex: 90,
  },
  background: {
    backgroundColor: '#587cea',
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  scrollView: {
    backgroundColor: 'rgba(0,0,0, 0)',
  },
  scrollViewContent: {
    backgroundColor: '#f4f4f4',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    opacity: 0,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  wrapper: {
    position: 'relative',
    padding: 15,
    marginTop: Dimensions.get('window').width / 4,
  },
  topReport: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: 'rgba(0,0,0,.3)',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
});
