import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import HeaderDate from '../components/HeaderDate';
import {renderLoading, renderEnd} from '../components/FlatListItem';
import NoData from '../components/NoData';
import Loading from '../components/Loading';
import MyImage from '../components/MyImage';
import http from '../utils/http';
import globalStyle from '../globalStyle';

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
  const [optionsType, setOptionsType] = useState<'' | 'payWay' | 'worker'>('');
  const [payWay, updatePayWay] = useState<OptionDataProps[]>([
    {name: '全部', type: -1, selected: true},
    {name: '微信', type: 2},
    {name: '支付宝', type: 3},
    {name: '积分', type: 5},
    {name: '余额', type: 0},
    {name: '现金', type: 1},
  ]);
  const [worker, updateWorker] = useState<OptionDataProps[]>([
    {name: '工作人员1', type: 1},
    {name: '工作人员2', type: 2},
  ]);
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
        updatePayWay([...array]);
        break;
      case 'worker':
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
            <Text style={styles.text1}>13982193130</Text>
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
        text="总销售明细"
        navigation={props.navigation}
        rightElement={<HeaderDate />}
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
          {selectedOptions.map(item => (
            <Option
              text={item.name}
              key={item.type}
              selected={item.selected}
              onPress={() => handleUpdateSelected(item.type)}
            />
          ))}
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
                      <Text style={globalStyle.text2}>共19笔</Text>
                    </View>
                    <Text style={styles.text3}>7040</Text>
                  </View>
                  <View style={styles.alignRight}>
                    <Text style={{...globalStyle.text1, marginRight: 0}}>
                      赠送金额
                    </Text>
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
  selectWrapper: {
    position: 'relative',
    zIndex: 99,
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
