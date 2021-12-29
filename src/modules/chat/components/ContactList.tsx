import { Contact } from 'modules/chat';
import { useContacts } from 'modules/users';

import classes from './style/ContactList.module.css';

export const ContactList: React.FC = () => {
  const contacts = useContacts();
  return (
    <div className={classes.container}>
      {contacts.map(({ uid, userName, userPhoto }) => (
        <Contact
          key={uid}
          uid={uid}
          userName={userName}
          userPhoto={userPhoto}
        />
      ))}
    </div>
  );
};
