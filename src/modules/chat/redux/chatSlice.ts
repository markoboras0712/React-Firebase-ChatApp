import { createSlice } from '@reduxjs/toolkit';
import { AllMessages } from 'modules/chat/consts/message';
import { fetchMessages } from 'modules/chat/redux/chatActions';

const initialState: AllMessages = {
  allMessages: [],
  loading: false,
  error: '',
  message: {
    photoUrl: '',
    text: '',
    uid: '',
  },
};

const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.allMessages = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default chatSlice.reducer;
