import { NavigationBar } from 'components/layout/NavigationBar';
import { SignUp } from 'modules/authentication';
import { PublicAuthGuard } from 'modules/authentication/components/PublicAuthGuard';

export const Registration: React.FC = () => {
  return (
    <PublicAuthGuard>
      <NavigationBar />
      <SignUp />
    </PublicAuthGuard>
  );
};
