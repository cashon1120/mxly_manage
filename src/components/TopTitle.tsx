import React from 'react';
import {observer} from 'mobx-react';
import {useStore} from '../models/global';
import {Text, StyleSheet} from 'react-native';

interface IProps {
  title: string;
  color?: string;
}

const TopTitle = (props: IProps) => {
  const {color = '#fff', title} = props;
  const store = useStore('rootStore');
  return (
    <Text style={{...styles.text, top: store.barHeight + 10, color}}>
      {title}
    </Text>
  );
};

export default observer(TopTitle);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 50,
    right: 50,
    zIndex: 888,
  },
});
