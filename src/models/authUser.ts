import { SerializedError } from '@reduxjs/toolkit';

export interface AuthUser {
  id?: string;
  displayName?: string;
  email?: string;
  authenticated?: boolean;
  refreshToken?: string | undefined | null;
  userPhoto?: string;
}

export interface ReduxUser {
  user: AuthUser;
  error?: SerializedError | string;
  isLoading?: boolean;
}
