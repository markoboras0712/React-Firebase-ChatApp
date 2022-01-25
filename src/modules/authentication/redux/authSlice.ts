import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  getUser,
  signUpWithEmailPassword,
} from 'modules/authentication/redux/authActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, AuthData } from 'modules/authentication';

const initialState: Auth = {
  data: {
    displayName: '',
    email: '',
    id: '',
    photoUrl: '',
    activeChats: [],
  },
  error: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = initialState.data;
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.data.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signUpWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpWithEmailPassword.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signInWithEmailPassword.pending, (state) => {
      state.isLoading = true;
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
      state.data = initialState.data;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload as AuthData;
      state.isLoading = false;
    });
  },
});
const { actions, reducer } = authSlice;

export const { clearUser, saveUser } = actions;
export const authReducer = reducer;
