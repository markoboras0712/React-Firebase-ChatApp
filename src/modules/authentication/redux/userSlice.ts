import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
  saveUser,
} from 'modules/authentication/redux/userActions';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models';

const initialState: User = {
  userData: {
    email: null,
    id: '',
    displayName: null,
  },
  authenticated: false,
  refreshToken: null,
  userPhoto: '',
  error: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData.displayName = null;
      state.userData.email = null;
      state.userPhoto = '';
      state.authenticated = false;
      state.userData.id = '';
      state.refreshToken = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.userData.displayName = action.payload?.displayName;
      state.userData.email = action.payload?.email;
      state.userPhoto = action.payload.photoURL;
      state.authenticated = true;
      state.userData.id = action.payload?.uid;
      state.refreshToken = action.payload?.refreshToken;
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
      state.userData.displayName = action.payload.displayName;
      state.userData.email = action.payload?.user.email;
      state.authenticated = true;
      state.userData.id = action.payload?.user.uid;
      state.userPhoto = action.payload.url;
      state.refreshToken = action.payload?.user.refreshToken;
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
      state.userData.email = action.payload?.user.email;
      state.authenticated = true;
      state.userData.id = action.payload?.user.uid;
      state.refreshToken = action.payload?.user.refreshToken;
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
      state.authenticated = false;
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
      state.userData.displayName = null;
      state.userData.email = null;
      state.authenticated = false;
      state.userData.id = undefined;
      state.refreshToken = null;
      state.userPhoto = null;
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
      state.userData.displayName = action.payload.userData.displayName;
      state.userPhoto = action.payload.userData.userPhoto;
      state.refreshToken = action.payload.userData.refreshToken;
      state.authenticated = true;
      state.isLoading = false;
      state.userData.id = action.payload.userData.id;
      state.userData.email = action.payload.userData.email;
    });
  },
});
const { actions, reducer } = userSlice;
export const { clearUser } = actions;
export const userReducer = reducer;
