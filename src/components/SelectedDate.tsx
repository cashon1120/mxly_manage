import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import globalStyle from '../globalStyle';

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const width = Dimensions.get('window').width;

const getMonthDates = (day: any) => {
  const dates = [];
  const startDay = day.date(1).day();
  const endDate = day.endOf('month').date();
  const month = day.month() + 1;
  const year = day.year();
  for (let i = 0; i < startDay; i++) {
    dates.push({
      date: '',
    });
  }
  for (let i = 1; i <= endDate; i++) {
    dates.push({
      date: i,
      timestamp: dayjs(`${year}-${month}-${i}`).valueOf(),
      year,
      month,
      selected: false,
    });
  }

  return dates;
};

let currentMonth = dayjs();

interface Props {
  callback: Function;
}

const SelectedDate = (props: Props) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(
    getMonthDates(currentMonth),
  );

  const [beginTime, setBeginTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();

  const handleChangeMonth = (type: 1 | -1) => {
    currentMonth = currentMonth.add(type, 'month');
    setCurrentMonthDate(getMonthDates(currentMonth));
  };

  const handleSetDate = (date: any) => {
    if (!beginTime && !endTime) {
      setBeginTime(date);
      setEndTime(date);
      return;
    }
    if (beginTime.timestamp !== endTime.timestamp) {
      setBeginTime(date);
      setEndTime(date);
      return;
    }
    if (beginTime && endTime) {
      if (date.timestamp < beginTime.timestamp) {
        setBeginTime(date);
        setEndTime(beginTime);
      } else {
        setEndTime(date);
      }
    }
  };

  useEffect(() => {
    props.callback({beginTime, endTime});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beginTime, endTime]);

  return (
    <>
      <View style={[globalStyle.flexBox]}>
        <TouchableOpacity onPress={() => handleChangeMonth(-1)}>
          <Text>上一页</Text>
        </TouchableOpacity>
        <View style={[globalStyle.flex_1, globalStyle.contentCenter]}>
          <Text style={styles.currentTime}>当前时间</Text>
        </View>
        <TouchableOpacity onPress={() => handleChangeMonth(1)}>
          <Text>下一页</Text>
        </TouchableOpacity>
      </View>
      <View style={[globalStyle.flexBox, styles.week]}>
        {weekdays.map(item => (
          <View style={styles.item} key={item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={[globalStyle.flexBox, styles.dateBox]}>
        {currentMonthDate.map((item: any) => (
          <View style={styles.item} key={item.timestamp}>
            <TouchableOpacity onPress={() => handleSetDate(item)}>
              <Text
                style={[
                  styles.itemText,
                  beginTime && beginTime.timestamp === item.timestamp
                    ? styles.begintDate
                    : null,
                  endTime && endTime.timestamp === item.timestamp
                    ? styles.endDate
                    : null,
                  beginTime &&
                  beginTime.timestamp <= item.timestamp &&
                  endTime &&
                  item.timestamp <= endTime.timestamp
                    ? styles.selected
                    : null,
                ]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

export default SelectedDate;

const styles = StyleSheet.create({
  item: {
    width: Math.floor((width - 30) / 7),
    marginTop: 2,
  },
  itemText: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  currentTime: {
    color: '#333',
    fontWeight: '500',
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: '#E75120',
    color: '#fff',
  },
  begintDate: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  endDate: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  week: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
  },
  dateBox: {
    flexWrap: 'wrap',
  },
});
