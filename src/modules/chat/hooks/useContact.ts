import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { selectAllMessages } from 'modules/chat';
import { selectUsers } from 'modules/users';

export const useContact = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers);
  const messages = useSelector(selectAllMessages);

  const contact = users.filter(({ uid }) => uid === (id as string));

  const allDates = messages.map(({ createdAt }) => createdAt as Date);
  let maxDate = '';
  if (allDates.length > 0) {
    const max = allDates.reduce((a, b) => {
      return a > b ? a : b;
    });
    maxDate = max.toLocaleDateString();
  }

  return { contact: contact[0], maxDate };
};
