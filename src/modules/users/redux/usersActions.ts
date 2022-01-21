import { db } from 'modules/redux-store/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'modules/users';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const allUsers: User[] = querySnapshot.docs.map((res) => ({
      email: res.data().email,
      uid: res.data().id,
      userName: res.data().displayName,
      userPhoto: res.data().userPhoto,
      activeChats: res.data().activeChats,
    }));
    return allUsers;
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});

export const fetchInboxUsers = createAsyncThunk(
  'fetchInboxUsers',
  async (activeChats: string[]) => {
    try {
      const chatsQuery = query(
        collection(db, 'users'),
        where('activeChats', 'array-contains-any', activeChats),
      );
      const querySnapshot = await getDocs(chatsQuery);
      const inboxUsers: User[] = querySnapshot.docs.map((res) => ({
        email: res.data().email,
        uid: res.data().id,
        userName: res.data().displayName,
        userPhoto: res.data().userPhoto,
        activeChats: res.data().activeChats,
      }));
      return inboxUsers;
    } catch (error) {
      throw new Error('didnt fetch data');
    }
  },
);
