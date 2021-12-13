/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigation } from 'components/layout/Navigation';
import { NavigationBar } from 'components/layout/NavigationBar';
import { PrivateAuthGuard } from 'modules/authentication/components/PrivateAuthGuard';
import { Chat } from 'modules/chat';
import { MessageList } from 'modules/chat/components/MessageList';
import { MessagesList } from 'modules/chat/components/MessagesList';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <MessageList />
    </PrivateAuthGuard>
  );
};
