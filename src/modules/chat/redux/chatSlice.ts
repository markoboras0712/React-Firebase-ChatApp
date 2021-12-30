import { sendMsg } from './chatActions';
import { AllMessages, Message } from 'modules/chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux-store';

const initialState: AllMessages = {
  allMessages: [],
  loading: false,
  error: '',
};

export const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesPending: (state) => {
      state.loading = true;
    },
    fetchMessagesFulfilled: (state, action: PayloadAction<Message[]>) => {
      state.allMessages = action.payload;
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
export const selectAllMessages = (state: RootState) =>
  state.messages.allMessages;
export const chatReducer = chatSlice.reducer;
