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
import { FETCH_MESSAGES, SET_LOADING } from 'modules/chat/redux/chatSlice';
import { async } from '@firebase/util';
const listenerUnsubscribeList = [];
export const fetchMessages = createAsyncThunk('fetchMessages', async () => {
  try {
    const messagesRef = collection(db, 'messages');
    let messages: Message[] = [];
    const q = query(messagesRef, orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      messages = snapshot.docs.map((doc) => ({ ...doc.data() })) as Message[];
      console.log(messages);
    });
    console.log('message izvan subscribea', messages);
    listenerUnsubscribeList.push(unsubscribe);
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});

//THUNKS

export const setMessagesListener =
  () => (dispatch: (arg0: { payload: any; type: string }) => void) => {
    const messagesRef = collection(db, 'messages');
    dispatch(SET_LOADING(true));
    let messages: Message[] = [];
    const q = query(messagesRef, orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      messages = snapshot.docs.map((doc) => ({ ...doc.data() })) as Message[];
      dispatch(FETCH_MESSAGES(messages));
    });
    dispatch(SET_LOADING(false));
    console.log('message izvan subscribea', messages);
  };

export const sendMessageListener =
  (message: Message) =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    dispatch(SET_LOADING(true));
    await addDoc(collection(db, 'messages'), {
      createdAt: serverTimestamp(),
      text: message.text,
      uid: message.uid,
      userName: message.userName,
      userPhoto: message.userPhoto,
    });
    dispatch(SET_LOADING(false));
  };
