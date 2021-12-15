import { useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import { RootState } from 'modules/redux-store';

export const useContact = () => {
  const params = useParams();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const contact = users.find((user) => user.uid === params.id);

  return contact;
};
