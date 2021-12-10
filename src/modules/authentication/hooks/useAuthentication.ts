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
        const { displayName, photoUrl } = await getDataFromUser(user);
        const userData: UserData = {
          displayName: displayName,
          email: user.email,
          id: user.uid,
          refreshToken: user.refreshToken,
          userPhoto: photoUrl,
        };
        dispatch(saveUser(userData));
      }
    });
  };

  const loginWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const loginWithEmailPassword = (data: LoginData) => {
    dispatch(signInWithEmailPassword(data));
    navigate('/messages');
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
  };

  const registerWithEmailPassword = (data: RegisterData) => {
    dispatch(signUpWithEmailPassword(data));
    navigate('/messages');
  };

  const logoutUser = () => {
    dispatch(logout());
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
