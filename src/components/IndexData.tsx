import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MyImage from './MyImage';
import DashedLine from './DashedLine';
import globalStyle from '../globalStyle';

const renderDownOrUp = (type: boolean) => {
  return type ? (
    <MyImage name="icon_down" width={16} height={16} />
  ) : (
    <MyImage name="icon_down" width={16} height={16} />
  );
};

interface IProps {
  title: string;
  data: any;
  page: string;
  navigation: any;
  showLine?: boolean;
}

const IndexData = (props: IProps) => {
  console.log(props.navigation);
  const {title, data, showLine, page, navigation} = props;
  const nagigate = () => {
    console.log(123);
    navigation.navigate(page);
  };
  return (
    <View style={globalStyle.flex_1}>
      <TouchableOpacity onPress={nagigate}>
        <View style={styles.topList}>
          <Text style={styles.topListTile}>{title}</Text>
          <Text style={styles.topListValue}>{1234}</Text>
          <View style={globalStyle.flexBox}>
            <Text style={styles.smallText}>环比</Text>
            <Text style={[styles.smallText, styles.smallValue]}>25%</Text>
            {renderDownOrUp(true)}
          </View>
          {showLine ? <DashedLine /> : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IndexData;

const styles = StyleSheet.create({
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
  smallValue: {
    marginLeft: 5,
    marginRight: 5,
  },
});
