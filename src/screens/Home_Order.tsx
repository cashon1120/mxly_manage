import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import dayjs from 'dayjs';
import Header from '../components/Header';
import {renderLoading, renderEnd} from '../components/FlatListItem';
import HeaderDate from '../components/HeaderDate';
import SelectCompany from '../components/SelectCompany';
import {PayType} from '../utils/enums';
import NoData from '../components/NoData';
import {useStore} from '../models/global';
import Loading from '../components/Loading';
import http from '../utils/http';
import globalStyle from '../globalStyle';
let index = 0;
const Home_Order = (props: any) => {
  const store = useStore('rootStore');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any>([]);
  const [dataCount, setDataCount] = useState(0);
  const currentPage = useRef(1);
  const loadFlag = useRef(false);
  const getData = () => {
    setLoading(true);
    http
      .postRequest({
        url: 'app/v1.0/playOrder/statistics/play',
        params: {
          page: currentPage.current,
          pageSize: 10,
          companyId: store.searchParams.companyId,
          beginTime: store.searchParams.beginTime.format('YYYY-MM-DD'),
          endTime: store.searchParams.endTime.format('YYYY-MM-DD'),
        },
      })
      .then((res: any) => {
        if (res.errorCode !== 0) {
          return;
        }
        setDataCount(res.result.dataCount);
        res.result.dataList.forEach((item: any) => {
          item.key === index++;
        });
        setData((oldData: any) => [...oldData, ...res.result.dataList]);
        setNoMore(res.result.dataList.length < 10);
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
        setLoaded(true);
        setTimeout(() => {
          loadFlag.current = true;
        }, 1000);
      });
  };

  const scrollToEnd = () => {
    if (!noMore && loadFlag.current) {
      currentPage.current = currentPage.current + 1;
      loadFlag.current = false;
      getData();
    }
  };

  const handleOnRefresh = () => {
    currentPage.current = 1;
    setData([]);
    getData();
    setLoaded(false);
    setLoading(true);
    setNoMore(false);
    setRefreshing(true);
    loadFlag.current = false;
  };

  const getPayWay = (type: number) => {
    let res = '';
    PayType.forEach(item => {
      if (item.type === type) {
        res = item.name;
      }
    });
    return res;
  };

  const renderItem = (itemProps: any) => {
    const {item} = itemProps;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Home_Order_Detail', {orderInfo: item})
        }>
        <View style={[globalStyle.flexBox, styles.list]}>
          <View style={globalStyle.flex_1}>
            <Text style={styles.text1}>{item.memberName}</Text>
            <Text style={[styles.text1, styles.centerText]}>
              {getPayWay(item.payWay)}
            </Text>
            <Text style={globalStyle.text2}>
              {dayjs(item.orderTime * 1000).format('YYYY-MM-DD')}
            </Text>
          </View>
          <Text style={styles.money}>+{item.paidInMoney}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <Header
        text="订单明细"
        titleElement={<SelectCompany callback={handleOnRefresh} />}
        navigation={props.navigation}
        rightElement={<HeaderDate callback={handleOnRefresh} />}
      />
      <View style={globalStyle.flex_1}>
        <View style={{height: '100%'}}>
          <FlatList
            data={data}
            onRefresh={handleOnRefresh}
            renderItem={renderItem}
            refreshing={refreshing}
            onEndReached={scrollToEnd}
            onEndReachedThreshold={0.01}
            ListHeaderComponent={
              <View style={globalStyle.topBox}>
                <View style={globalStyle.flexBox}>
                  <View style={[globalStyle.flex_1]}>
                    <View style={globalStyle.flexBox}>
                      <Text style={globalStyle.text1}>订单数</Text>
                    </View>
                    <Text style={styles.text3}>{dataCount}</Text>
                  </View>
                </View>
              </View>
            }
            ListFooterComponent={
              data.length === 0 && loaded ? (
                <NoData />
              ) : noMore ? (
                renderEnd()
              ) : loading ? (
                renderLoading()
              ) : null
            }
            keyExtractor={item => item.key}
          />
        </View>
        <Loading visible={loading} />
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
  text1: {
    fontSize: 12,
    color: '#333',
  },
  text3: {
    color: '#333',
    fontSize: 20,
    paddingTop: 5,
  },
  list: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: 'dashed',
  },
  money: {
    fontSize: 20,
    color: '#2d962d',
  },
  centerText: {
    paddingVertical: 3,
  },
});

export default Home_Order;
