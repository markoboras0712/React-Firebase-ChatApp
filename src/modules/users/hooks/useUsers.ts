import { RootState } from 'modules/redux-store';
import { fetchUsers } from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';
export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user.userData);

  const getContacts = async () => {
    await dispatch(fetchUsers());
    console.log(
      'Filtered contacts',
      users.filter((contact) => user.email !== contact.email),
    );
  };

  return {
    getContacts,
  };
};
