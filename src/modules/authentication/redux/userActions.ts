import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { navigate } from '@reach/router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { RegisterData, LoginData } from 'modules/authentication';
import { auth, db, provider, storage } from 'modules/redux-store';

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { user } = res;
      const userRef = collection(db, 'users');
      console.log('User ref', userRef);
      const q = query(userRef, where('id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          id: user.uid,
          authenticated: true,
          displayName: user.displayName,
          email: user.email,
          refreshToken: user.refreshToken,
          userPhoto: user.photoURL,
        });
      }
      return user;
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
      const displayName = `${userData.firstName} ${userData.lastName}`;
      console.log('Display name', displayName);
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        authenticated: true,
        displayName: displayName,
        email: user.email,
        refreshToken: user.refreshToken,
        userPhoto: userData.photoUrl,
      });
      return user;
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
      console.log(user);
      navigate('/messages');
      return user;
    } catch (error) {
      throw new Error('Didnt sign in');
    }
  },
);

export const logout = createAsyncThunk('logout', async () => {
  try {
    await signOut(auth);
    navigate('/');
  } catch (error) {
    throw new Error('didnt logout');
  }
});

export const sendPasswordReset = createAsyncThunk(
  'sendPasswordReset',
  async (userEmail: string) => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
      navigate('/');
    } catch (error) {
      throw new Error('didnt send password reset');
    }
  },
);

export const getImageUrl = createAsyncThunk(
  'getImageUrl',
  async (uploadedFile: File) => {
    try {
      const storageRef = ref(storage);
      console.log('Storage ref', storageRef);
      const imagesRef = ref(storageRef, uploadedFile.name);
      await uploadBytes(imagesRef, uploadedFile);
      console.log('Image uplaoded');
      const url = await getDownloadURL(imagesRef);
      console.log('url iz akcije', url);
      return url;
    } catch (error) {
      throw new Error('didnt fetch data');
    }
  },
);
