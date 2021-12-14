import { PublicAuthGuard } from 'modules/authentication/components/PublicAuthGuard';
import { Register } from 'modules/authentication/components/Register';

export const Registration: React.FC = () => {
  return (
    <PublicAuthGuard>
      <Register />
    </PublicAuthGuard>
  );
};
