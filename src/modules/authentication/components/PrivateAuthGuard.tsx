import { LinearProgress } from '@mui/material';
import { navigate } from '@reach/router';
import { selectUser } from 'modules/authentication';
import { RootState } from 'modules/redux-store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const PrivateAuthGuard: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const users = useSelector((state: RootState) => state.users);
  useEffect(() => {
    if (!user.isLoading && !user.authenticated) {
      navigate('/');
    }
  }, [user.authenticated]);

  if (user.isLoading || users.isLoading) {
    return <LinearProgress color="success" />;
  }

  return <>{children}</>;
};
