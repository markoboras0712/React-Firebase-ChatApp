import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { RootState } from 'modules/redux-store';
import { useMessages } from 'modules/chat';
import { useEffect } from 'react';

export const useContact = () => {
  const params = useParams();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const userId = useSelector((state: RootState) => state.user.userData.id);

  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );
  const { getMessages } = useMessages();
  useEffect(getMessages, []);

  const contact = users.find((user) => user.uid === params.id);
  const allMessagesWithTimestamp = messages.filter(
    (message) =>
      (message.to === params.id && userId === message.uid) ||
      (message.uid === params.id && message.to === userId),
  );
  const timestampDate = allMessagesWithTimestamp[0].createdAt?.toDate();
  const numberofHours =
    timestampDate?.getHours() + ':' + timestampDate?.getMinutes();
  console.log('Timestamp date', timestampDate);
  console.log(' num of hours and ninutes', numberofHours);
  const allMessages = allMessagesWithTimestamp.map((message) => {
    return { ...message, createdAt: message.createdAt?.toDate() };
  });
  console.log('New array with dates', allMessages);

  return { contact, allMessages };
};
