import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'modules/redux-store/firebase';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
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

export const sendMessage = createAsyncThunk(
  'sendMessage',
  async (message: Message) => {
    try {
      await addDoc(collection(db, 'messages'), {
        createdAt: serverTimestamp(),
        photoUrl: message.photoUrl,
        text: message.text,
        uid: message.uid,
      });
    } catch (error) {
      throw new Error('didnt send message');
    }
  },
);
