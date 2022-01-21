import { useEffect } from 'react';
import { useAuthentication } from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { fetchUsers } from 'modules/users';

export const AuthListener: React.FC = ({ children }) => {
  const { autoLogin } = useAuthentication();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    autoLogin();
  }, []);

  return <>{children}</>;
};
