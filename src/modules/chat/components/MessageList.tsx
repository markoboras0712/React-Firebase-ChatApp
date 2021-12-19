/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContacts } from 'modules/users/hooks/useContacts';
import { Contact, useMessages } from 'modules/chat';
import classes from './style/ContactList.module.css';
import { useEffect } from 'react';
import { useInbox } from 'modules/users/hooks/useInbox';

export const MessageList: React.FC = () => {
  const contacts = useInbox();

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
