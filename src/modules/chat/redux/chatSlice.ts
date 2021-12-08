/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllMessages, Message } from 'modules/chat/consts/message';
import { fetchMessages, sendMsg } from 'modules/chat/redux/chatActions';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.allMessages = [];
      state.loading = false;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
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

export const chatReducer = chatSlice.reducer;
