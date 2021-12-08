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
import { auth, db, provider, storage } from 'modules/redux-store';

const getPhotoDisplayName = async (user: User) => {
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
  return { photoUrl, displayName };
};

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
      const url = await getFirestoreImageUrl(userData);
      const displayName = `${userData.firstName} ${userData.lastName}`;
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        authenticated: true,
        displayName: displayName,
        email: user.email,
        refreshToken: user.refreshToken,
        userPhoto: url,
      });
      return { user, url, displayName };
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
      const { photoUrl, displayName } = await getPhotoDisplayName(user);
      return { user, photoUrl, displayName };
    } catch (error) {
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
      throw new Error('didnt send password reset');
    }
  },
);
