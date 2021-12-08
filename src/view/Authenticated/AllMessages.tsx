import { Navigation } from 'components/layout/Navigation';
import { PrivateAuthGuard } from 'modules/authentication/components/PrivateAuthGuard';
import { Chat } from 'modules/chat';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <Navigation />
      <Chat />
    </PrivateAuthGuard>
  );
};
