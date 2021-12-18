/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout } from 'components';
import { PrivateAuthGuard } from 'modules/authentication';
import { MessageLayout } from 'modules/chat';

export const Chat: React.FC = () => (
  <PrivateAuthGuard>
    <MessageLayout />
  </PrivateAuthGuard>
);
