import { PublicAuthGuard, Register } from 'modules/authentication';

export const Registration: React.FC = () => (
  <PublicAuthGuard>
    <Register />
  </PublicAuthGuard>
);
