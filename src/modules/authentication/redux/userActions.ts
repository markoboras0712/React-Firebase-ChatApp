import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { RegisterData, LoginData } from 'modules/authentication';
import { AuthUser } from 'models';
import { auth, db, provider, storage } from 'modules/redux-store';

const getFirestoreImageUrl = async (userData: RegisterData) => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, userData.uploadedPhoto?.name);
  await uploadBytes(imagesRef, userData.uploadedPhoto as File);
  const url = await getDownloadURL(imagesRef);
  return url;
};

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { user } = res;
      const userRef = collection(db, 'users');
      const q = query(userRef, where('id', '==', user.uid));
      const authUser: AuthUser = {
        authenticated: true,
        refreshToken: user.refreshToken,
        userPhoto: user.photoURL as string,
        displayName: user.displayName as string,
        email: user.email as string,
        id: user.uid,
      };
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, 'users'), authUser);
      }
      return { authUser };
    } catch (err) {
      throw new Error('Didnt sign in');
    }
  },
);

export const signUpWithEmailPassword = createAsyncThunk(
  'signUpWithEmailPassword',
  async (userData: RegisterData) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const { user } = response;
      const url = await getFirestoreImageUrl(userData);
      const displayName = `${userData.firstName} ${userData.lastName}`;
      const authUser: AuthUser = {
        authenticated: true,
        refreshToken: user.refreshToken,
        userPhoto: url,
        displayName: displayName,
        email: user.email as string,
        id: user.uid,
      };
      await addDoc(collection(db, 'users'), authUser);
      return { authUser };
    } catch (error) {
      throw new Error('Didng signup');
    }
  },
);

export const signInWithEmailPassword = createAsyncThunk(
  'signInWithEmailPassword',
  async (userData: LoginData) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const { user } = response;
      const authUser: AuthUser = {
        authenticated: true,
        refreshToken: user.refreshToken,
        email: user.email as string,
        id: user.uid,
      };
      return { authUser };
    } catch (error) {
      alert(error);
      throw new Error('Didnt sign in');
    }
  },
);

export const logout = createAsyncThunk('logout', async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('didnt logout');
  }
});

export const sendPasswordReset = createAsyncThunk(
  'sendPasswordReset',
  async (userEmail: string) => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
    } catch (error) {
      alert(error);
      throw new Error('didnt send password reset');
    }
  },
);

export const saveUser = createAsyncThunk('saveUser', async (user: User) => {
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('id', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let authUser: AuthUser = {};
    querySnapshot.docs.map((res) => (authUser = res.data()));
    return { authUser };
  } catch (error) {
    alert(error);
    throw new Error('didnt get user data');
  }
});
