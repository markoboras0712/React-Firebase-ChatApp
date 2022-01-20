import { Contact } from 'modules/chat';
import classes from './style/ContactList.module.css';
import { useUsers } from 'modules/users';

export const MessageList: React.FC = () => {
  const { filteredInbox } = useUsers();

  return (
    <div className={classes.container}>
      {filteredInbox.map(({ uid, userName, userPhoto }) => (
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
