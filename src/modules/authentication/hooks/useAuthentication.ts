import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
} from 'modules/authentication/redux/userActions';
import {
  clearUser,
  getDataFromUser,
  LoginData,
  RegisterData,
  saveUser,
} from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/redux-store';

import { navigate } from '@reach/router';

export interface UserData {
  id?: string | undefined | null;
  displayName: string | null | undefined;
  email: string | null | undefined;
  authenticated?: boolean;
  refreshToken?: string | null;
  userPhoto?: string | null | undefined;
  loading?: boolean | undefined;
}

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const autoLogin = () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(logout());
        dispatch(clearUser());
      }
      if (user) {
        console.log('Auto login', user);
        const { displayName, photoUrl } = await getDataFromUser(user);
        const userData: UserData = {
          displayName: displayName,
          email: user.email,
          id: user.uid,
          refreshToken: user.refreshToken,
          userPhoto: photoUrl,
        };
        dispatch(saveUser(userData));
        console.log('User refresh token', user.refreshToken);
      }
    });
  };

  const loginWithGoogle = async () => {
    await dispatch(signInWithGoogle());
    navigate('/messages');
  };

  const loginWithEmailPassword = async (data: LoginData) => {
    await dispatch(signInWithEmailPassword(data));
    navigate('/messages');
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };

  const registerWithEmailPassword = async (data: RegisterData) => {
    await dispatch(signUpWithEmailPassword(data));
    navigate('/messages');
  };

  const logoutUser = async () => {
    await dispatch(logout());
    navigate('/messages');
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
