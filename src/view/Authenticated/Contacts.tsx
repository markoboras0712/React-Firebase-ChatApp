import { PrivateAuthGuard } from 'modules/authentication';
import { ContactsList } from 'modules/chat/components/ContactsList';
import React from 'react';

export const Contacts: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <ContactsList />
    </PrivateAuthGuard>
  );
};
