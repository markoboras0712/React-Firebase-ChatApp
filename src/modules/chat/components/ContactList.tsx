import { Contact } from 'modules/chat';
import { useUsers } from 'modules/users';
import React from 'react';

import classes from './style/ContactList.module.css';

export const ContactList: React.FC = () => {
  const { filteredContacts } = useUsers();
  return (
    <div className={classes.container}>
      {filteredContacts.map(({ uid, userName, userPhoto }) => (
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
