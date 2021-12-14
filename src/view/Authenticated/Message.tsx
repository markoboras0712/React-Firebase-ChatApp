import { Layout } from 'components';
import { PrivateAuthGuard } from 'modules/authentication';
import { ChatLayout } from 'modules/chat/components/temp_useLater/ChatLayout';

export const Message: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <Layout>
        <ChatLayout />
      </Layout>
    </PrivateAuthGuard>
  );
};
