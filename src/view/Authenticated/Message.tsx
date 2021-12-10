/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationBar } from 'components/layout/NavigationBar';
import ChatLayout from 'modules/chat/components/ChatLayout';
import React from 'react';

export const Message: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <ChatLayout />
    </React.Fragment>
  );
};
