import React from 'react';
import MyImage, {NameProps} from '../components/MyImage';

interface IProps {
  name: NameProps;
}

const ICON_SIZE = 48;

const Icon = (props: IProps) => (
  <MyImage name={`${props.name}`} width={ICON_SIZE} height={ICON_SIZE} />
);

const BarIcon = (props: any) => {
  const {
    route: {name},
    options: {focused},
  } = props;
  let icon = <></>;
  switch (name) {
    case 'Home':
      icon = <Icon name={focused ? 'tab_nor01' : 'tab_sel01'} />;
      break;
    case 'Monitor':
      icon = <Icon name={focused ? 'tab_nor02' : 'tab_sel02'} />;
      break;
    case 'Report':
      icon = <Icon name={focused ? 'tab_nor03' : 'tab_sel03'} />;
      break;
    case 'User':
      icon = <Icon name={focused ? 'tab_nor04' : 'tab_sel04'} />;
      break;
    default:
      break;
  }
  return icon;
};

export default BarIcon;
