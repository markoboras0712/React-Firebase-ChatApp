import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';
import { RootState } from 'modules/redux-store';

export const PublicAuthGuard: React.FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.authenticated && !user.isLoading) {
      navigate('/messages');
    }
  }, [user.authenticated, user.isLoading]);
  if (user.isLoading) {
    return <LinearProgress color="success" />;
  }

  return <>{children}</>;
};
