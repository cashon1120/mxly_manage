import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/Header';
import {renderLoading, renderEnd} from '../components/FlatListItem';
import HeaderDate from '../components/HeaderDate';
import NoData from '../components/NoData';
import Loading from '../components/Loading';
import http from '../utils/http';
import globalStyle from '../globalStyle';

const Home_Order = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any>([{}]);
  const currentPage = useRef(1);
  const loadFlag = useRef(false);

  const getData = () => {
    setLoading(true);
    http
      .postRequest({
        url: 'sold/note/list',
        params: {page: currentPage.current, pageSize: 10},
      })
      .then((res: any) => {
        if (res.errorCode !== 0) {
          return;
        }
        setData((oldData: any) => [...oldData, ...res.result]);
        setNoMore(res.result.length < 10);
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

  useEffect(getData, []);

  const renderItem = (itemProps: any) => {
    const {item} = itemProps;
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Home_Charge_Detail', {orderInfo: item})
        }>
        <View style={[globalStyle.flexBox, styles.list]}>
          <View style={globalStyle.flex_1}>
            <Text style={styles.text1}>23492349234234234234</Text>
            <Text style={[styles.text1, styles.centerText]}>微信支付</Text>
            <Text style={globalStyle.text2}>2023-01-12</Text>
          </View>
          <Text style={styles.money}>+200</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Header
        text="订单明细"
        navigation={props.navigation}
        rightElement={<HeaderDate />}
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
                    <Text style={styles.text3}>7040</Text>
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
            keyExtractor={item => item.serialNo}
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
