import { PublicAuthGuard } from 'modules/authentication/components/PublicAuthGuard';

export const NotFound: React.FC = () => (
  <PublicAuthGuard>
    <p>Page not found</p>
  </PublicAuthGuard>
);
