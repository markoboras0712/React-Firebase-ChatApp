import { SerializedError } from '@reduxjs/toolkit';

export interface AuthData {
  id: string;
  displayName?: string;
  email: string;
  authenticated: boolean;
  refreshToken: string | null;
  userPhoto?: string;
  activeChats?: string[];
}

export class AuthData {
  constructor({
    id,
    displayName,
    email,
    authenticated,
    refreshToken,
    userPhoto,
    activeChats,
  }: AuthData) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.authenticated = authenticated;
    this.refreshToken = refreshToken;
    this.userPhoto = userPhoto;
    this.activeChats = activeChats;
  }
}

export interface Auth {
  data: AuthData;
  error?: SerializedError | string;
  isLoading?: boolean;
}
