export interface UserData {
  id?: string;
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean;
  refreshToken?: string;
  userPhoto?: string | null;
  loading?: boolean;
}
