import { PrivateAuthGuard } from 'modules/authentication/components/PrivateAuthGuard';
import { MessageList } from 'modules/chat/components/MessageList';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <MessageList />
    </PrivateAuthGuard>
  );
};
