import { RootState } from 'modules/redux-store';
import { fetchUsers, useFilter } from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const keyword = useSelector((state: RootState) => state.users.keyword);
  const contactsForFilter = allUsers.filter(
    (contact) => user.email !== contact.email,
  );
  const filteredContacts = useFilter(keyword, contactsForFilter);

  return filteredContacts;
};
