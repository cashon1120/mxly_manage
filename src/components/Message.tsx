import React from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';

interface IProps {
  errorMsgs?: string | string[];
  sucessMsgs?: string | string[];
}

const Message = (props: IProps) => {
  const {errorMsgs, sucessMsgs} = props;
  const errors = errorMsgs
    ? Array.isArray(errorMsgs)
      ? errorMsgs
      : [errorMsgs]
    : '';
  const sucess = sucessMsgs
    ? Array.isArray(sucessMsgs)
      ? sucessMsgs
      : [sucessMsgs]
    : '';

  return (
    <Modal transparent visible={errors.length > 0 || sucess.length > 0}>
      <View style={styles.wrapper}>
        {errors
          ? errors.map((info: string) => (
              <View
                key={info}
                style={[styles.container, styles.errorContainer]}>
                <Text style={styles.error}>{info}</Text>
              </View>
            ))
          : null}
        {sucess
          ? sucess.map((info: string) => (
              <View
                key={info}
                style={[styles.container, styles.errorContainer]}>
                <Text style={styles.sucess} key={info}>
                  {info}
                </Text>
              </View>
            ))
          : null}
      </View>
    </Modal>
  );
};

export default Message;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: '10%',
    width: '80%',
    left: '10%',
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  sucessContainer: {
    backgroundColor: 'green',
  },

  error: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  sucess: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
