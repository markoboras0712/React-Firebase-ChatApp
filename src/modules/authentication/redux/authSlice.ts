import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
  saveUser,
} from 'modules/authentication/redux/authActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, AuthData } from 'modules/authentication';

const initialState: Auth = {
  data: {
    authenticated: false,
    refreshToken: '',
    displayName: '',
    email: '',
    id: '',
    userPhoto: '',
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
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      signInWithGoogle.fulfilled,
      (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signUpWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      signUpWithEmailPassword.fulfilled,
      (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(signUpWithEmailPassword.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
    builder.addCase(signInWithEmailPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      signInWithEmailPassword.fulfilled,
      (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
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
    builder.addCase(
      saveUser.fulfilled,
      (state, action: PayloadAction<AuthData>) => {
        state.data = action.payload;
        state.isLoading = false;
      },
    );
  },
});
const { actions, reducer } = authSlice;

export const { clearUser } = actions;
export const authReducer = reducer;
