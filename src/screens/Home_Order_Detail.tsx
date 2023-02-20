import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../components/Header';
import {PayType, IPayType} from '../utils/enums';
import DetailInfo from '../components/DetailInfo';
import dayjs from 'dayjs';
import globalStyle from '../globalStyle';

const getPayType = (type: number) => {
  let text = '';
  PayType.forEach((item: IPayType) => {
    if (item.type === type) {
      text = item.name;
    }
  });
  return text;
};

const Home_Charge_Detail = (props: any) => {
  const data = props.route.params.orderInfo;
  console.log(data);
  return (
    <View style={styles.wrapper}>
      <Header text="充值明细" navigation={props.navigation} />
      <View style={globalStyle.flex_1}>
        <View style={styles.top}>
          <Text style={styles.money}>+{data.actualMoney}</Text>
          <Text style={globalStyle.text2}>充值总额</Text>
        </View>
        <View style={styles.infoBox}>
          <DetailInfo label="充值编号" content={data.platformPayNo} />
          <DetailInfo label="关联会员" content={data.memberName} />
          <DetailInfo
            label="充值金额"
            content={data.actualMoney ? `¥${data.actualMoney}` : '--'}
          />
          <DetailInfo
            label="赠送金额"
            content={data.giftMoney ? `¥${data.giftMoney}` : '--'}
          />
          <DetailInfo label="销售门店" content={data.companyName} />
          {/* <DetailInfo label="充值套餐" content={data.ruleName} /> */}
          <DetailInfo
            label="充值时间"
            content={dayjs(data.rechargeTime * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          />
          <DetailInfo label="支付方式" content={getPayType(data.payWay)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
  },
  top: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  money: {
    fontSize: 30,
    color: '#2d962d',
    marginBottom: 5,
  },
  stateText: {
    color: '#333',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  infoTitleWraper: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  infoTitle: {
    color: '#333',
    fontSize: 15,
  },
});

export default Home_Charge_Detail;
