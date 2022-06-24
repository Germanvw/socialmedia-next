import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { useEffect } from 'react';
import { uiActions } from '../../redux/Slices/uiSlice';

export interface AlertProps {
  status: 'error' | 'success' | 'info' | 'warning';
  title: string;
  body: string;
  show: boolean;
}

export const AlertItem = () => {
  const { alert } = useAppSelector((state) => state.ui);

  const { show, status, title, body } = alert;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alert?.show) {
      setTimeout(
        () =>
          dispatch(
            uiActions.handleAlert({
              status: 'error',
              title: '',
              body: '',
              show: false,
            })
          ),
        5000
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return (
    <>
      {show && (
        <Alert status={status}>
          <AlertIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{body}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
