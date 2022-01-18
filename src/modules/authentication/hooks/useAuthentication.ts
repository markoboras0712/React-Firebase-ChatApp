import {
  clearUser,
  Login,
  Register,
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
import { navigate } from '@reach/router';
import { Routes } from 'fixtures';

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

  const loginWithEmailPassword = (data: Login) => {
    dispatch(signInWithEmailPassword(data));
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };

  const registerWithEmailPassword = (data: Register) => {
    dispatch(signUpWithEmailPassword(data));
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate(Routes.Login);
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
