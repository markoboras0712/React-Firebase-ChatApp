import { selectUser } from 'modules/authentication';
import { Message, selectAllMessages, useMessages } from 'modules/chat';
import {
  fetchUsers,
  selectKeyword,
  selectUsers,
  useFilter,
  User,
} from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const getChattedUsers = (allOtherUsers: User[], textedMessages: Message[]) => {
  const chattedUsers = [];
  for (let i = 0; i < allOtherUsers.length; i++) {
    const currentUser = allOtherUsers[i];
    for (let j = 0; j < textedMessages.length; j++) {
      if (
        currentUser.uid === textedMessages[j].uid ||
        currentUser.uid === textedMessages[j].to
      ) {
        chattedUsers.push(currentUser);
      }
    }
  }
  return chattedUsers;
};

export const useInbox = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const messages = useSelector(selectAllMessages);
  const { getMessages } = useMessages();
  useEffect(() => {
    dispatch(fetchUsers());
    getMessages();
  }, []);
  const textedMessages = messages.filter(
    ({ to, uid }) => to === user.id || uid === user.id,
  );
  const allOtherUsers = allUsers.filter(({ email }) => user.email !== email);
  const chattedUsers = getChattedUsers(allOtherUsers, textedMessages);
  const ids = chattedUsers.map(({ uid }) => uid);
  const filteredUsers = chattedUsers.filter(
    ({ uid }, index) => !ids.includes(uid, index + 1),
  );
  const keyword = useSelector(selectKeyword);
  const filteredInbox = useFilter(keyword, filteredUsers);

  return filteredInbox;
};
