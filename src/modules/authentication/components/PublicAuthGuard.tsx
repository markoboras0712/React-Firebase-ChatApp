import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { RootState } from 'modules/redux-store';

export const PublicAuthGuard: React.FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = user.authenticated;
  const isLoading = user.isLoading;

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/messages');
    }
  }, [isAuthenticated, isLoading]);
  if (isLoading) {
    return <LinearProgress color="success" />;
  }

  return <>{children}</>;
};
