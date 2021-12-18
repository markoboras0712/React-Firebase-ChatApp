/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { RootState } from 'modules/redux-store';
import { useMessages } from 'modules/chat';
import { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

export const useContact = () => {
  const params = useParams();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user.userData.id);

  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );
  const { getMessages } = useMessages();
  useEffect(getMessages, []);

  const contact = users.find((user) => user.uid === params.id);
  const allMessages = messages.filter(
    (message) =>
      (message.to === params.id && user === message.uid) ||
      (message.uid === params.id && message.to === user),
  );
  return { contact, allMessages };
};
