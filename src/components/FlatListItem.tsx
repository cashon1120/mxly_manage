import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const renderLoading = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>正在刷新</Text>
  </View>
);

export const renderEnd = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>没有更多数据啦</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    paddingVertical: 15,
    opacity: 0.4,
  },
  loadingText: {
    textAlign: 'center',
  },
});
