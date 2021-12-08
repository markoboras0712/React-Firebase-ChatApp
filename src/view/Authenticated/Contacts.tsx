import { collection, getDocs } from '@firebase/firestore';
import { Button } from '@mui/material';
import { PrivateAuthGuard } from 'modules/authentication';
import { ContactsList } from 'modules/chat/components/ContactsList';
import { db } from 'modules/redux-store';
import React from 'react';

export const Contacts: React.FC = () => {
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map((res) => {
      console.log(res.data());
    });
  };

  return (
    <PrivateAuthGuard>
      <ContactsList />
      <Button onClick={getUsers}>Get Users</Button>
    </PrivateAuthGuard>
  );
};
