/* eslint-disable @typescript-eslint/no-unused-vars */
import { collection, getDocs } from '@firebase/firestore';
import { Button } from '@mui/material';
import { NavigationBar } from 'components/layout/NavigationBar';
import { PrivateAuthGuard } from 'modules/authentication';
import { ContactsList } from 'modules/chat/components/ContactsList';
import { db } from 'modules/redux-store';
import React from 'react';

export const Contacts: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <NavigationBar />
      <ContactsList />
    </PrivateAuthGuard>
  );
};
