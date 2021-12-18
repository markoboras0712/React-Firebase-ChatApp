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
  Timestamp,
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
      createdAt: new Date(Date.now()),
      text: message.text,
      uid: message.uid,
      to: message.to,
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
      const q = query(messagesRef, orderBy('createdAt'));
      onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Message[];
        const updated = messages.map((msg) => ({
          ...msg,
          createdAt: new Timestamp(
            msg.createdAt?.seconds as number,
            msg.createdAt?.nanoseconds as number,
          ).toDate(),
        }));
        dispatch(fetchMessagesFulfilled(updated));
      });
    } catch (error) {
      dispatch(fetchMessagesRejected(error));
    }
  };

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map((res) => {
      console.log(res.data());
    });
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});
