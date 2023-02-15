import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

interface IProps {
  visible?: boolean;
  text?: string;
}

const Loading = (props: IProps) => {
  const {visible, text} = props;
  return visible ? (
    <View style={styles.outer}>
      <View style={styles.wrapper}>
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{text || '加载中'}</Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default Loading;
const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    top: '45%',
    width: '100%',
    left: 0,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingWrapper: {
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 10,
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    minWidth: 80,
  },
  loadingText: {
    color: '#fff',
    marginTop: 5,
  },
  backBtn: {
    width: 60,
    height: 100,
    position: 'absolute',
    top: global.barHeight,
    left: 0,
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255, 0)',
  },
});
