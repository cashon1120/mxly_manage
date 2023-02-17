import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

interface IProps {
  title: string;
  children: any;
  titleNumber?: number;
  onArrowPress?: () => void;
}

const Card = (props: IProps) => {
  const {title, children, onArrowPress, titleNumber} = props;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity disabled={!onArrowPress} onPress={onArrowPress}>
        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
            {titleNumber ? (
              <View style={styles.titleTextTip}>
                <Text style={styles.titleTextTipText}>{titleNumber}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,.3)',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 5,
    marginTop: 15,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: 'rgba(229, 229, 229, 1)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTextTip: {
    backgroundColor: 'rgba(255, 72, 72, 1)',
    borderRadius: 10,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 5,
    left: 5,
    top: -5,
  },
  titleTextTipText: {
    fontSize: 12,
    color: '#fff',
  },
  content: {
    // padding: 10
  },
});
