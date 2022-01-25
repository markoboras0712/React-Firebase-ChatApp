/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getUser,
  selectUser,
  selectUserActiveChats,
} from 'modules/authentication';
import { Contact } from 'modules/chat';
import { useUsers } from 'modules/users';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './style/ContactList.module.css';

export const ContactList: React.FC = () => {
  const { filteredContacts, getAllInboxUsers } = useUsers();
  const userChats = useSelector(selectUserActiveChats);
  const user = useSelector(selectUser);
  useEffect(() => {
    getUser(user.id);
  }, []);

  // useEffect(() => {
  //   getAllInboxUsers();
  // }, [userChats]);

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
