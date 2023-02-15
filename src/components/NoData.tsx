import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyImage from './MyImage';
interface IProps {
  text?: string;
}

const NoData = (props: IProps) => {
  const {text} = props;
  return (
    <View style={styles.wrapper}>
      <View>
        <MyImage
          style={styles.icon}
          resizeMode="cover"
          name="nodata"
          width={100}
          height={100}
        />
      </View>
      <Text style={styles.text}>{text || '暂无数据'}</Text>
    </View>
  );
};

export default React.memo(NoData);

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 25,
  },
  icon: {
    width: 60,
    height: 40,
    marginBottom: 10,
    opacity: 0.4,
  },
  text: {
    color: '#ccc',
  },
});
