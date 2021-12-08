/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { db } from 'modules/redux-store/firebase';
import {
  addDoc,
  collection,
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

export const sendMsg = createAsyncThunk('sendMsg', async (message: Message) => {
  try {
    await addDoc(collection(db, 'messages'), {
      createdAt: serverTimestamp(),
      text: message.text,
      uid: message.uid,
      userName: message.userName,
      userPhoto: message.userPhoto,
    });
  } catch (error) {
    throw new Error('didnt send message');
  }
});

export const setMessagesListener =
  () => (dispatch: (arg0: { payload: unknown; type: string }) => void) => {
    try {
      const messagesRef = collection(db, 'messages');
      dispatch(fetchMessagesPending());
      const q = query(messagesRef, orderBy('createdAt'), limit(50));
      onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({ ...doc.data() }));
        dispatch(fetchMessagesFulfilled(messages));
      });
    } catch (error) {
      dispatch(fetchMessagesRejected(error));
    }
  };
