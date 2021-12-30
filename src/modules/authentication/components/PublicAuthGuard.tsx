import { LinearProgress } from '@mui/material';
import { navigate } from '@reach/router';
import { selectUser, selectUserLoading } from 'modules/authentication';
import { RootState } from 'modules/redux-store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const PublicAuthGuard: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const users = useSelector((state: RootState) => state.users);
  useEffect(() => {
    if (!loading && user.authenticated) {
      navigate('/contacts');
    }
  }, [user.authenticated]);

  if (loading || users.isLoading) {
    return <LinearProgress color="success" />;
  }

  return <>{children}</>;
};
