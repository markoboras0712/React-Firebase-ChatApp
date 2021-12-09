import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from 'modules/authentication/redux/userSlice';
import { chatReducer } from 'modules/chat';
import { usersReducer } from 'modules/users';

export const rootReducer = combineReducers({
  messages: chatReducer,
  user: userReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
