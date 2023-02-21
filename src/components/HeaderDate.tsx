import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useStore} from '../models/global';
import dayjs from 'dayjs';
import SafeBottom from './SafeBottom';
import MyImage from './MyImage';
import globalStyle from '../globalStyle';
import SelectedDate from './SelectedDate';
import {replace_} from '../utils/commonUtils';

let tempSelectedDate: any = {
  beginTime: dayjs(),
  endTime: dayjs(),
};

const checkBeginTimeAndEndTime = (date: any) => {
  const beginTime = date.beginTime.format('MM-DD');
  const endTime = date.endTime.format('MM-DD');
  if (beginTime === endTime) {
    return replace_(beginTime);
  }
  return `${replace_(beginTime)}-${replace_(endTime)}`;
};

interface DateType {
  label: string;
  type: number;
}

const HeaderDate = (props: any) => {
  const store = useStore('rootStore');
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    checkBeginTimeAndEndTime(store.searchParams),
  );
  const handleToggleVisible = () => {
    setVisible(!visible);
  };
  const [dateType] = useState<DateType[]>([
    {
      label: '今日',
      type: 1,
    },
    {
      label: '昨日',
      type: 2,
    },
    {
      label: '近7天',
      type: 3,
    },
    {
      label: '本周',
      type: 4,
    },
    {
      label: '本月',
      type: 5,
    },
    {
      label: '上周',
      type: 6,
    },
    {
      label: '上月',
      type: 7,
    },
  ]);
  const [customDateType] = useState<DateType[]>([
    {
      label: '按日',
      type: 8,
    },
    // {
    //   label: '按周',
    //   type: 9,
    // },
    // {
    //   label: '按月',
    //   type: 10,
    // },
    {
      label: '自定义',
      type: 11,
    },
  ]);

  const getType = (type: number) => {
    let res = '';
    [...dateType, ...customDateType].forEach(item => {
      if (item.type === type) {
        res = item.label;
      }
    });
    return res;
  };

  const handleSelectedType = (type: number) => {
    switch (type) {
      case 1:
        store.setSearchDate({
          beginTime: dayjs(),
          endTime: dayjs(),
        });
        break;
      case 2:
        store.setSearchDate({
          beginTime: dayjs().add(-1, 'day'),
          endTime: dayjs().add(-1, 'day'),
        });
        break;
      case 3:
        store.setSearchDate({
          beginTime: dayjs().add(-7, 'day'),
          endTime: dayjs(),
        });
        break;
      case 4:
        store.setSearchDate({
          beginTime: dayjs().startOf('week').add(1, 'day'),
          endTime: dayjs().endOf('week').add(1, 'day'),
        });
        break;
      case 5:
        store.setSearchDate({
          beginTime: dayjs().startOf('month'),
          endTime: dayjs().endOf('month'),
        });
        break;
      case 6:
        store.setSearchDate({
          beginTime: dayjs().add(-1, 'week').startOf('week').add(1, 'day'),
          endTime: dayjs().add(-1, 'week').endOf('week').add(1, 'day'),
        });
        break;
      case 7:
        store.setSearchDate({
          beginTime: dayjs().add(-1, 'month').startOf('month'),
          endTime: dayjs().add(-1, 'month').endOf('month'),
        });
        break;
    }
    if (type <= 7) {
      setTempType(0);
      store.setSearchType(type);
      props.callback && props.callback();
      handleToggleVisible();
      return;
    }
    setTempType(type);
    forceUpdate(new Date().getTime());
  };
  const [tempType, setTempType] = useState(0);
  const handleSubmit = () => {
    store.setSearchType(tempType);
    store.setSearchDate(tempSelectedDate);
    props.callback && props.callback();
    handleToggleVisible();
  };

  useEffect(() => {
    setCurrentDate(checkBeginTimeAndEndTime(store.searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.searchParams]);

  const selectedDateType = store.searchParams.type;
  const [date, setDate] = useState(new Date());
  const [, forceUpdate] = useState(0);
  const handleDateChange = (value: any) => {
    setDate(value);
    tempSelectedDate = {
      beginTime: dayjs(value),
      endTime: dayjs(value),
    };
    forceUpdate(value);
  };
  const handleSelectedRangeChange = (rangeDate: any) => {
    if (rangeDate.beginTime && rangeDate.endTime) {
      tempSelectedDate = {
        beginTime: dayjs(rangeDate.beginTime.timestamp),
        endTime: dayjs(rangeDate.endTime.timestamp),
      };
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handleToggleVisible}>
        <View style={[globalStyle.flexBox]}>
          <MyImage name="icon_date" width={40} height={40} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{getType(selectedDateType)}</Text>
            <Text style={[styles.text, styles.smallText]}>{currentDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <View style={styles.wrapper}>
          <SafeBottom>
            <View style={globalStyle.flexBox}>
              <TouchableOpacity onPress={handleToggleVisible}>
                <Text style={styles.cancel}>取消</Text>
              </TouchableOpacity>
              <View style={globalStyle.flex_1} />
              {tempType >= 8 ? (
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.submit}>确定</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Text style={globalStyle.text1}>快捷选择</Text>
            <View style={styles.buttonWrapper}>
              {dateType.map(item => (
                <TouchableOpacity
                  key={item.type}
                  onPress={() => handleSelectedType(item.type)}>
                  <Text
                    style={[
                      styles.button,
                      item.type === selectedDateType && tempType === 0
                        ? styles.selected
                        : null,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={globalStyle.text1}>自定义</Text>
            <View style={styles.buttonWrapper}>
              {customDateType.map(item => (
                <TouchableOpacity
                  key={item.type}
                  onPress={() => handleSelectedType(item.type)}>
                  <Text
                    style={[
                      styles.button,
                      item.type === tempType ? styles.selected : null,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {tempType === 8 ? (
              <View style={globalStyle.flexBox}>
                <DatePicker
                  date={date}
                  mode="date"
                  minimumDate={new Date('2022-01-01')}
                  maximumDate={new Date()}
                  onDateChange={handleDateChange}
                />
              </View>
            ) : null}
            {tempType === 11 ? (
              <SelectedDate callback={handleSelectedRangeChange} />
            ) : null}
          </SafeBottom>
        </View>
        <TouchableWithoutFeedback onPress={handleToggleVisible}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default HeaderDate;

const styles = StyleSheet.create({
  textWrapper: {
    marginLeft: 2,
  },
  text: {
    fontSize: 10,
    color: '#fff',
  },
  smallText: {
    fontSize: 8,
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
  wrapper: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    zIndex: 99,
  },
  cancel: {
    fontSize: 14,
    color: '#666',
    paddingBottom: 10,
  },
  submit: {
    fontSize: 14,
    color: '#E75120',
    paddingBottom: 10,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#eee',
    borderRadius: 3,
    marginRight: 10,
    paddingVertical: 6,
    width: 70,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginTop: 15,
  },
  selected: {
    backgroundColor: '#E75120',
    color: '#fff',
  },
});
