import { PublicAuthGuard } from 'modules/authentication/components/PublicAuthGuard';
import { SignIn } from 'modules/authentication/components/SignIn';

export const Login: React.FC = () => {
  return (
    <PublicAuthGuard>
      <SignIn />
    </PublicAuthGuard>
  );
};
