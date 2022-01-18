import { fetchUsers } from 'modules/users/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllUsers, User } from 'modules/users';

const initialState: AllUsers = {
  allUsers: [],
  keyword: '',
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;

export const { addKeyword } = usersSlice.actions;
