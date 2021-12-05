import { SignInSide } from 'modules/authentication';
import { PublicAuthGuard } from 'modules/authentication/components/PublicAuthGuard';

export const Login: React.FC = () => {
  return (
    <PublicAuthGuard>
      <SignInSide />
    </PublicAuthGuard>
  );
};
