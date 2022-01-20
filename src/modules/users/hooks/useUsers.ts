import { selectUser } from 'modules/authentication';
import {
  fetchUsers,
  selectKeyword,
  selectUsers,
  useFilter,
} from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useUsers = () => {
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

  const allOtherUsers = allUsers
    .filter(({ email }) => user.email !== email)
    .filter(({ activeChats }) => activeChats.length !== 0);
  const filteredInbox = useFilter(keyword, allOtherUsers);

  return { filteredContacts, filteredInbox };
};
