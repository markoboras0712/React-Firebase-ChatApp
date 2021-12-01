import { createSlice } from '@reduxjs/toolkit';
import { User } from 'modules/authentication';
import {
  signInWithGoogle,
  signUpWithEmailPassword,
} from 'modules/authentication/redux/userActions';

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
    saveUser: (state, action) => {
      state.userData.displayName = action.payload.displayName;
      state.userData.email = action.payload?.email;
      state.userPhoto = action.payload?.userPhoto;
      state.authenticated = true;
      state.userData.id = action.payload?.id;
      state.refreshToken = action.payload?.refreshToken;
    },
    clearUser: (state) => {
      state.userData.displayName = null;
      state.userData.email = null;
      state.userPhoto = '';
      state.authenticated = false;
      state.userData.id = '';
      state.refreshToken = null;
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
    });
    builder.addCase(signUpWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpWithEmailPassword.fulfilled, (state, action) => {
      state.userData.displayName = action.payload?.email;
      state.userData.email = action.payload?.email;
      state.authenticated = true;
      state.userData.id = action.payload?.uid;
      state.userPhoto = action.payload.photoURL;
      state.refreshToken = action.payload?.refreshToken;
      state.isLoading = false;
    });
    builder.addCase(signUpWithEmailPassword.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});
const { actions, reducer } = userSlice;
export const { saveUser, clearUser } = actions;
export const userReducer = reducer;
