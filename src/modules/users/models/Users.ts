export interface User {
  email?: string | undefined | null;
  uid: string;
  userName: string;
  userPhoto: string;
}

export interface AllUsers {
  allUsers: User[];
  keyword: string;
  isLoading: boolean;
  error: string | unknown;
}
