import { PublicAuthGuard } from 'modules/authentication';
import { Register } from 'modules/authentication/components/Register';

export const Registration: React.FC = () => (
  <PublicAuthGuard>
    <Register />
  </PublicAuthGuard>
);
