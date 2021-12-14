/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout } from 'components';
import { PrivateAuthGuard } from 'modules/authentication';
import { ChatLayout } from 'modules/chat/components/temp_useLater/ChatLayout';

export const Message: React.FC = () => {
  return (
    <Layout>
      <ChatLayout />
    </Layout>
  );
};
