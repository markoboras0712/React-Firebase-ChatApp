/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-spread */
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
  const arrayWithDuplicates = textedMessages
    .map((message) =>
      allOtherUsers.filter(
        (user) => user.uid === message.uid || user.uid === message.to,
      ),
    )
    .flat(1);
  const ids = arrayWithDuplicates.map(({ uid }) => uid);

  const filteredUsers = arrayWithDuplicates.filter(
    ({ uid }, index) => !ids.includes(uid, index + 1),
  );

  return filteredUsers;
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

  const keyword = useSelector(selectKeyword);
  const filteredInbox = useFilter(keyword, chattedUsers);

  return filteredInbox;
};
