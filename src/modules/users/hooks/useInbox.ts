import { useMessages } from 'modules/chat';
import { RootState } from 'modules/redux-store';
import { fetchUsers } from 'modules/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useInbox = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user.userData);
  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );
  const { getMessages } = useMessages();
  useEffect(() => {
    dispatch(fetchUsers());
    getMessages();
  }, []);
  const textedMessages = messages.filter(
    (message) => message.to === user.id || message.uid === user.id,
  );
  const allOtherUsers = allUsers.filter(
    (contact) => user.email !== contact.email,
  );
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

  const ids = chattedUsers.map((user) => user.uid);
  const filteredUsers = chattedUsers.filter(
    ({ uid }, index) => !ids.includes(uid, index + 1),
  );

  return filteredUsers;
};
