/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Register, Login, AuthData } from 'modules/authentication';
import { auth, db, provider, storage } from 'modules/redux-store';
import { fetchInboxUsers, fetchUsers } from 'modules/users';

export const addUserToFirestore = createAsyncThunk(
  'addUserToFirestore',
  async (user: AuthData) => {
    try {
      await setDoc(doc(db, 'users', user.id), user);
    } catch (err) {
      alert(err);
      throw new Error('Didnt add user to firestore');
    }
  },
);

export const getUser = createAsyncThunk(
  'getUser',
  async (user: User, { dispatch }) => {
    try {
      dispatch(fetchUsers());
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userFromFirestore = docSnap.data() as AuthData;
        if (!!userFromFirestore.activeChats)
          dispatch(fetchInboxUsers(userFromFirestore.activeChats as string[]));
        return userFromFirestore;
      }
    } catch (error) {
      alert(error);
      throw new Error('didnt get user data');
    }
  },
);

export const getFirestoreImageUrl = async (photoName: string, photo: File) => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, photoName);
  await uploadBytes(imagesRef, photo);
  const url = await getDownloadURL(imagesRef);
  return url;
};

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async (_, { dispatch }) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const q = query(collection(db, 'users'), where('id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const authUser: AuthData = {
        email: user.email,
        id: user.uid,
        photoUrl: user.photoURL,
        activeChats: [],
        displayName: user.displayName,
      };
      if (!querySnapshot.docs.length) {
        dispatch(addUserToFirestore(authUser));
      }
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
      const displayName = `${userData.firstName} ${userData.lastName}`;
      const authUser: AuthData = {
        displayName: displayName,
        email: user.email as string,
        id: user.uid,
        activeChats: [],
        photoUrl: userData.photoUrl as string,
      };
      await setDoc(doc(db, 'users', user.uid), authUser);
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
