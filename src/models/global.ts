import {useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {MobXProviderContext} from 'mobx-react';

class RootStore {
  barHeight = 50;
  headerHeight = 50;
  userInfo = {};
  token = '';
  constructor() {
    makeAutoObservable(this);
  }
  setBarHeight(value: number) {
    this.barHeight = value;
  }
  setHeaderHeight(value: number) {
    this.headerHeight = value;
  }
  setUserInfo(value: number) {
    this.userInfo = value;
  }
  setToken(value: string) {
    this.token = value;
  }
}

export type RootStoreType = InstanceType<typeof RootStore>;
export const useStore = <T = RootStoreType>(name: string): T => {
  return useContext(MobXProviderContext)[name];
};
export default new RootStore();
