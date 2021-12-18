/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { RootState } from 'modules/redux-store';

export const PrivateAuthGuard: React.FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    console.log('auth', user.authenticated);
    if (!user.authenticated && !user.isLoading) {
      navigate('/');
    }
  }, [user.authenticated, user.isLoading]);

  if (user.isLoading) {
    return <LinearProgress color="success" />;
  }
  return <>{children}</>;
};
