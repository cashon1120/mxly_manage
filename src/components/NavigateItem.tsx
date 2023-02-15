import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import MyImage from './MyImage';

interface IProps {
  label: string;
  icon?: string;
  info?: string;
  info2?: string;
  children?: any;
  onPress?: () => void;
}

const NavigateItem = (props: IProps) => {
  const {label, onPress, info, info2, children} = props;
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <View>
      <TouchableHighlight underlayColor="#fafafa" onPress={handlePress}>
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          {children ? (
            children
          ) : (
            <>
              {info ? <Text style={styles.info}>{info}</Text> : null}
              {info2 ? <Text style={styles.info}>{info2}</Text> : null}
            </>
          )}
          {onPress ? (
            <MyImage name="arrow" style={styles.arrow} width={30} height={30} />
          ) : null}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default NavigateItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    minHeight: 46,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    flex: 1,
    color: '#555',
  },
  info: {
    color: '#888',
    fontSize: 15,
    marginRight: 1,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  arrow: {
    opacity: 0.6,
    position: 'relative',
    top: Platform.OS === 'android' ? 1 : 0,
  },
});
