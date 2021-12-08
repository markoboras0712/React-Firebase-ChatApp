/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { createAsyncThunk } from '@reduxjs/toolkit';
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
import { Message } from 'modules/chat/consts/message';
import { fetchMessagesPending } from 'modules/chat/redux/chatSlice';
import { fetchMessagesFulfilled, fetchMessagesRejected } from 'modules/chat';

export const setMessagesListener =
  () => (dispatch: (arg0: { payload: any; type: string }) => void) => {
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
