import { useEffect } from 'react';
import { useAuthentication } from 'modules/authentication';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/redux-store';
import { LinearProgress } from '@mui/material';
import { navigate } from '@reach/router';

export const AuthListener: React.FC = ({ children }) => {
  const { autoLogin } = useAuthentication();
  const user = useSelector((state: RootState) => state.user);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    autoLogin();
    if (!user.authenticated && !user.isLoading) {
      navigate('/');
    }
    if (user.authenticated && !user.isLoading) {
      navigate('/contacts');
    }
  }, [user.authenticated]);

  if (user.isLoading || users.isLoading) {
    return <LinearProgress color="success" />;
  }

  return <>{children}</>;
};
