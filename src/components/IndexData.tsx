import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MyImage from './MyImage';
import DashedLine from './DashedLine';
import globalStyle from '../globalStyle';

const renderDownOrUp = (type: boolean) => {
  return type ? (
    <MyImage name="icon_up" width={16} height={16} />
  ) : (
    <MyImage name="icon_down" width={16} height={16} />
  );
};

interface IProps {
  title: string;
  data: number;
  range: number;
  page: string;
  navigation: any;
  showLine?: boolean;
}

const IndexData = (props: IProps) => {
  const {title, data, range, showLine, page, navigation} = props;
  const nagigate = () => {
    navigation.navigate(page);
  };
  return (
    <View style={globalStyle.flex_1}>
      <TouchableOpacity onPress={nagigate}>
        <View style={styles.topList}>
          <Text style={styles.topListTile}>{title}</Text>
          <Text style={styles.topListValue}>{data}</Text>
          <View style={globalStyle.flexBox}>
            <Text style={styles.smallText}>环比</Text>
            <Text
              style={[
                styles.smallText,
                styles[range >= 0 ? 'up' : 'down'],
                styles.smallValue,
              ]}>
              {range}%
            </Text>
            {renderDownOrUp(range >= 0)}
          </View>
          {showLine ? <DashedLine /> : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IndexData;

const styles: any = StyleSheet.create({
  topList: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  topListTile: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  topListValue: {
    textAlign: 'center',
    color: 'rgba(51, 51, 51, 1)',
    fontSize: 18,
  },
  smallText: {
    fontSize: 12,
  },
  up: {
    color: '#ffa100',
  },
  down: {
    color: '#34ba60',
  },
  smallValue: {
    marginLeft: 5,
    marginRight: 5,
  },
});
