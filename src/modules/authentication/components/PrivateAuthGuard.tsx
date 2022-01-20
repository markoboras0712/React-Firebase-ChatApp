/* eslint-disable @typescript-eslint/no-unused-vars */
import { navigate } from '@reach/router';
import { selectUser, selectUserLoading } from 'modules/authentication';
import { Routes } from 'fixtures';
import { LoadingSpinner } from 'components';
import { selectUsersLoading } from 'modules/users';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const PrivateAuthGuard: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    if (!userLoading && !user.authenticated) {
      navigate(Routes.Login);
    }
  }, [user.authenticated]);

  if (userLoading || usersLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
