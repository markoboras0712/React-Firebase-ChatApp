import { Layout } from 'components';
import { MessageList } from 'modules/chat/components/MessageList';

export const AllMessages: React.FC = () => {
  return (
    <Layout>
      <MessageList />
    </Layout>
  );
};
