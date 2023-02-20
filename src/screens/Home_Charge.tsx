import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import HeaderDate from '../components/HeaderDate';
import {renderLoading, renderEnd} from '../components/FlatListItem';
import NoData from '../components/NoData';
import SelectCompany from '../components/SelectCompany';
import dayjs from 'dayjs';
import Loading from '../components/Loading';
import MyImage from '../components/MyImage';
import {useStore} from '../models/global';
import http from '../utils/http';
import globalStyle from '../globalStyle';

let index = 0;
interface SelectProps {
  title: string;
  onPress: any;
  active?: boolean;
}
interface OptionProps {
  text: string;
  onPress: any;
  selected?: boolean;
}
interface OptionDataProps {
  name: string;
  type: number;
  selected?: boolean;
}

const Select = (props: SelectProps) => {
  const {active, title, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[globalStyle.flexBox, styles.select]}>
        <Text>{title}</Text>
        <MyImage
          name="arrow_down"
          style={active ? styles.arrow_up : styles.arrow}
          width={24}
          height={16}
        />
      </View>
    </TouchableOpacity>
  );
};

const Option = (props: OptionProps) => {
  const {text, selected, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.options, globalStyle.flexBox]}>
        <Text style={[globalStyle.flex_1, selected ? styles.selected : null]}>
          {text}
        </Text>
        {selected ? (
          <MyImage name="icon_selected" width={32} height={32} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const Home_Charge = (props: any) => {
  const store = useStore('rootStore');
  const [optionsType, setOptionsType] = useState<'' | 'payWay' | 'worker'>('');
  const [selectedPayWay, setSelectedPayWay] = useState(-1);
  const [payWay, updatePayWay] = useState<OptionDataProps[]>([
    {name: '全部', type: -1, selected: true},
    {name: '微信', type: 2},
    {name: '支付宝', type: 3},
    {name: '现金', type: 1},
  ]);
  const [selectedWorker, setSelectedWorker] = useState(-1);
  const [worker, updateWorker] = useState<OptionDataProps[]>([]);
  const firstLoad = useRef(true);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (optionsType) {
          setOptionsType('');
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [optionsType]);

  const handleUpdateShow = (type: 'payWay' | 'worker') => {
    if (optionsType === '') {
      setOptionsType(type);
      return;
    }
    setOptionsType('');
  };

  const handleUpdateSelected = (type: number) => {
    let array: OptionDataProps[] = [];
    switch (optionsType) {
      case 'payWay':
        array = payWay;
        break;
      case 'worker':
        array = worker;
        break;
    }
    array.forEach(item => {
      item.selected = item.type === type;
    });
    switch (optionsType) {
      case 'payWay':
        setSelectedPayWay(type);
        updatePayWay([...array]);
        break;
      case 'worker':
        setSelectedWorker(type);
        updateWorker([...array]);
        break;
    }
    setOptionsType('');
  };

  let selectedOptions: OptionDataProps[] = [];
  switch (optionsType) {
    case 'payWay':
      selectedOptions = payWay;
      break;
    case 'worker':
      selectedOptions = worker;
      break;
  }

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [allData, setAllData] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const currentPage = useRef(1);
  const loadFlag = useRef(false);

  const getData = () => {
    setLoading(true);
    http
      .postRequest({
        url: 'app/v1.0/playOrder/statistics/recharge',
        params: {
          page: currentPage.current,
          pageSize: 10,
          payWay: selectedPayWay,
          checkerId: selectedWorker,
          companyId: store.searchParams.companyId,
          beginTime: store.searchParams.beginTime.format('YYYY-MM-DD'),
          endTime: store.searchParams.endTime.format('YYYY-MM-DD'),
        },
      })
      .then((res: any) => {
        if (res.errorCode !== 0) {
          return;
        }
        setAllData(res.result);
        res.result.dataList.forEach((item: any) => {
          item.key = index++;
        });
        setData((oldData: any) => [...oldData, ...res.result.dataList]);
        setNoMore(res.result.dataList.length < 10);
      })
      .finally(() => {
        firstLoad.current = false;
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

  useEffect(() => {
    http
      .postRequest({
        method: 'GET',
        url: 'app/v1.0/user/checkerList',
      })
      .then((res: any) => {
        if (res.errorCode !== 0) {
          return;
        }
        res.result.forEach((item: any) => {
          item.type = item.key;
        });
        updateWorker([{name: '全部', type: -1}, ...res.result]);
      })
      .finally(() => {});
  }, []);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (firstLoad.current) {
      return;
    }
    handleOnRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPayWay, selectedWorker]);

  const getPayWay = (type: number) => {
    let res = '';
    payWay.forEach(item => {
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
          props.navigation.navigate('Home_Charge_Detail', {orderInfo: item})
        }>
        <View style={[globalStyle.flexBox, styles.list]}>
          <View style={globalStyle.flex_1}>
            <Text style={styles.text1}>{item.memberName}</Text>
            <Text style={[styles.text1, styles.centerText]}>
              {getPayWay(item.payWay)}
            </Text>
            <Text style={globalStyle.text2}>
              {dayjs(item.rechargeTime * 1000).format('YYYY-MM-DD')}
            </Text>
          </View>
          <Text style={styles.money}>+{item.actualMoney}</Text>
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
        text="总销售明细"
        titleElement={<SelectCompany callback={handleOnRefresh} />}
        navigation={props.navigation}
        rightElement={<HeaderDate callback={handleOnRefresh} />}
      />
      <View
        style={[globalStyle.topBox, globalStyle.flexBox, styles.selectWrapper]}>
        <Select
          title="充值方式"
          onPress={() => handleUpdateShow('payWay')}
          active={optionsType === 'payWay'}
        />
        <Select
          title="收银员"
          onPress={() => handleUpdateShow('worker')}
          active={optionsType === 'worker'}
        />
      </View>
      {selectedOptions.length > 0 ? (
        <View style={styles.optionWrapper}>
          <ScrollView>
            {selectedOptions.map(item => (
              <Option
                text={item.name}
                key={item.type}
                selected={item.selected}
                onPress={() => handleUpdateSelected(item.type)}
              />
            ))}
          </ScrollView>
        </View>
      ) : null}
      {optionsType ? (
        <TouchableWithoutFeedback onPress={() => setOptionsType('')}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      ) : null}
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
                      <Text style={globalStyle.text1}>充值金额</Text>
                      {/* <Text style={globalStyle.text2}>共19笔</Text> */}
                    </View>
                    <Text style={styles.text3}>{allData.actualMoney}</Text>
                  </View>
                  <View style={styles.alignRight}>
                    <Text style={{...globalStyle.text1, marginRight: 0}}>
                      赠送金额
                    </Text>
                    <Text style={styles.text3}>{allData.giftMoney}</Text>
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
  selectWrapper: {
    position: 'relative',
    zIndex: 99,
    height: 45,
    backgroundColor: '#fff',
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
    height: '100%',
    zIndex: 88,
  },
  select: {
    marginRight: 15,
  },
  arrow: {
    marginLeft: 2,
    marginTop: 2,
  },
  arrow_up: {
    marginLeft: 2,
    marginTop: 2,
    transform: [{rotate: '180deg'}],
  },
  optionWrapper: {
    backgroundColor: '#fff',
    zIndex: 99,
    maxHeight: 300,
    top: 127,
    position: 'absolute',
    width: '100%',
  },
  options: {
    padding: 15,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  selected: {
    color: '#E75120',
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
  alignRight: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  text1: {
    fontSize: 12,
    color: '#333',
  },
  centerText: {
    paddingVertical: 3,
  },
});

export default Home_Charge;
