import { fetchUsers } from 'modules/users/redux/usersActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllUsers, User } from 'modules/users/consts/users';

const initialState: AllUsers = {
  allUsers: [],
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      },
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
