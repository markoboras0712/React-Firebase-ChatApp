import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { RootState } from 'modules/redux-store';
import { useMessages } from 'modules/chat';
import { useEffect } from 'react';

export const useContact = () => {
  const { id } = useParams();

  const users = useSelector((state: RootState) => state.users.allUsers);
  const userId = useSelector((state: RootState) => state.user.user.id);

  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );
  const { getMessages } = useMessages();
  useEffect(getMessages, []);

  const contact = users.find((user) => user.uid === id);
  const allMessagesWithTimestamp = messages.filter(
    (message) =>
      (message.to === id && userId === message.uid) ||
      (message.uid === id && message.to === userId),
  );
  const allMessages = allMessagesWithTimestamp.map((message) => {
    return { ...message, createdAt: message.createdAt?.toDate() as Date };
  });

  const allDates = allMessages.map((message) => message.createdAt);
  const temp = [];
  if (allDates.length > 0) {
    const max = allDates.reduce((a, b) => {
      return a > b ? a : b;
    });
    temp.push(max.toLocaleDateString());
  }

  return { contact, allMessages, maxDate: temp[0] };
};
