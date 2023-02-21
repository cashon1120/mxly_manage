import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_1: {
    flex: 1,
  },
  contentCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font_12: {
    fontSize: 12,
  },
  font_14: {
    fontSize: 14,
  },
  font_16: {
    fontSize: 16,
  },
  font_18: {
    fontSize: 18,
  },
  font_20: {
    fontSize: 20,
  },
  font_24: {
    fontSize: 24,
  },

  // 首页详情页
  topBox: {
    padding: 15,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  text1: {
    color: '#333',
    fontWeight: '700',
    marginRight: 10,
    fontSize: 14,
  },
  text2: {
    fontSize: 14,
    color: '#999',
  },
  text3: {
    fontSize: 30,
    color: '#333',
    paddingTop: 8,
  },
});

export default globalStyle;
