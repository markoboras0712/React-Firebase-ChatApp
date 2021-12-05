import { SignOut } from 'modules/authentication';
import { PrivateAuthGuard } from 'modules/authentication/components/PrivateAuthGuard';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <p>All Messages</p>
      <SignOut />
    </PrivateAuthGuard>
  );
};
