import { useEffect } from 'react';
import { selectUser, useAuthentication } from 'modules/authentication';
import { useSelector } from 'react-redux';

export const AuthListener: React.FC = ({ children }) => {
  const { autoLogin } = useAuthentication();
  const user = useSelector(selectUser);

  useEffect(() => {
    autoLogin();
  }, [user.user.authenticated]);

  return <>{children}</>;
};
