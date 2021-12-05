import {
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
} from 'modules/authentication/redux/userActions';
import { LoginData } from 'modules/authentication';
import { useDispatch } from 'react-redux';

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const loginWithEmailPassword = (data: LoginData) => {
    dispatch(signInWithEmailPassword(data));
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };
  return { loginWithGoogle, loginWithEmailPassword, resetPassword };
};
