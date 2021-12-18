import { RootState } from 'modules/redux-store';
import { fetchUsers } from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const contacts = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user.userData);
  return contacts.filter((contact) => user.email !== contact.email);
};
