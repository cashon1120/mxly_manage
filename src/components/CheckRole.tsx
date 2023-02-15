import React, {useEffect, useState} from 'react';

const CheckRole = (props: any) => {
  const [result, setResult] = useState(false);
  useEffect(() => {
    setResult(!!global.userInfo.permissionMap[props.roleId]);
  }, [props.roleId]);
  return result ? props.children : <></>;
};

export default CheckRole;
