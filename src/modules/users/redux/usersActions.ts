import { db } from 'modules/redux-store/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
    }));
    return allUsers;
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});
