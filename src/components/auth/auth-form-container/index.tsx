import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const AuthFormContainer: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen md:overflow-hidden bg-body-bg">
      <div className="w-full flex justify-center items-center px-4">
        <div className=" p-5 lg:p-20 bg-white max-w-[700px] w-full">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
