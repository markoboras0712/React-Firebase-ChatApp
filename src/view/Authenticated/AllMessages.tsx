import { PrivateAuthGuard } from 'modules/authentication/components/PrivateAuthGuard';
import { Chat } from 'modules/chat';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <p>All Messages</p>
      <Chat />
    </PrivateAuthGuard>
  );
};
