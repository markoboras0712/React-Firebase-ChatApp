import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux-store';

export const usersSelector = (state: RootState) => state.users;

export const selectUsers = createDraftSafeSelector(
  usersSelector,
  (users) => users.allUsers,
);
export const selectUsersLoading = createDraftSafeSelector(
  usersSelector,
  (users) => users.isLoading,
);
export const selectKeyword = createDraftSafeSelector(
  usersSelector,
  (users) => users.keyword,
);

export const selectUsersError = createDraftSafeSelector(
  usersSelector,
  (users) => users.error,
);

export const selectOtherUserActiveChats = createDraftSafeSelector(
  usersSelector,
  (users) => users.user.activeChats,
);

export const selectOtherUser = createDraftSafeSelector(
  usersSelector,
  (users) => users.user,
);
