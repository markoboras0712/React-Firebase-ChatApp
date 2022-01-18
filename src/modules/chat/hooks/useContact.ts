import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { MessageDate, selectAllMessages, useMessages } from 'modules/chat';
import { useEffect } from 'react';
import { selectUsers } from 'modules/users';
import { selectUser } from 'modules/authentication';

export const useContact = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const messages = useSelector(selectAllMessages);
  const { getMessages } = useMessages();
  useEffect(getMessages, []);

  const contact = users.filter((user) => user.uid === (id as string));

  const allMessagesWithTimestamp = messages.filter(
    (message) =>
      (message.to === id && user.id === message.uid) ||
      (message.uid === id && message.to === user.id),
  );
  const allMessages = allMessagesWithTimestamp.map((message) => {
    return {
      ...message,
      createdAt: message.createdAt?.toDate() as Date,
    } as MessageDate;
  });

  const allDates = allMessages.map((message) => message.createdAt as Date);
  let maxDate = '';
  if (allDates.length > 0) {
    const max = allDates.reduce((a, b) => {
      return a > b ? a : b;
    });
    maxDate = max.toLocaleDateString();
  }

  return { contact: contact[0], allMessages, maxDate };
};
