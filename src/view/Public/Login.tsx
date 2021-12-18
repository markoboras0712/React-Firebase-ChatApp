import { PublicAuthGuard } from 'modules/authentication';
import { SignIn } from 'modules/authentication/components/SignIn';

export const Login: React.FC = () => (
  <PublicAuthGuard>
    <SignIn />
  </PublicAuthGuard>
);
