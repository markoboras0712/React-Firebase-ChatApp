import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Register, Login, AuthData } from 'modules/authentication';

import { auth, db, provider, storage } from 'modules/redux-store';

const getFirestoreImageUrl = async (userData: Register) => {
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
      const authUser: AuthData = {
        authenticated: true,
        refreshToken: user.refreshToken,
        userPhoto: user.photoURL as string,
        displayName: user.displayName as string,
        email: user.email as string,
        id: user.uid,
        activeChats: [],
      };
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        await setDoc(doc(db, 'users', user.uid), authUser);
      }
      return authUser;
    } catch (err) {
      alert(err);
      throw new Error('Didnt sign in');
    }
  },
);

export const signUpWithEmailPassword = createAsyncThunk(
  'signUpWithEmailPassword',
  async (userData: Register) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const { user } = response;
      const url = await getFirestoreImageUrl(userData);
      const displayName = `${userData.firstName} ${userData.lastName}`;
      const authUser: AuthData = {
        authenticated: true,
        refreshToken: user.refreshToken,
        userPhoto: url,
        displayName: displayName,
        email: user.email as string,
        id: user.uid,
        activeChats: [],
      };
      await setDoc(doc(db, 'users', user.uid), authUser);
      return authUser;
    } catch (error) {
      alert(error);
      throw new Error('Didng signup');
    }
  },
);

export const signInWithEmailPassword = createAsyncThunk(
  'signInWithEmailPassword',
  async (userData: Login) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      const { user } = response;
      const authUser: AuthData = {
        authenticated: true,
        refreshToken: user.refreshToken,
        email: user.email as string,
        id: user.uid,
        activeChats: [],
      };
      return authUser;
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

export const saveUser = createAsyncThunk('saveUser', async (uid: string) => {
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('id', '==', uid));
    const querySnapshot = await getDocs(q);
    let authUser: AuthData = {
      id: '',
      email: '',
      authenticated: false,
      refreshToken: null,
      activeChats: [],
    };
    querySnapshot.docs.map((res) => (authUser = res.data() as AuthData));
    return authUser;
  } catch (error) {
    alert(error);
    throw new Error('didnt get user data');
  }
});
