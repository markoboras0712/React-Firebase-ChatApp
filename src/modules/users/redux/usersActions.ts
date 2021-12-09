/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { db } from 'modules/redux-store/firebase';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import {
  fetchMessagesFulfilled,
  fetchMessagesRejected,
  fetchMessagesPending,
  Message,
} from 'modules/chat';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'modules/users/consts/users';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const allUsers: User[] = querySnapshot.docs.map((res) => ({
      email: res.data().email,
      uid: res.data().id,
      userName: res.data().displayName,
      userPhoto: res.data().userPhoto,
    }));
    console.log(allUsers);
    return allUsers;
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});
