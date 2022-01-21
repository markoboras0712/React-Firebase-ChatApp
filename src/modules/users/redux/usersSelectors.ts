import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux-store';

export const usersSelector = (state: RootState) => state.users;

export const selectUsersLoading = createDraftSafeSelector(
  usersSelector,
  (users) => users.isLoading,
);

export const selectUsersError = createDraftSafeSelector(
  usersSelector,
  (users) => users.error,
);
export const selectKeyword = createDraftSafeSelector(
  usersSelector,
  (users) => users.keyword,
);

export const selectAllOtherUsers = createDraftSafeSelector(
  usersSelector,
  (state: RootState) => state.auth.data.email,
  (users, userEmail) =>
    users.allUsers.filter(({ email }) => userEmail !== email),
);

export const selectAllOtherInboxUsers = createDraftSafeSelector(
  usersSelector,
  (state: RootState) => state.auth.data.email,
  (users, userEmail) =>
    users.inboxUsers.filter(({ email }) => userEmail !== email),
);
