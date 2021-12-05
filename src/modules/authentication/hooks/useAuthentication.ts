import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
} from 'modules/authentication/redux/userActions';
import {
  clearUser,
  LoginData,
  RegisterData,
  saveUser,
} from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from 'modules/redux-store';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
        const userRef = collection(db, 'users');
        const q = query(userRef, where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const dataFromFirestore: string[] = [];
        if (querySnapshot.docs.length === 1) {
          querySnapshot.docs.map((res) => {
            dataFromFirestore.push(res.data().userPhoto);
            dataFromFirestore.push(res.data().displayName);
          });
        }
        const photoUrl = dataFromFirestore[0];
        const displayName = dataFromFirestore[1];
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

  return {
    loginWithGoogle,
    loginWithEmailPassword,
    resetPassword,
    registerWithEmailPassword,
    autoLogin,
  };
};
