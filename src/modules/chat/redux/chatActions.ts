import { db } from 'modules/redux-store/firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import {
  fetchMessagesFulfilled,
  fetchMessagesRejected,
  fetchMessagesPending,
  Message,
} from 'modules/chat';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from 'modules/redux-store';

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
  (): AppThunk => async (dispatch: AppDispatch) => {
    try {
      const messagesRef = collection(db, 'messages');
      dispatch(fetchMessagesPending());
      const q = query(messagesRef, orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
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
      return unsubscribe;
    } catch (error) {
      dispatch(fetchMessagesRejected(error));
    }
  };
