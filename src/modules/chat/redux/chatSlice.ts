/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, collection } from '@firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { AllMessages, Message } from 'modules/chat/consts/message';
import { fetchMessages } from 'modules/chat/redux/chatActions';
import { db } from 'modules/redux-store';

const initialState: AllMessages = {
  allMessages: [],
  loading: false,
  error: '',
  message: {
    text: '',
    uid: '',
  },
};

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

export const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    SET_LOADING: (state, { payload }) => {
      state.loading = payload;
    },
    FETCH_MESSAGES: (state, { payload }) => {
      state.allMessages = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMsg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMsg.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(sendMsg.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { FETCH_MESSAGES, SET_LOADING } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
