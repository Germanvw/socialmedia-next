import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { startRefreshToken } from '../redux/Slices/authSlice';
import { Loading } from './elements/Loading';

export const AuthProvider = ({ children }: any) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('x-token') && !user) dispatch(startRefreshToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{loading ? <Loading /> : children}</>;
};
