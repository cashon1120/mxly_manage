import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Picker = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
        end={{x: 0, y: 1}}
        start={{x: 0, y: 0}}
        style={styles.topMask}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        end={{x: 0, y: 1}}
        start={{x: 0, y: 0}}
        style={[styles.topMask, styles.bottomMask]}
      />
      <View style={[styles.option, styles.line]} />
      <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.option} />
        <View style={styles.option} />
        <View style={styles.option}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>4</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>5</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={styles.option} />
        <View style={styles.option} />
      </ScrollView>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
    position: 'relative',
  },
  topMask: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    zIndex: 10,
  },
  bottomMask: {
    bottom: 0,
    top: 'auto',
  },
  option: {
    height: 30,
  },
  text: {
    textAlign: 'center',
  },
  line: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    position: 'absolute',
    width: '100%',
    top: 100,
  },
});
