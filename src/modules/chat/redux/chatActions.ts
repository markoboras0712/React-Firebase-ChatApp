import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Message } from 'modules/chat/consts/message';

export const fetchMessages = createAsyncThunk('fetchMessages', async () => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(50));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((res) => ({ ...res.data() })) as Message[];
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});
