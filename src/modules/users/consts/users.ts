export interface User {
  email?: string | undefined | null;
  uid?: string | undefined | null;
  userName?: string | undefined | null;
  userPhoto?: string | undefined | null;
}

export interface AllUsers {
  allUsers: User[];
  loading: boolean;
  error: string | unknown;
}