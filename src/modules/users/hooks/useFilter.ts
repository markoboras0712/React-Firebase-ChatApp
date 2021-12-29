import { User } from 'modules/users';

export const useFilter = (keyword: string, users: User[]) => {
  let results: User[] = [];
  if (keyword !== '') {
    results = users.filter((user) => {
      return (
        user.userName?.toLowerCase().startsWith(keyword.toLowerCase()) ||
        user.userName?.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  } else {
    results = users;
  }
  return results;
};
