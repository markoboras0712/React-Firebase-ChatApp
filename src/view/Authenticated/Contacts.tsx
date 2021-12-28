import { Layout } from 'components';
import { PrivateAuthGuard } from 'modules/authentication';
import { ContactList } from 'modules/chat/components/ContactList';

export const Contacts: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <Layout>
        <ContactList />
      </Layout>
    </PrivateAuthGuard>
  );
};
