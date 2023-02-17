import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeBottom from './SafeBottom';
import MyImage from './MyImage';
import globalStyle from '../globalStyle';

interface DateType {
  label: string;
  type: number;
}

const HeaderDate = () => {
  const [visible, setVisible] = useState(false);
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
    {
      label: '按周',
      type: 9,
    },
    {
      label: '按月',
      type: 10,
    },
    {
      label: '自定义',
      type: 11,
    },
  ]);
  const [selectedDateType, setSelectedDateType] = useState(1);

  const handleSelectedType = (type: number) => {
    setSelectedDateType(type);
  };

  const handleSubmit = () => {
    handleToggleVisible();
  };

  return (
    <>
      <TouchableOpacity onPress={handleToggleVisible}>
        <View style={[globalStyle.flexBox]}>
          <MyImage name="icon_date" width={40} height={40} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>上周</Text>
            <Text style={[styles.text, styles.smallText]}>02/06-03/15</Text>
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
              {selectedDateType >= 8 ? (
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
                      item.type === selectedDateType ? styles.selected : null,
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
                      item.type === selectedDateType ? styles.selected : null,
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
