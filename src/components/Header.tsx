/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {useStore} from '../models/global';
import MyImage from './MyImage';
import MyStatusBar, {BarStypeProps} from './MyStatusBar';
import Text from './MyText';

interface IProps {
  text: string;
  textColor?: string;
  disableBack?: boolean;
  navigation?: any;
  rightText?: string;
  rightElement?: any;
  backgroundColor?: string;
  rightTextEvent?: () => void;
  backEvent?: () => void;
  barStyle?: BarStypeProps;
}

const Header = (props: IProps) => {
  const strore = useStore('rootStore');
  const {
    text,
    textColor,
    rightText,
    rightTextEvent,
    backEvent,
    navigation,
    backgroundColor,
    barStyle,
    disableBack,
    rightElement,
  } = props;

  const handleLayout = (e: any) => {
    strore.setHeaderHeight(e.nativeEvent.layout.height);
  };

  const handleBack = () => {
    if (disableBack) {
      return;
    }
    backEvent ? backEvent() : navigation?.goBack();
  };
  const backUrl = barStyle === 'dark-content' ? 'back_black' : 'back';
  return (
    <View
      style={{
        ...styles.container,
        zIndex: 888,
        paddingTop: strore.barHeight,
        height: strore.barHeight + 48,
        backgroundColor: backgroundColor || '#E75120',
        ...styles[barStyle ? barStyle : ''],
      }}
      onLayout={handleLayout}>
      <MyStatusBar barStyle={barStyle} translucent />
      <TouchableOpacity onPress={handleBack} style={styles.back}>
        {!disableBack ? (
          <MyImage name={backUrl} width={40} height={40} />
        ) : null}
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={{...styles.title, color: textColor || '#fff'}}>
          {text}
        </Text>
      </View>
      {rightElement ? (
        <>
          <View style={{...styles.rightElement, top: strore.barHeight + 12}}>
            {rightElement}
          </View>
          <Text style={styles.rightContent}>{''}</Text>
        </>
      ) : (
        <TouchableOpacity onPress={rightTextEvent}>
          <Text style={styles.rightContent}>{rightText || ''}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default observer(Header);

const styles: any = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  back: {
    paddingLeft: 10,
    width: 50,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  'dark-content': {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  rightContent: {
    width: 50,
    color: '#fff',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightElement: {
    position: 'absolute',
    right: 15,
    zIndex: 888,
  },
});
