/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  fetchMessagesFulfilled,
  fetchMessagesRejected,
  fetchMessagesPending,
  Message,
} from 'modules/chat';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk, db } from 'modules/redux-store';
import { fetchUsers } from 'modules/users';
import { getUser, updateUserChats } from 'modules/authentication';

export const createNewChat = createAsyncThunk(
  'createNewChat',
  async (message: Message) => {
    try {
      const chatRef = await addDoc(collection(db, 'messages'), {});
      await addDoc(collection(db, 'messages', chatRef.id, 'messages'), {
        createdAt: new Date(Date.now()),
        text: message.text,
        uid: message.uid,
        to: message.to,
      });
      const fromRef = doc(db, 'users', message.uid);
      const toRef = doc(db, 'users', message.to);
      await updateDoc(fromRef, {
        activeChats: arrayUnion(chatRef.id),
      });
      await updateDoc(toRef, {
        activeChats: arrayUnion(chatRef.id),
      });
    } catch (error) {
      alert(error);
      throw new Error('didnt send message');
    }
  },
);

export const createNewChatTest = createAsyncThunk(
  'createNewChatTest',
  async (message: Message, { dispatch }) => {
    try {
      const chatRef = await addDoc(collection(db, 'messages'), {});
      console.log('chat ref id', chatRef);
      await addDoc(collection(db, 'messages', chatRef.id, 'messages'), {});
      const fromRef = doc(db, 'users', message.uid);
      const toRef = doc(db, 'users', message.to);
      await updateDoc(fromRef, {
        activeChats: arrayUnion(chatRef.id),
      });
      await updateDoc(toRef, {
        activeChats: arrayUnion(chatRef.id),
      });
      dispatch(updateUserChats(message.uid));
    } catch (error) {
      alert(error);
      throw new Error('didnt send message');
    }
  },
);

export const sendNewMessage = createAsyncThunk(
  'sendNewMessage',
  async (message: Message) => {
    try {
      const subCollectionRef = collection(
        db,
        'messages',
        message.subCollection as string,
        'messages',
      );
      await addDoc(subCollectionRef, {
        createdAt: new Date(Date.now()),
        text: message.text,
        uid: message.uid,
        to: message.to,
      });
    } catch (error) {
      alert(error);
      throw new Error('didnt send message');
    }
  },
);

export const setMessagesListener =
  (id: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const messagesRef = collection(db, 'messages', id, 'messages');
      dispatch(fetchMessagesPending());
      const q = query(messagesRef, orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              createdAt: doc.data().createdAt.toDate(),
            } as Message),
        );
        dispatch(fetchMessagesFulfilled(messages));
      });
      return unsubscribe;
    } catch (error) {
      dispatch(fetchMessagesRejected(error));
    }
  };
