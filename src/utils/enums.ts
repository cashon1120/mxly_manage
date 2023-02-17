export interface IPayType {
  name: string;
  type: number;
}
export const PayType: IPayType[] = [
  {
    name: '微信',
    type: 2,
  },
  {
    name: '支付宝',
    type: 3,
  },
  {
    name: '积分',
    type: 5,
  },
  {
    name: '余额',
    type: 0,
  },
  {
    name: '现金',
    type: 1,
  },
];
