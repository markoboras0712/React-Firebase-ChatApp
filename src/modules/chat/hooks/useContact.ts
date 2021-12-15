import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { RootState } from 'modules/redux-store';
import { useMessages } from 'modules/chat';
import { useEffect } from 'react';

export const useContact = () => {
  const params = useParams();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const user = useSelector((state: RootState) => state.user);
  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );
  const { getMessages } = useMessages();
  useEffect(getMessages, []);

  const contact = users.find((user) => user.uid === params.id);
  const sentMessages = messages.filter((message) => message.to === params.id);
  const allreceivedMessages = messages.filter(
    (message) => message.to === user.userData.id,
  );
  const receivedMessages = allreceivedMessages.filter(
    (message) => message.uid === params.id,
  );
  const messagesForChat = sentMessages.concat(receivedMessages);
  return { contact, sentMessages, receivedMessages, messagesForChat };
};
