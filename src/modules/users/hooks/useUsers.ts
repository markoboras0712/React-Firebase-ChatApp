import { selectUserActiveChats } from 'modules/authentication';
import {
  selectKeyword,
  selectAllOtherUsers,
  useFilter,
  fetchInboxUsers,
  selectAllOtherInboxUsers,
} from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';

export const useUsers = () => {
  const allUsers = useSelector(selectAllOtherUsers);
  const allOtherInboxUsers = useSelector(selectAllOtherInboxUsers);
  const userChats = useSelector(selectUserActiveChats);
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);

  const filteredContacts = useFilter(keyword, allUsers);

  const getAllInboxUsers = () => {
    if (userChats) {
      dispatch(fetchInboxUsers(userChats));
    }
  };

  const filteredInbox = useFilter(keyword, allOtherInboxUsers);

  return { filteredContacts, filteredInbox, getAllInboxUsers };
};
