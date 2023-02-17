import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {PayType, IPayType} from '../utils/enums';
import DetailInfo from '../components/DetailInfo';
import http from '../utils/http';
import {formatDate} from '../utils/commonUtils';
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
  const {orderInfo} = props.route.params;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const getData = () => {
    http
      .postRequest({
        url: 'rechargeOrder/get',
        params: {
          rechargeNo: orderInfo.rechargeNo,
          rechargeTime: orderInfo.rechargeTime,
        },
      })
      .then(res => {
        if (res.errorCode !== 0) {
          return;
        }
        setData(res.result);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <Header text="充值明细" navigation={props.navigation} />
      <View style={globalStyle.flex_1}>
        <View style={styles.top}>
          <Text style={styles.money}>+200</Text>
          <Text style={globalStyle.text2}>充值总额</Text>
        </View>
        <View style={styles.infoBox}>
          <DetailInfo label="充值编号" content={data.rechargeNo} />
          <DetailInfo label="关联会员" content={data.memberName} />
          <DetailInfo
            label="充值金额"
            content={data.payMoney ? `¥${data.payMoney}` : '--'}
          />
          <DetailInfo
            label="赠送金额"
            content={data.giftMoney ? `¥${data.giftMoney}` : '--'}
          />
          {data.orderState !== 0 ? (
            <DetailInfo
              label="会员余额"
              content={
                data.payBalance
                  ? `¥${data.payBalance + data.giftBalance}`
                  : '--'
              }
            />
          ) : null}
          <DetailInfo
            label="会员积分"
            content={
              data.integral || data.integralBalance
                ? `${data.integral + data.integralBalance}`
                : '--'
            }
          />
          <DetailInfo label="销售门店" content={data.companyName} />
          <DetailInfo label="充值套餐" content={data.ruleName} />
          <DetailInfo
            label="充值时间"
            content={formatDate(data.rechargeTime)}
          />
          {data.orderState !== 0 ? (
            <DetailInfo label="支付时间" content={formatDate(data.payTime)} />
          ) : null}
          <DetailInfo label="支付方式" content={getPayType(data.payWay)} />
        </View>
      </View>
      <Loading visible={loading} />
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
