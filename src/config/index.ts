import {API_URL, VERSION_URL, VIDEO_WATCH_URL} from './api';

// ios检查更新时用，在开发者网页上可找到
export const IOS_APP_ID = '1662040473';

interface IConfig {
  API_URL: string;
  VERSION_URL: string;
  VIDEO_WATCH_URL: string;
}

export const CONFIG: IConfig = {
  API_URL,
  VERSION_URL,
  VIDEO_WATCH_URL,
};
