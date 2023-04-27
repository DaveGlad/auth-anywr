import {
  AppDispatch,
  authenticateUser,
  useSelector,
  RootState,
} from '@/src/store';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PageLoader } from '../../reusable/loader';

/**
 * If the user is not authenticated, then show a loading spinner, otherwise show the children.
 * @param  - FC<Props> - This is a React component that takes in a Props object.
 * @returns A React component that will render a loading spinner while the user is being authenticated.
 */
type Props = {
  children: React.ReactNode;
};

export const AuthUser: FC<Props> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    authenticate: { loading },
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return loading ? <PageLoader /> : <>{children}</>;
};
