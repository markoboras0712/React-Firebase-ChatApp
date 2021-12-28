import { SerializedError } from '@reduxjs/toolkit';

export interface UserAuthData {
  id?: string;
  displayName?: string | null | undefined;
  email?: string | null;
}
export interface User {
  userData: UserAuthData;
  authenticated: boolean;
  refreshToken: string | undefined | null;
  userPhoto: string | null | undefined;
  error?: SerializedError | string;
  isLoading: boolean;
}
