import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from 'modules/chat';

const rootReducer = combineReducers({
  messages: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
