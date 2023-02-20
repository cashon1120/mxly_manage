import {useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import {MobXProviderContext} from 'mobx-react';
import dayjs from 'dayjs';

class RootStore {
  barHeight = 50;
  headerHeight = 50;
  userInfo = {
    companyID: 0,
  };
  companyList = [];
  token = '';
  searchParams = {
    companyId: 0,
    beginTime: dayjs(),
    endTime: dayjs(),
    type: 1,
  };
  constructor() {
    makeAutoObservable(this);
  }
  setBarHeight(value: number) {
    this.barHeight = value;
  }
  setHeaderHeight(value: number) {
    this.headerHeight = value;
  }
  setUserInfo(value: any) {
    this.userInfo = value;
  }
  setToken(value: string) {
    this.token = value;
  }
  setSearchDate = (value: any) => {
    this.searchParams = {
      ...this.searchParams,
      beginTime: value.beginTime,
      endTime: value.endTime,
    };
  };
  setSearchType = (value: number) => {
    this.searchParams = {
      ...this.searchParams,
      type: value,
    };
  };
  setSearchCompany = (id: number) => {
    this.searchParams = {
      ...this.searchParams,
      companyId: id,
    };
  };
  setCompanyList = (list: any) => {
    this.companyList = list;
  };
}

export type RootStoreType = InstanceType<typeof RootStore>;
export const useStore = <T = RootStoreType>(name: string): T => {
  return useContext(MobXProviderContext)[name];
};
export default new RootStore();
