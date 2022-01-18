import { selectUser } from 'modules/authentication';
import {
  fetchUsers,
  selectKeyword,
  selectUsers,
  useFilter,
} from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectUsers);
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const keyword = useSelector(selectKeyword);
  const contactsForFilter = allUsers.filter(
    ({ email }) => user.email !== email,
  );
  const filteredContacts = useFilter(keyword, contactsForFilter);

  return filteredContacts;
};
