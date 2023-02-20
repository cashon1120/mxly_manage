import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useStore} from '../models/global';
import HeaderDate from '../components/HeaderDate';
import Header from '../components/Header';
import SelectCompany from '../components/SelectCompany';
import Loading from '../components/Loading';
import Percent from '../components/Percent';
import http from '../utils/http';
import globalStyle from '../globalStyle';

const OrderPreview = (props: any) => {
  const store = useStore('rootStore');
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState({
    profitTotal: 0,
    itemList: [],
  });
  const getData = () => {
    setVisible(true);
    http
      .postRequest({
        url: 'app/v1.0/playOrder/statistics/profit',
        params: {
          companyId: store.searchParams.companyId,
          beginTime: store.searchParams.beginTime.format('YYYY-MM-DD'),
          endTime: store.searchParams.endTime.format('YYYY-MM-DD'),
        },
      })
      .then((res: any) => {
        if (res.errorCode === 0) {
          console.log(res.result.itemList[0]);
          setData(res.result);
        }
      })
      .finally(() => {
        setVisible(false);
      });
  };
  const handleParamsChange = () => {
    getData();
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.wrapper}>
      <Header
        text="利润明细"
        titleElement={<SelectCompany callback={handleParamsChange} />}
        navigation={props.navigation}
        rightElement={<HeaderDate callback={handleParamsChange} />}
      />
      <View style={globalStyle.flex_1}>
        <ScrollView style={{height: '100%'}}>
          <View style={globalStyle.topBox}>
            <View style={globalStyle.flexBox}>
              <Text style={globalStyle.text1}>利润</Text>
            </View>
            <Text style={globalStyle.text3}>{data.profitTotal}</Text>
          </View>
          <View style={styles.container}>
            {data.itemList.map((item: any) => (
              <Percent
                key={item.name}
                name={item.name}
                num={item.num}
                ratio={item.ratio}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Loading visible={visible} />
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
});

export default OrderPreview;
