import { Contact } from 'modules/chat';
import classes from './style/ContactList.module.css';
import { useInbox } from 'modules/users';

export const MessageList: React.FC = () => {
  const contacts = useInbox();

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
