import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  label: string;
  content: string;
}

const ResultInfo = (props: Props) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.info}>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 13,
    color: '#888888',
    width: '25%',
    textAlign: 'left',
  },
  info: {
    fontSize: 13,
    color: '#555555',
    flex: 1,
  },
});

export default React.memo(ResultInfo);
