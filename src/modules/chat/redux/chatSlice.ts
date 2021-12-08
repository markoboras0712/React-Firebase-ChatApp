/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchUsers, sendMsg } from 'modules/chat/redux/chatActions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AllMessages, Message } from 'modules/chat/consts/message';
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

export const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesPending: (state) => {
      state.loading = true;
    },
    fetchMessagesFulfilled: (state, { payload }) => {
      state.allMessages = payload;
      state.loading = false;
    },
    fetchMessagesRejected: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
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
export const {
  fetchMessagesPending,
  fetchMessagesFulfilled,
  fetchMessagesRejected,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
