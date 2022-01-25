/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { selectUser, useAuthentication } from 'modules/authentication';
import { useDispatch, useSelector } from 'react-redux';

export const AuthListener: React.FC = ({ children }) => {
  const { autoLogin } = useAuthentication();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    autoLogin();
  }, []);

  return <>{children}</>;
};
