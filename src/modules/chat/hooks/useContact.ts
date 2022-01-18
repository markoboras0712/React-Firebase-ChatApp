/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { selectAllMessages, useMessages } from 'modules/chat';
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

  const contact = users.filter(({ uid }) => uid === (id as string));

  const allMessages = messages.filter(
    ({ to, uid }) =>
      (to === id && user.id === uid) || (uid === id && to === user.id),
  );

  const allDates = allMessages.map(({ createdAt }) => createdAt as Date);
  let maxDate = '';
  if (allDates.length > 0) {
    const max = allDates.reduce((a, b) => {
      return a > b ? a : b;
    });
    maxDate = max.toLocaleDateString();
  }

  return { contact: contact[0], allMessages, maxDate };
};
