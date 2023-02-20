import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {useStore} from '../models/global';
import globalStyle from '../globalStyle';
import MyImage from '../components/MyImage';
import http from '../utils/http';

interface Props {
  callback: Function;
}

const SelectCompany = (props: Props) => {
  const {callback} = props;
  const store = useStore('rootStore');
  const [visible, setVisible] = useState(false);
  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (store.companyList.length === 0) {
      http
        .postRequest({
          method: 'GET',
          url: 'app/v1.0/company/user/list',
        })
        .then((res: any) => {
          if (res.errorCode === 0) {
            store.setSearchCompany(res.result[0].key);
            store.setCompanyList(res.result);
            forceUpdate(new Date().getTime());
          }
        })
        .finally(() => {
          setVisible(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompanyName = () => {
    let name = '';
    store.companyList.forEach((item: any) => {
      if (item.key === store.searchParams.companyId) {
        name = item.name;
      }
    });

    return name.length > 8 ? name.substring(0, 8) + '...' : name;
  };

  const [, forceUpdate] = useState(0);

  return (
    <>
      <View style={[globalStyle.flex_1, styles.wrapper]}>
        <TouchableOpacity onPress={handleToggleVisible}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{getCompanyName()}</Text>
            <MyImage name="arrow_down" width={24} height={15} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent>
        <TouchableWithoutFeedback onPress={handleToggleVisible}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        <View style={styles.listWrapper}>
          <ScrollView>
            {store.companyList.map((item: any) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setVisible(false);
                  store.setSearchCompany(item.key);
                  forceUpdate(new Date().getTime());
                  callback && callback();
                }}>
                <View style={[styles.list, globalStyle.flexBox]}>
                  <Text
                    style={[
                      globalStyle.flex_1,
                      store.searchParams.companyId === item.key
                        ? styles.selected
                        : null,
                    ]}>
                    {item.name}
                  </Text>
                  {store.searchParams.companyId === item.key ? (
                    <MyImage name="icon_selected" width={32} height={32} />
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginRight: 6,
  },
  listWrapper: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 999,
    maxHeight: 300,
    paddingVertical: 8,
  },
  list: {
    padding: 15,
    paddingVertical: 12,
  },
  selected: {
    color: '#E75120',
  },
  mask: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    with: '100%',
    bottom: 0,
    zIndex: 88,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});

export default SelectCompany;
