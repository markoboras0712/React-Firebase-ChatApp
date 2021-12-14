import { useContacts } from 'modules/users/hooks/useContacts';
import { Contact } from 'modules/chat';
import classes from './style/ContactList.module.css';

export const MessageList: React.FC = () => {
  const contacts = useContacts();
  return (
    <div className={classes.container}>
      {contacts.map(({ uid, userName, userPhoto }) => (
        <Contact
          key={uid}
          uid={uid as string}
          userName={userName as string}
          userPhoto={userPhoto as string}
        />
      ))}
    </div>
  );
};
