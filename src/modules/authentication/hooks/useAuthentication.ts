import {
  clearUser,
  LoginData,
  RegisterData,
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
  saveUser,
} from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/redux-store';

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(saveUser(user));
      }
      return unsubscribe;
    });
  };

  const loginWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const loginWithEmailPassword = (data: LoginData) => {
    dispatch(signInWithEmailPassword(data));
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };

  const registerWithEmailPassword = (data: RegisterData) => {
    dispatch(signUpWithEmailPassword(data));
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
  };

  return {
    loginWithGoogle,
    loginWithEmailPassword,
    resetPassword,
    registerWithEmailPassword,
    autoLogin,
    logoutUser,
  };
};
