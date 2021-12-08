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

    listenerUnsubscribeList.push(unsubscribe);
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});

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
