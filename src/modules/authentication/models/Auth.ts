import { SerializedError } from '@reduxjs/toolkit';

export interface AuthData {
  id: string;
  displayName?: string;
  email: string;
  authenticated: boolean;
  refreshToken: string | null;
  userPhoto?: string;
  activeChats: string[];
}

export interface Auth {
  data: AuthData;
  error?: SerializedError | string;
  isLoading?: boolean;
}
