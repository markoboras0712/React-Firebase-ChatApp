import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from 'modules/authentication/redux/userSlice';
import { chatReducer } from 'modules/chat';

export const rootReducer = combineReducers({
  messages: chatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
