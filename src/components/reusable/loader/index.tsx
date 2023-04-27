import { Spin } from 'antd';
import React, { FC } from 'react';

type Props = {
  text?: string;
};

export const PageLoader: FC<Props> = ({ text = 'Loading...' }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spin size="large" tip={text} />
    </div>
  );
};
