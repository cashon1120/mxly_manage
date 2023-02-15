import {sha256} from 'js-sha256';
import dayjs from 'dayjs';

const newNonce = () => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let nonce = '';
  for (let i = 16; i > 0; --i) {
    nonce += str[Math.floor(Math.random() * str.length)];
  }
  return nonce;
};

const encryption = (headers: any, url: string) => {
  const newNonceStr = newNonce();
  const timestamp = Math.floor(dayjs().valueOf() / 1000);
  const signatureObj: any = {
    method: 'POST',
    url: encodeURI(`/${url}`),
    nonce: newNonceStr,
    timestamp,
    authorization: headers.Authorization,
  };
  let signature = '';
  Object.keys(signatureObj)
    .sort()
    .forEach(key => {
      signature += `${key}=${signatureObj[key]}`;
    });
  headers.signature = sha256(signature);
  headers.timestamp = timestamp;
  headers.nonce = newNonceStr;
};

export default encryption;
