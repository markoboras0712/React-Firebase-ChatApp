import { combineReducers } from '@reduxjs/toolkit';
import messages from '../chat/redux/chatSlice';

const rootReducer = combineReducers({
  messages,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
