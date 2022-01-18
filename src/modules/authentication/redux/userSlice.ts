import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
  saveUser,
} from 'modules/authentication/redux/userActions';
import { createSlice } from '@reduxjs/toolkit';
import { ReduxUser } from 'models';
import { RootState } from 'modules/redux-store';

const initialState: ReduxUser = {
  user: {
    authenticated: false,
    refreshToken: '',
    displayName: '',
    email: '',
    id: '',
    userPhoto: '',
  },
  error: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
      state.isLoading = false;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signUpWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpWithEmailPassword.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
      state.isLoading = false;
    });
    builder.addCase(signUpWithEmailPassword.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signInWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithEmailPassword.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
      state.isLoading = false;
    });
    builder.addCase(signInWithEmailPassword.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(sendPasswordReset.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendPasswordReset.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendPasswordReset.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(saveUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.user = action.payload.authUser;
      state.isLoading = false;
    });
  },
});
const { actions, reducer } = userSlice;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const { clearUser } = actions;
export const userReducer = reducer;
