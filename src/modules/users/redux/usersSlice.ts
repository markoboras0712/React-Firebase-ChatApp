import { fetchUsers } from 'modules/users/redux/usersActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllUsers, User } from 'modules/users/consts/users';

const initialState: AllUsers = {
  allUsers: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.allUsers = action.payload;
      },
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
